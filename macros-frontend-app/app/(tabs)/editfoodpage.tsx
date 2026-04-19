import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
import Camera from "../../assets/images/Camera.svg";
import Mic from "../../assets/images/Mic.svg";
import X from "../../assets/images/X.svg";
import { useAuth } from '@/context/AuthContext';
import Menuicon from "../../assets/images/Menu.svg";
import FontAwesome from '@expo/vector-icons/FontAwesome';



const API_URL = 'http://127.0.0.1:8000/api/auth';

const vars = {
  dark: 'rgba(24, 24, 24, 1)',
  highlight: 'rgba(231, 73, 0, 1)',
  medium: 'rgba(28, 31, 30, 1)',
  cardstroke: 'rgba(255, 255, 255, 0.12)',
  fontLekton: 'Lekton',
};

interface FoodItem {
  id: number;
  name: string;
  serving_size: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const ItemCondensed = ({ item, onLog }: { item: FoodItem, onLog: (item: FoodItem) => void }) => (
  <TouchableOpacity style={styles.itemCondensedInstance} onPress={() => onLog(item)}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={{ color: 'white', fontFamily: 'Lekton' }}>{item.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <Text style={styles.textWrapper8}>{item.protein}g</Text>
        <Text style={styles.textWrapper8}>{item.carbs}g</Text>
        <Text style={{ color: 'white' }}>{item.calories} kCal</Text>
      </View>
    </View>
    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 }}>{item.serving_size}</Text>
  </TouchableOpacity>
);

export default function TabThreeScreen() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [search, setSearch] = useState('');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loggedMessage, setLoggedMessage] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchFoods('');
  }, []);

  const fetchFoods = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/foods/?q=${query}`);
      const data = await res.json();
      setFoods(data);
    } catch (e) {
      console.error('Failed to fetch foods', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    fetchFoods(text);
  };

  const logMeal = async (mealType: string) => {
    if (!selectedFood) return;
    setShowMealPicker(false);
    try {
      const res = await fetch(`${API_URL}/meals/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          food_id: selectedFood.id,
          meal_type: mealType,
          quantity: 1,
        }),
      });
      if (res.ok) {
        setLoggedMessage(`✓ Added ${selectedFood.name} to ${mealType}!`);
        setTimeout(() => setLoggedMessage(''), 2000);
      } else {
        const err = await res.json();
        alert('Error: ' + JSON.stringify(err));
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <View style={styles.addItem}>
      <View style={styles.topbg} />

      {/* Success message */}
      {loggedMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>{loggedMessage}</Text>
        </View>
      ) : null}

      {/* Search Bar */}
      <View style={styles.rectangle4}>
        <TextInput
          style={styles.searchText}
          placeholder="Search CMU foods..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={search}
          onChangeText={handleSearch}
        />
        <Mic width={20} height={20} color="white" />
      </View>

      <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.underscrollbar}>
          <TouchableOpacity style={styles.highlightedselection}>
            <X width={16} height={16} color="white" />
            <Text style={styles.text}>All</Text>
          </TouchableOpacity>
          <View style={[styles.whiterectangle, { marginLeft: 'auto' }]} />
        </View>

        <View style={styles.macroHeaderRow}>
          <Text style={{ flex: 1, color: 'white', fontFamily: 'Lekton', fontSize: 14, fontWeight: '700' }}>
            {search ? `Results for "${search}"` : 'All CMU Foods'}
          </Text>
          <Text style={styles.textWrapper8}>protein</Text>
          <Text style={styles.textWrapper8}>carbs</Text>
          <Text style={styles.textWrapper8}>calories</Text>
        </View>

        {loading ? (
          <ActivityIndicator color={vars.highlight} style={{ marginTop: 20 }} />
        ) : foods.length === 0 ? (
          <Text style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 20 }}>No foods found</Text>
        ) : (
          foods.map(item => (
            <ItemCondensed key={item.id} item={item} onLog={(item) => {
              setSelectedFood(item);
              setShowMealPicker(true);
            }} />
          ))
        )}

        <TouchableOpacity style={styles.createboxes}>
          <Text style={styles.createtext}>Create Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createboxes}>
          <Text style={styles.createtext}>Create Recipe</Text>
        </TouchableOpacity>
      </ScrollView>

