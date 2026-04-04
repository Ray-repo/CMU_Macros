import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { variabless } from '@/constants/indextabvars';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import Menuicon from "../../assets/images/Menu.svg";
import Rightarrow from "../../assets/images/Chevron right.svg";
import Leftarrow from "../../assets/images/Chevron left.svg";
import { Dimensions } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const screenWidth = Dimensions.get('window').width;
const API_URL = 'http://127.0.0.1:8000/api/auth';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Totals { calories: number; protein: number; carbs: number; fat: number; }
interface Goals { calories: number; protein: number; carbs: number; fat: number; }
interface MealLog { id: number; food_name: string; meal_type: string; calories: number; protein: number; carbs: number; fat: number; }

const vars = {
  dark: 'rgba(24, 24, 24, 1)',
  highlight: 'rgba(231, 73, 0, 1)',
  medium: 'rgba(28, 31, 30, 1)',
  cardstroke: 'rgba(255, 255, 255, 0.12)',
};


const MacroRing = ({ radius, color, progress, strokeWidth = 16, size = 346 }: {
  radius: number; color: string; progress: number; strokeWidth?: number; size?: number;
}) => {
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(Math.min(progress, 1), {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <Svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
      />
      <AnimatedCircle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={circumference}
        animatedProps={animatedProps}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
};

export default function TabOneScreen() {
  const date = new Date();
  const router = useRouter();
  const { token, logout } = useAuth();

  const [totals, setTotals] = useState<Totals>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [goals, setGoals] = useState<Goals>({ calories: 2000, protein: 150, carbs: 200, fat: 65 });
  const [meals, setMeals] = useState<MealLog[]>([]);

  const dateformat = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const fetchData = async () => {
    if (!token) return;
    try {
      const [totalsRes, goalsRes, mealsRes] = await Promise.all([
        fetch(`${API_URL}/totals/`, { headers: { Authorization: `Token ${token}` } }),
        fetch(`${API_URL}/goals/`, { headers: { Authorization: `Token ${token}` } }),
        fetch(`${API_URL}/meals/`, { headers: { Authorization: `Token ${token}` } }),
      ]);
      const totalsData = await totalsRes.json();
      const goalsData = await goalsRes.json();
      const mealsData = await mealsRes.json();
      setTotals({
        calories: Number(totalsData.calories) || 0,
        protein: Number(totalsData.protein) || 0,
        carbs: Number(totalsData.carbs) || 0,
        fat: Number(totalsData.fat) || 0,
      });
      setGoals({
        calories: Number(goalsData.calories) || 2000,
        protein: Number(goalsData.protein) || 150,
        carbs: Number(goalsData.carbs) || 200,
        fat: Number(goalsData.fat) || 65,
      });
      setMeals(Array.isArray(mealsData) ? mealsData : []);
    } catch (e) {
      console.error('Failed to fetch data', e);
    }
  };

  useFocusEffect(useCallback(() => { fetchData(); }, [token]));

  const breakfast = meals.filter(m => m.meal_type === 'breakfast');
  const lunch = meals.filter(m => m.meal_type === 'lunch');
  const snacks = meals.filter(m => m.meal_type === 'snack');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.frame}>
          <View style={styles.topbackground} />

          <View style={{ margin: 12, flex: 1 }}>
            <View style={styles.rectangle} />
            <Text style={styles.date}>{dateformat}</Text>
            <View style={styles.rectangle16}>
              <Menuicon width={48} height={48} />
            </View>
            <View style={styles.rectangle15} />

            {/* MAIN PLAN CARD */}
            <View style={styles.mainGroup}>
              <View style={styles.mainGroupBG}>

                <View style={styles.planRow}>
                  <Text style={styles.planText}>My Plan</Text>
                  <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => router.push('/editfoodpage')}>
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout}>
                      <Text style={[styles.editText, { color: '#ff4444' }]}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Animated Macro Rings */}
                <View style={styles.group8}>
                  <MacroRing radius={155} color={variabless.VariableCollectionH1} progress={totals.fat / goals.fat} />
                  <MacroRing radius={125} color={variabless.VariableCollectionH3} progress={totals.protein / goals.protein} />
                  <MacroRing radius={95} color={variabless.VariableCollectionH2} progress={totals.carbs / goals.carbs} />

                  <View style={styles.kcalBackground} />
                  <View style={styles.randomassdotontheright} />

                  <Text style={styles.fatsText}>fats</Text>
                  <Text style={styles.proteinsText}>proteins</Text>
                  <Text style={styles.carbsText}>carbs</Text>
                  <Text style={styles.fatsGramsText}>{Math.round(totals.fat)}/{goals.fat} g</Text>
                  <Text style={styles.proteinsGramsText}>{Math.round(totals.protein)}/{goals.protein} g</Text>
                  <Text style={styles.carbsGramsText}>{Math.round(totals.carbs)}/{goals.carbs} g</Text>
                </View>

                {/* Recommended next meal */}
                <View style={styles.nextMealGroup}>
                  <View style={styles.rectangle17} />
                  <View style={styles.rectangle18} />
                  <View style={styles.rectangle19} />
                  <View style={styles.rectangle20} />
                  <View style={styles.rectangle21} />
                  <Text style={styles.textWrapper11}>
                    {totals.calories < goals.calories
                      ? `${Math.round(goals.calories - totals.calories)} kcal remaining today`
                      : '🎉 Daily goal reached!'}
                  </Text>
                </View>

              </View>
            </View>

            {/* KCAL display */}
            <View style={styles.kcalGroup}>
              <Text style={styles.kcalCurrent}>{Math.round(totals.calories)}</Text>
              <View style={styles.kcalDivider} />
              <Text style={styles.kcalGoal}>{goals.calories}</Text>
              <Text style={styles.kcalText}>kcal</Text>
            </View>

            {/* Meals section */}
            <View style={styles.meals}>
              <View style={styles.rectangle2} />

              <View style={styles.mealSection}>
                <Text style={styles.mealSectionTitle}>Breakfast</Text>
                {breakfast.length === 0 ? (
                  <Text style={styles.emptyMeal}>No items logged</Text>
                ) : breakfast.map(m => (
                  <View key={m.id} style={styles.mealItem}>
                    <Text style={styles.mealItemName}>{m.food_name}</Text>
                    <Text style={styles.mealItemCals}>{Math.round(m.calories)} kcal</Text>
                  </View>
                ))}
              </View>

              <View style={styles.mealSection}>
                <Text style={styles.mealSectionTitle}>Lunch</Text>
                {lunch.length === 0 ? (
                  <Text style={styles.emptyMeal}>No items logged</Text>
                ) : lunch.map(m => (
                  <View key={m.id} style={styles.mealItem}>
                    <Text style={styles.mealItemName}>{m.food_name}</Text>
                    <Text style={styles.mealItemCals}>{Math.round(m.calories)} kcal</Text>
                  </View>
                ))}
              </View>

              <View style={styles.mealSection}>
                <Text style={styles.mealSectionTitle}>Snacks</Text>
                {snacks.length === 0 ? (
                  <Text style={styles.emptyMeal}>No items logged</Text>
                ) : snacks.map(m => (
                  <View key={m.id} style={styles.mealItem}>
                    <Text style={styles.mealItemName}>{m.food_name}</Text>
                    <Text style={styles.mealItemCals}>{Math.round(m.calories)} kcal</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.announcements}>Notifs/Announce</Text>
          <Text style={styles.amText}>7:00 am</Text>
          <Text style={styles.pmText}>7:00 pm</Text>
          <View style={styles.rectangle23}><Rightarrow /></View>
          <View style={styles.rectangle24}><Leftarrow /></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  frame: {
    flex: 1,
    backgroundColor: variabless.VariableCollectionDark,
    minHeight: 1176,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  rectangle: {
    backgroundColor: variabless.VariableCollectionMedium,
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: 59,
    position: 'absolute',
    top: 131,
    width: '100%',
  },
  topbackground: {
    backgroundColor: variabless.VariableCollectionMedium,
    height: 126,
    position: 'absolute',
    width: screenWidth,
  },
  meals: { marginTop: 620, width: '100%' },
  rectangle2: {
    backgroundColor: variabless.VariableCollectionMedium,
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  mealSection: { paddingHorizontal: 16, paddingVertical: 12 },
  mealSectionTitle: { color: '#ffffff', fontFamily: 'Inter', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  mealItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  mealItemName: { color: '#ffffff', fontFamily: 'Inter', fontSize: 13, flex: 1 },
  mealItemCals: { color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter', fontSize: 13 },
  emptyMeal: { color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter', fontSize: 12, fontStyle: 'italic' },
  rectangle15: { backgroundColor: '#e74900', borderRadius: 30, height: 46, position: 'absolute', top: 50, width: 46, left: '80.7%' },
  rectangle16: { borderRadius: 30, height: 46, position: 'absolute', top: 50, width: 46, left: '8.86%' },
  mainGroup: {
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: 'center',
    height: 582,
    overflow: 'hidden',
    position: 'absolute',
    top: 199,
    width: '100%',
  },
  mainGroupBG: {
    alignItems: 'center',
    backgroundColor: variabless.VariableCollectionMedium,
    borderRadius: 16,
    flexDirection: 'column',
    height: 582,
    width: '100%',
  },
  planRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 16 },
  planText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 20, fontWeight: '700', lineHeight: 24, marginTop: 20 },
  editText: { color: '#e74900', fontFamily: 'Lekton', fontSize: 16, fontWeight: '400', textDecorationLine: 'underline' },
  group8: { height: 346, marginTop: 22, marginBottom: 20, position: 'relative', width: 346, alignSelf: 'center' },
  kcalBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 2,
    borderColor: '#ffffff1f',
    borderRadius: 77,
    height: 154,
    left: 96,
    position: 'absolute',
    top: 96,
    width: 154,
  },
  randomassdotontheright: { backgroundColor: '#ffffff', borderRadius: 33, height: 66, left: 262, opacity: 0.2, position: 'absolute', top: 134, width: 66 },
  carbsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', left: 181, position: 'absolute', top: 55 },
  proteinsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', left: 181, position: 'absolute', top: 26 },
  fatsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', left: 181, position: 'absolute', top: 0 },
  carbsGramsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, left: 181, opacity: 0.4, position: 'absolute', top: 260 },
  proteinsGramsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, left: 181, opacity: 0.4, position: 'absolute', top: 290 },
  fatsGramsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, left: 181, opacity: 0.4, position: 'absolute', top: 320 },
  nextMealGroup: { height: 60, marginLeft: 32, position: 'relative', width: 380 },
  rectangle17: { backgroundColor: '#2d2d2d', borderRadius: 12, height: 60, left: '50%', transform: [{ translateX: -190 }], position: 'absolute', top: 0, width: 348 },
  rectangle18: { backgroundColor: '#2d2d2d', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, height: 60, left: '50%', transform: [{ translateX: 172 }], position: 'absolute', top: 0, width: 16 },
  rectangle19: { backgroundColor: variabless.VariableCollectionMedium, borderRadius: 12, height: 17, left: '50%', transform: [{ translateX: 62 }], position: 'absolute', top: 21, width: 50 },
  rectangle20: { backgroundColor: variabless.VariableCollectionMedium, borderRadius: 12, height: 44, left: '50%', transform: [{ translateX: -175 }], position: 'absolute', top: 8, width: 223 },
  rectangle21: { backgroundColor: variabless.VariableCollectionMedium, borderRadius: 12, height: 36, left: '50%', transform: [{ translateX: 133 }], position: 'absolute', top: 12, width: 14 },
  textWrapper11: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: 24, letterSpacing: 0, lineHeight: 12, position: 'absolute', top: 18, width: 280 },
  announcements: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: '50%', transform: [{ translateX: -207 }], position: 'absolute', textAlign: 'center', top: 153, width: 416 },
  date: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: '50%', transform: [{ translateX: -113 }], position: 'absolute', textAlign: 'center', top: '6%', width: 226 },
  rectangle23: { height: 29, position: 'absolute', top: 60, width: 20, left: '59.77%' },
  rectangle24: { height: 29, position: 'absolute', top: 60, width: 20, left: '36.36%' },
  amText: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: '11%', opacity: 0.4, position: 'absolute', top: 662 },
  pmText: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: '76.5%', opacity: 0.4, position: 'absolute', top: 662 },
  kcalGroup: { flexDirection: 'column', height: 92, left: '33.8%', position: 'absolute', top: 385, width: 160 },
  kcalCurrent: { color: '#ffffff', fontFamily: 'Inter', fontSize: 36, fontWeight: '700', height: 36, lineHeight: 36, textAlign: 'center', width: 154 },
  kcalDivider: { backgroundColor: '#ffffff', height: 2, marginLeft: 23, marginTop: 1, width: 109 },
  kcalGoal: { color: '#ffffff', fontFamily: 'Inter', fontSize: 36, fontWeight: '400', height: 36, lineHeight: 36, marginLeft: 35, marginTop: 9, width: 84 },
  kcalText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', height: 23, lineHeight: 12, marginLeft: 30, marginTop: 3, textAlign: 'right', width: 78 },

});
