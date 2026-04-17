import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { variabless } from '@/constants/indextabvars';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing, interpolate, DerivedValue } from 'react-native-reanimated';

import Menuicon from "../../assets/images/Menu.svg";
import Rightarrow from "../../assets/images/Chevron right.svg";
import Leftarrow from "../../assets/images/Chevron left.svg";

import { Dimensions } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const screenWidth = Dimensions.get('window').width;
const API_URL = 'http://127.0.0.1:8000/api/auth';
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Totals { calories: number; protein: number; carbs: number; fat: number; }
interface Goals { calories: number; protein: number; carbs: number; fat: number; }
interface MealLog { id: number; food_name: string; meal_type: string; calories: number; protein: number; carbs: number; fat: number; }

// Modifying MacroRing to display as a half-ellipse/arc on the left
const MacroRing = ({ radius, color, progress, strokeWidth = 16, size = 346 }: {
  radius: number; color: string; progress: number; strokeWidth?: number; size?: number;
}) => {
  // A half circle (180 degrees) is 0.5 * (2 * pi * r) = pi * r
  const halfCircumference = Math.PI * radius;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    // Standardizing progress between 0 and 1
    animatedProgress.value = withTiming(Math.max(0, Math.min(progress, 1)), {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  // The 'dashOffset' formula must use 'halfCircumference' to represent the arc.
  // 1 - animatedProgress because the offset is the 'gap'. 0 gap = full path.
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      animatedProgress.value,
      [0, 1],
      [halfCircumference, 0]
    );
    return {
      strokeDashoffset,
    };
  });

  // Center coordinates
  const c = size / 2;

  // Path description (SVG Arc command 'A'): 
  // Moves to bottom (cx, cy+r) then draws arc to top (cx, cy-r) covering left hemisphere.
  const arcPath = `M${c},${c + radius} A${radius},${radius} 0 0,1 ${c},${c - radius}`;

  return (
    <Svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
      {/* 1. Background Arc (light gray) representing the goal */}
      <Path
        d={arcPath}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      {/* 2. Animated Progress Arc */}
      <AnimatedPath
        d={arcPath}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${halfCircumference}, ${halfCircumference}`}
        animatedProps={animatedProps}
        strokeLinecap="round"
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

  const dateformat = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

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

  return (
    <ScrollView> 
      <View style={styles.container}>
        <View style={styles.frame}>
          <View style={styles.topbackground} />

          <View style={{ margin: 12, flex: 1, position: 'relative' }}>
            <View style={styles.rectangle} />
            
            <View style={styles.meals}>
              <View style={styles.rectangle2} />
              {/* Breakfast Section */}
              <View style={styles.group2}>
                <View style={styles.rectangle3} />
                <View style={styles.rectangle4} />
                <View style={styles.rectangle5} />
                <View style={styles.group3}>
                  <View style={styles.rectangle6} />
                  <View style={styles.rectangle7} />
                  <View style={styles.rectangle8} />
                  <Text style={styles.textWrapper}>{breakfast[0]?.food_name || "Food name"}</Text>
                  <Text style={styles.textWrapper2}>{breakfast[0] ? `${Math.round(breakfast[0].calories)} kcal` : "Count"}</Text>
                </View>
                <View style={styles.group4}>
                  <View style={styles.rectangle9} />
                  <View style={styles.rectangle10} />
                </View>
                <Text style={styles.textWrapper3}>Breakfast</Text>
              </View>
              {/* Lunch Section */}
              <View style={styles.meal2}>
                <View style={styles.rectangle11} />
                <View style={styles.rectangle12} />
                <Text style={styles.textWrapper4}>Lunch: {lunch[0]?.food_name || "No items"}</Text>
                <View style={styles.rectangle13} />
              </View>
            </View>
            
            <View style={styles.rectangle15}/>
            <View style={styles.rectangle16}>
                <Menuicon width={48} height={48} />
            </View>

            <View style={styles.mainGroupContainer}>
              <View style={styles.mainGroup}>
                <View style={styles.mainGroupBG}>
                  {/* invisible "edit" button it makes the planrow thing show but like lowkey needs to be fixed or like change it to logout button????*/}
                  <TouchableOpacity style={{ position: 'absolute', top: 20, right: 16, zIndex: 10, opacity: 0}} onPress={() => router.push('/editfoodpage')}>
                    <Text style={{ color: '#ffffff', fontFamily: 'Lekton', fontSize: 16, textDecorationLine: 'underline', fontWeight: '700' }}>Edit</Text>
                  </TouchableOpacity>
                  <View style={styles.planRow}>
                    <Text style={styles.planText}>My Plan</Text>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                      <TouchableOpacity onPress={() => router.push('/editfoodpage')}>
                        <Text style={styles.editText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={logout}>
                        <Text style={[styles.editText, { color: '#ff4444' }]}>Logout</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Visual Group - Now with Left-Hemisphere Arcs (from bottom to top) */}
                  <View style={styles.group8}>
                    {/* Arcs positioned to align with the labels and labels formula. Progress from totals. */}
                    {/* Inner/Bottom Arc */}
                    <MacroRing radius={95} color={variabless.VariableCollectionH2} progress={totals.carbs / goals.carbs} size={346}/>
                    {/* Middle Arc */}
                    <MacroRing radius={125} color={variabless.VariableCollectionH3} progress={totals.protein / goals.protein} size={346}/>
                    {/* Outer/Top Arc */}
                    <MacroRing radius={155} color={variabless.VariableCollectionH1} progress={totals.fat / goals.fat} size={346}/>

                    <View style={styles.kcalBackground} />
                    <View style={styles.randomassdotontheright} />
                    
                    <Text style={styles.carbsText}>carbs</Text>
                    <Text style={styles.proteinsText}>proteins</Text>
                    <Text style={styles.fatsText}>fats</Text>
                    <Text style={styles.carbsGramsText}>{Math.round(totals.carbs)}/{goals.carbs} g</Text>
                    <Text style={styles.proteinsGramsText}>{Math.round(totals.protein)}/{goals.protein} g</Text>
                    <Text style={styles.fatsGramsText}>{Math.round(totals.fat)}/{goals.fat} g</Text>
                  </View>
                  
                  <View style={styles.nextMealGroup}>
                    <View style={styles.rectangle17} />
                    <View style={styles.rectangle18} />
                    <View style={styles.rectangle19} />
                    <View style={styles.rectangle20} />
                    <View style={styles.rectangle21} />
                    <Text style={styles.textWrapper11}>
                      {totals.calories < goals.calories
                        ? `${Math.round(goals.calories - totals.calories)} kcal remaining today`
                        : 'bruh'}
                    </Text>
                  </View>
                </View>
              </View>        
            </View>

            <Text style={styles.announcements}>Notifs/Announce</Text>
            <Text style={styles.date}>{dateformat}</Text>
            <Text style={styles.amText}>7:00 am</Text>
            <Text style={styles.pmText}>7:00 pm</Text>

            <View style={styles.rectangle23}><Rightarrow/></View>
            <View style={styles.rectangle24}><Leftarrow/></View>
            
            <Image style={styles.group10} alt="Group" source={{ uri: "https://c.animaapp.com/JTUgphJD/img/group-11@2x.png" }} />

            <View style={styles.kcalGroup}>
              <Text style={styles.kcalCurrent}>{Math.round(totals.calories)}</Text>
              <View style={styles.kcalDivider}/>
              <Text style={styles.kcalGoal}>{goals.calories}</Text>
              <Text style={styles.kcalText}>kcal</Text>
            </View>
          </View>
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
    position: 'relative',
    width: '100%',
  },
  rectangle: {
    backgroundColor: variabless.VariableCollectionMedium, 
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
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
  meals: {
    height: 360,    
    position: 'absolute',
    top: 791,
    width: '100%',
  },
  rectangle2: {
    backgroundColor: variabless.VariableCollectionMedium, 
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
    height: 337,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  group2: { height: 197, left: '50%', transform: [{ translateX: -170 }], position: 'absolute', top: 13, width: 342 },
  rectangle3: { backgroundColor: '#bdbdbd', borderRadius: 12, height: 197, width: 340, position: 'absolute' },
  rectangle4: { backgroundColor: '#afafaf', borderRadius: 30, bottom: 10, height: 8, left: 8, position: 'absolute', width: 325 },
  rectangle5: { backgroundColor: '#afafaf', borderRadius: 30, height: 35, left: 299, position: 'absolute', top: 11, width: 34 },
  group3: { height: 38, left: 8, top: 56, position: 'absolute', width: 326 },
  rectangle6: { backgroundColor: '#afafaf', borderRadius: 8, height: 38, width: 326 },
  rectangle7: { backgroundColor: '#bdbdbd', borderRadius: 30, height: 26, right: 10, top: 6, position: 'absolute', width: 25 },
  rectangle8: { backgroundColor: '#bdbdbd', borderRadius: 30, height: 26, right: 42, top: 6, position: 'absolute', width: 25 },
  textWrapper: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: 6, position: 'absolute', top: 6, width: 131 },
  textWrapper2: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: 124, position: 'absolute', top: 6, width: 131 },
  group4: { backgroundColor: '#afafaf', borderRadius: 8, height: 38, left: 8, top: 100, position: 'absolute', width: 326 },
  rectangle9: { backgroundColor: '#bdbdbd', borderRadius: 30, height: 26, right: 10, top: 6, position: 'absolute', width: 25 },
  rectangle10: { backgroundColor: '#bdbdbd', borderRadius: 30, height: 26, right: 42, top: 6, position: 'absolute', width: 25 },
  textWrapper3: { color: '#ffffff', fontFamily: 'Inter', fontSize: 16, left: 7, position: 'absolute', top: 17, width: 92 },
  meal2: { height: 66, left: '50%', transform: [{ translateX: -170 }], position: 'absolute', top: 219, width: 342 },
  rectangle11: { backgroundColor: '#bdbdbd', borderRadius: 12, height: 66, width: 340 },
  rectangle12: { backgroundColor: '#afafaf', borderRadius: 30, bottom: 8, height: 8, left: 8, position: 'absolute', width: 325 },
  textWrapper4: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: 6, position: 'absolute', top: 8, width: 250 },
  rectangle13: { backgroundColor: '#afafaf', borderRadius: 30, height: 35, left: 299, position: 'absolute', top: 9, width: 34 },
  rectangle15: { backgroundColor: '#e74900', borderRadius: 30, height: 46, position: 'absolute', top: 50, width: 46, right: '10.5%' },
  rectangle16: { borderRadius: 30, height: 46, position: 'absolute', top: 50, width: 46, left: '8.86%' },
  mainGroupContainer: { position: 'absolute', top: 199, width: '100%', alignItems: 'center' },
  mainGroup: { height: 582, width: screenWidth - 24 }, // Ensure container fits within padding/margin
  mainGroupBG: { alignItems: 'center', backgroundColor: variabless.VariableCollectionMedium, borderRadius: 16, height: 582, width: '100%' },
  planRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 16 },
  planText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 20, fontWeight: '700', marginTop: 20 },
  editText: { color: '#e74900', fontFamily: 'Lekton', fontSize: 16, textDecorationLine: 'underline', marginTop: 20 },
  group8: { height: 346, marginTop: 22, marginBottom: 20, position: 'relative', width: 346 },
  kcalBackground: { backgroundColor: 'rgba(255, 255, 255, 0.12)', borderWidth: 2, borderColor: '#ffffff1f', borderRadius: 77, height: 154, left: 96, position: 'absolute', top: 96, width: 154, opacity: 0.15 }, // Dimmed background to match half-gauge aesthetic
  randomassdotontheright: { backgroundColor: '#ffffff', borderRadius: 33, height: 66, left: 262, opacity: 0.2, position: 'absolute', top: 134, width: 66 },
  carbsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', left: 181, position: 'absolute', top: 55 },
  proteinsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', left: 181, position: 'absolute', top: 26 },
  fatsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', left: 181, position: 'absolute', top: 0 },
  carbsGramsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, left: 181, opacity: 0.4, position: 'absolute', top: 260 },
  proteinsGramsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, left: 181, opacity: 0.4, position: 'absolute', top: 290 },
  fatsGramsText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, left: 181, opacity: 0.4, position: 'absolute', top: 320 },
  nextMealGroup: { height: 60, position: 'relative', width: 348 },
  rectangle17: { backgroundColor: '#2d2d2d', borderRadius: 12, height: 60, width: '100%' },
  rectangle18: { backgroundColor: '#2d2d2d', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, height: 60, right: 0, position: 'absolute', width: 16 },
  rectangle19: { backgroundColor: variabless.VariableCollectionMedium, borderRadius: 12, height: 17, right: 40, position: 'absolute', top: 21, width: 50 },
  rectangle20: { backgroundColor: variabless.VariableCollectionMedium, borderRadius: 12, height: 44, left: 10, position: 'absolute', top: 8, width: 223 },
  rectangle21: { backgroundColor: variabless.VariableCollectionMedium, borderRadius: 12, height: 36, right: 10, position: 'absolute', top: 12, width: 14 },
  textWrapper11: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: 24, position: 'absolute', top: 18, width: 199 },
  announcements: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: '50%', transform: [{ translateX: -207 }], position: 'absolute', textAlign: 'center', top: 153, width: 416 },
  date: { color: '#ffffff', fontFamily: 'Inter', fontSize: 12, left: '50%', transform: [{ translateX: -113 }], position: 'absolute', textAlign: 'center', top: '6%', width: 226 },
  rectangle23: { height: 29, position: 'absolute', top: 60, width: 20, left: '59.77%' },
  rectangle24: { height: 29, position: 'absolute', top: 60, width: 20, left: '36.36%' },
  amText: { color: '#ffffff', fontSize: 12, left: '11%', opacity: 0.4, position: 'absolute', top: 662 },
  pmText: { color: '#ffffff', fontSize: 12, left: '76.5%', opacity: 0.4, position: 'absolute', top: 662 },
  group10: { height: 28, left: '50%', transform: [{ translateX: -175 }], position: 'absolute', top: 625, width: 348 },
  kcalGroup: { flexDirection: 'column', height: 92, left: '50%', transform: [{ translateX: -80 }], position: 'absolute', top: 385, width: 160 }, // Centering the kcal display
  kcalCurrent: { color: '#ffffff', fontFamily: 'Inter', fontSize: 36, fontWeight: '700', textAlign: 'center', width: 154, height: 36, lineHeight: 36 },
  kcalDivider: { backgroundColor: '#ffffff', height: 2, marginLeft: 23, width: 109, marginVertical: 4 },
  kcalGoal: { color: '#ffffff', fontFamily: 'Inter', fontSize: 36, fontWeight: '400', textAlign: 'center', width: 154, height: 36, lineHeight: 36 },
  kcalText: { color: '#ffffff', fontFamily: 'Lekton', fontSize: 12, fontWeight: '700', textAlign: 'center', width: 154 },
});