<FontAwesome 
  name="user" 
  size={48} 
  color = 'rgba(255, 255, 255, 0.4)'
  style={styles.tempbox2} 
/>
<View style={styles.menu}>
                <Menuicon width={48} height={48} />
      </View>

      <TouchableOpacity style={styles.cameraWrapper}>
        <Camera width={24} height={24} color={vars.dark} />
      </TouchableOpacity>

      <Text style={styles.textWrapper13}>Add Meal</Text>

      {/* Meal Type Picker Modal */}
      <Modal visible={showMealPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add to which meal?</Text>
            <Text style={styles.modalSubtitle}>{selectedFood?.name}</Text>
            {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => (
              <TouchableOpacity
                key={mealType}
                style={styles.mealTypeButton}
                onPress={() => logMeal(mealType)}
              >
                <Text style={styles.mealTypeText}>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowMealPicker(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  addItem: { backgroundColor: vars.medium, flex: 1, position: 'relative' },
  topbg: { backgroundColor: vars.dark, borderWidth: 1, borderColor: vars.cardstroke, height: 177, width: '100%', position: 'absolute', top: 0 },
  successBanner: { backgroundColor: 'rgba(231, 73, 0, 0.9)', padding: 10, position: 'absolute', top: 60, left: 20, right: 20, borderRadius: 8, zIndex: 999, alignItems: 'center' },
  successText: { color: 'white', fontFamily: 'Lekton', fontSize: 14 },
  rectangle4: { backgroundColor: 'rgba(255, 255, 255, 0.12)', borderWidth: 1, borderColor: vars.cardstroke, borderRadius: 40, height: 48, left: 14, right: 71, position: 'absolute', top: 114, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22 },
  searchText: { color: '#ffffff', fontFamily: vars.fontLekton, fontSize: 16, flex: 1 },
  scrollcontainer: { flex: 1, marginTop: 175, padding: 12 },
  underscrollbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
  highlightedselection: { backgroundColor: vars.highlight, borderWidth: 1, borderColor: vars.cardstroke, borderRadius: 12, flexDirection: 'row', gap: 10, padding: 10, alignItems: 'center' },
  text: { color: '#ffffff', fontFamily: vars.fontLekton, fontSize: 14 },
  whiterectangle: { height: 35, width: 39 }, //backgroundColor: '#d9d9d9', 
  macroHeaderRow: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 16, marginBottom: 8, gap: 18 },
  textWrapper8: { color: '#ffffff', fontFamily: vars.fontLekton, fontSize: 12, opacity: 0.4 },
  itemCondensedInstance: { width: '100%', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  createboxes: { backgroundColor: vars.dark, borderWidth: 1, borderColor: vars.cardstroke, borderRadius: 12, height: 48, paddingHorizontal: 14, justifyContent: 'center', marginBottom: 12, marginTop: 16 },
  createtext: { color: '#ffffff', fontFamily: vars.fontLekton, fontSize: 16 },
  menu: {height: 44, width: 49, left: 14, top: 58, position: 'absolute' },
  tempbox2: {
  position: 'absolute',
  top: 60,       // Adjust to sit nicely below the top of the screen
  right: 0,     // Distance from the right edge
  zIndex: 10,    // Keeps it on top of background layers
  height:60, width: 55,
},
  cameraWrapper: { backgroundColor: vars.highlight, borderWidth: 1, borderColor: vars.cardstroke, borderRadius: 100, height: 48, width: 48, justifyContent: 'center', alignItems: 'center', right: 13, top: 114, position: 'absolute' },
  textWrapper13: { color: '#ffffff', fontFamily: vars.fontLekton, fontSize: 14, width: '100%', textAlign: 'center', top: 69, position: 'absolute' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: vars.medium, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, borderWidth: 1, borderColor: vars.cardstroke },
  modalTitle: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  modalSubtitle: { color: 'rgba(255,255,255,0.5)', fontFamily: 'Lekton', fontSize: 14, marginBottom: 20 },
  mealTypeButton: { backgroundColor: vars.dark, borderWidth: 1, borderColor: vars.cardstroke, borderRadius: 12, height: 52, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  mealTypeText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 16 },
  cancelButton: { height: 52, justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  cancelText: { color: vars.highlight, fontFamily: 'Lekton', fontSize: 16 },
});