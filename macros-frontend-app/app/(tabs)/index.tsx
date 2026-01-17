//import { StyleSheet } from 'react-native';
//import { Text, View } from '@/components/Themed';
//import EditScreenInfo from '@/components/EditScreenInfo';

import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { variabless } from '@/constants/indextabvars';

import Ellipse1 from "../../assets/images/ellipse-1.svg";
import Ellipse2 from "../../assets/images/ellipse-2.svg";
import Ellipse3 from "../../assets/images/ellipse-3.svg";
import Ellipse6 from "../../assets/images/ellipse-6.svg"; //yellow
import Ellipse7 from "../../assets/images/ellipse-7.svg"; //blue
import Ellipse8 from "../../assets/images/ellipse-8.svg"; //green


export default function TabOneScreen() {
  const date = new Date();

  const dateformat = date.toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  });
  return (
    <ScrollView> 
    <View style={styles.container}>
      {/* FRAME (Main Container) */}
      <View style={styles.frame}>
        
        <View style={styles.rectangle} />
        <View style={styles.div} />

          <View style={styles.group}>
            <View style={styles.rectangle2} />

            {/* GROUP-2 (Meal 1) */}
            <View style={styles.group2}>
              <View style={styles.rectangle3} />
              <View style={styles.rectangle4} />
              <View style={styles.rectangle5} />
            
              <View style={styles.group3}>
                <View style={styles.rectangle6} />
                <View style={styles.rectangle7} />
                <View style={styles.rectangle8} />
                <Text style={styles.textWrapper}>Food name</Text>
                <Text style={styles.textWrapper2}>Count</Text>
              </View>

            <View style={styles.group4}>
              <View style={styles.rectangle9} />
              <View style={styles.rectangle10} />
            </View>
            <Text style={styles.textWrapper3}>Breakfast</Text>
          </View>

          {/* GROUP-5 (Meal 2) */}
          <View style={styles.group5}>
            <View style={styles.rectangle11} />
            <View style={styles.rectangle12} />
            <Text style={styles.textWrapper4}>Lunch</Text>
            <View style={styles.rectangle13} />
          </View>

          {/* GROUP-6 (Meal 3) */}
          <View style={styles.group6}>
            <View style={styles.rectangle11} /> {/* Reusing style */}
            <View style={styles.rectangle12} /> {/* Reusing style */}
            <Text style={styles.textWrapper4}>Lunch</Text> {/* Reusing style */}
            <View style={styles.rectangle14} />
          </View>
        </View>

        <View style={styles.rectangle15} />
        <View style={styles.rectangle16} />

        {/* GROUP-WRAPPER main group */}
        <View style={styles.mainGroup}>
          <View style={styles.mainGroupBG}>
            <View style={styles.planRow}>
              <Text style={styles.planText}>My Plan</Text>
              <Text style={styles.editText}>Edit</Text>
            </View>
            
            <View style={styles.group8}>
              <View style={styles.ellipse1Container}>
                <Ellipse1 width={183} height={342} />
              </View>
              <View style={styles.ellipse2Container}>
                <Ellipse2 width={155} height={286} />
              </View>
              <View style={styles.ellipse3Container}>
                <Ellipse3 width={126} height={227} />
              </View>
              <View style={styles.ellipse6Container}>
                <Ellipse6 width={107} height={72} />
              </View>
              <View style={styles.ellipse7Container}>
                <Ellipse7 width={147} height={173} />
              </View>
              <View style={styles.ellipse8Container}>
                <Ellipse8 width={172} height={146} />
              </View>

              <View style={styles.kcalBackground} />
              <View style={styles.randomassdotontheright} />
              
              <Text style={styles.carbsText}>carbs</Text>
              <Text style={styles.proteinsText}>proteins</Text>
              <Text style={styles.fatsText}>fats</Text>
              <Text style={styles.carbsGramsText}>20/55 g</Text>
              <Text style={styles.proteinsGramsText}>80/120 g</Text>
              <Text style={styles.fatsGramsText}>154/310 g</Text>
            </View>
            
            {/* GROUP-9 (Recommended Next Meal) */}
            <View style={styles.nextMealGroup}>
              <View style={styles.rectangle17} />
              <View style={styles.rectangle18} />
              <View style={styles.rectangle19} />
              <View style={styles.rectangle20} />
              <View style={styles.rectangle21} />
              <Text style={styles.textWrapper11}>recommended next meal</Text>
            </View>
          </View>
        </View>

        <View style={styles.rectangle22} />
        
        
        <Text style={styles.announcements}>Notifs/Announce</Text>
        <Text style={styles.date}>{dateformat}</Text>

        <Text style={styles.amText}>7:00 am</Text>
        <Text style={styles.pmText}>7:00 pm</Text>

        <View style={styles.rectangle23} />
        <View style={styles.rectangle24} />
        

        {/* Group 10 is an image (.png) */}
        <Image style={styles.group10} alt="Group" source={{ uri: "https://c.animaapp.com/JTUgphJD/img/group-11@2x.png" }} />

        {/* GROUP-11 (KCAL display) */}
        <View style={styles.kcalGroup}>
          <Text style={styles.kcalCurrent}>600</Text>
          <View style={styles.kcalDivider}/>
          <Text style={styles.kcalGoal}>1750</Text>
          <Text style={styles.kcalText}>kcal</Text>
        </View>
      
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    backgroundColor: variabless.VariableCollectionDark, // Placeholder for var(--variable-collection-dark)
    minHeight: 1076,
    minWidth: 440,
    overflow: 'hidden',
    position: 'relative', // Necessary for absolute children
    width: '100%',
  },

  // CSS: .frame .rectangle
  rectangle: {
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
    // Note: box-shadow is converted to RN's specific shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // #00000040 is 25% opacity
    shadowRadius: 4,
    
    height: 59,
    // Converting left: calc(50.00% - 204px)
    left: '50%',
    transform: [{ translateX: -204 }],
    
    position: 'absolute',
    top: 131,
    width: 408,
  },

  // CSS: .frame .div
  //OFFCENTER??????
  div: {
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    height: 126,
    
    left: 0,
    position: 'absolute',
    top: -20,
    width: '100%',
  },

  // CSS: .frame .group
  group: {
    height: 360,
    // Converting left: calc(50.00% - 204px)
    left: '50%',
    transform: [{ translateX: -204 }],
    
    position: 'absolute',
    top: 791,
    width: 408,
  },

  // CSS: .frame .rectangle-2
  rectangle2: {
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
    height: 337,
    // Converting left: calc(50.00% - 204px)
    left: '50%',
    transform: [{ translateX: -204 }],
    
    position: 'absolute',
    top: 0,
    width: 408,
  },

  // CSS: .frame .group-2
  group2: {
    height: 197,
    // Converting left: calc(50.00% - 170px)
    left: '50%',
    transform: [{ translateX: -170 }],

    position: 'absolute',
    top: 13,
    width: 342,
  },

  // CSS: .frame .rectangle-3
  rectangle3: {
    backgroundColor: '#bdbdbd',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 12,
    height: 197,
    // Converting left: calc(50.00% - 171px)
    left: '50%',
    transform: [{ translateX: -171 }],
    
    position: 'absolute',
    top: 0,
    width: 340,
  },

  // CSS: .frame .rectangle-4
  rectangle4: {
    backgroundColor: '#afafaf',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    bottom: 10,
    height: 8,
    // Converting left: calc(50.00% - 163px)
    left: '50%',
    transform: [{ translateX: -163 }],
    
    position: 'absolute',
    width: 325,
  },

  // CSS: .frame .rectangle-5
  rectangle5: {
    backgroundColor: '#afafaf',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    height: 35,
    left: 299,
    position: 'absolute',
    top: 11,
    width: 34,
  },

  // CSS: .frame .group-3
  group3: {
    height: 38,
    // Converting left and top calc()
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -164 }, 
      { translateY: -42 }
    ],
    position: 'absolute',
    width: 330,
  },

  // CSS: .frame .rectangle-6
  rectangle6: {
    backgroundColor: '#afafaf',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 8,
    height: 38,
    // Converting left and top calc()
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -165 }, 
      { translateY: -19 }
    ],
    position: 'absolute',
    width: 326,
  },

  // CSS: .frame .rectangle-7
  rectangle7: {
    backgroundColor: '#bdbdbd',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    height: 26,
    // Converting left and top calc()
    left: '50%',
    top: '50%',
    transform: [
      { translateX: 130 }, 
      { translateY: -13 }
    ],
    position: 'absolute',
    width: 25,
  },

  // CSS: .frame .rectangle-8
  rectangle8: {
    backgroundColor: '#bdbdbd',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    height: 26,
    // Converting left and top calc()
    left: '50%',
    top: '50%',
    transform: [
      { translateX: 97 }, 
      { translateY: -13 }
    ],
    position: 'absolute',
    width: 25,
  },

  // CSS: .frame .text-wrapper (Note: -webkit-text-stroke is omitted)
  textWrapper: {
    // -webkit-text-stroke omitted
    alignItems: 'center',
    color: '#ffffff',
    // Note: font-family 'Inter' must be loaded in Expo
    fontFamily: 'Inter', 
    fontSize: 12,
    fontWeight: '400',
    height: 25,
    justifyContent: 'center',
    left: 6,
    letterSpacing: 0,
    lineHeight: 12, // Using font size as a default line height for 'normal'
    position: 'absolute',
    top: 6,
    width: 131,
  },

  textWrapper2: {
    // -webkit-text-stroke is omitted
    alignItems: 'center',
    color: '#ffffff',
    // fontFamily 'Inter' must be loaded
    fontFamily: 'Inter', 
    fontSize: 12,
    fontWeight: '400',
    height: 25,
    justifyContent: 'center',
    left: 124,
    letterSpacing: 0,
    lineHeight: 12, // Using font size as a default line height
    position: 'absolute',
    top: 6,
    width: 131,
  },

  // CSS: .frame .group-4
  group4: {
    backgroundColor: '#afafaf',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 8,
    height: 38,
    // Converting left: calc(50.00% - 163px) and top: calc(50.00% + 2px)
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -163 },
      { translateY: 2 }
    ],
    position: 'absolute',
    width: 326,
  },

  // CSS: .frame .rectangle-9
  rectangle9: {
    backgroundColor: '#bdbdbd',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    height: 26,
    // Converting left: calc(50.00% + 132px) and top: calc(50.00% - 13px)
    left: '50%',
    top: '50%',
    transform: [
      { translateX: 132 },
      { translateY: -13 }
    ],
    position: 'absolute',
    width: 25,
  },

  // CSS: .frame .rectangle-10
  rectangle10: {
    backgroundColor: '#bdbdbd',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    height: 26,
    // Converting left: calc(50.00% + 99px) and top: calc(50.00% - 13px)
    left: '50%',
    top: '50%',
    transform: [
      { translateX: 99 },
      { translateY: -13 }
    ],
    position: 'absolute',
    width: 25,
  },

  // CSS: .frame .text-wrapper-3 (Text style)
  textWrapper3: {
    // -webkit-text-stroke is omitted
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    height: 22,
    justifyContent: 'center',
    left: 7,
    letterSpacing: 0,
    lineHeight: 16, // Using font size as line height
    position: 'absolute',
    top: 17,
    width: 92,
  },

  // CSS: .frame .group-5
  group5: {
    height: 66,
    // Converting left: calc(50.00% - 172px)
    left: '50%',
    transform: [{ translateX: -172 }],
    position: 'absolute',
    top: 219,
    width: 342,
  },

  // CSS: .frame .rectangle-11
  rectangle11: {
    backgroundColor: '#bdbdbd',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 12,
    height: 66,
    // Converting left: calc(50.00% - 171px)
    left: '50%',
    transform: [{ translateX: -171 }],
    position: 'absolute',
    top: 0,
    width: 340,
  },

  // CSS: .frame .rectangle-12
  rectangle12: {
    backgroundColor: '#afafaf',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    bottom: 8,
    height: 8,
    // Converting left: calc(50.00% - 162px)
    left: '50%',
    transform: [{ translateX: -162 }],
    position: 'absolute',
    width: 325,
  },

  // CSS: .frame .text-wrapper-4 (Text style)
  textWrapper4: {
    // -webkit-text-stroke is omitted
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    height: 22,
    justifyContent: 'center',
    left: 6,
    letterSpacing: 0,
    lineHeight: 12,
    position: 'absolute',
    top: 8,
    width: 92,
  },

  // CSS: .frame .rectangle-13
  rectangle13: {
    backgroundColor: '#afafaf',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    height: 35,
    left: 299,
    position: 'absolute',
    top: 9,
    width: 34,
  },

  // CSS: .frame .group-6
  group6: {
    height: 66,
    // Converting left: calc(50.00% - 170px)
    left: '50%',
    transform: [{ translateX: -170 }],
    position: 'absolute',
    top: 294,
    width: 342,
  },

  // CSS: .frame .rectangle-14
  rectangle14: {
    backgroundColor: '#afafaf',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 30,
    height: 35,
    left: 298,
    position: 'absolute',
    top: 6,
    width: 34,
  },

  // CSS: .frame .rectangle-15
  rectangle15: {
    backgroundColor: '#e74900',
    borderRadius: 30,
    height: 46,
    position: 'absolute',
    top: 50,
    width: 46,
    left: '80.7%',//guessed slightly off 
  },

  // CSS: .frame .rectangle-16
  rectangle16: {
    backgroundColor: '#e74900',
    borderRadius: 30,
    height: 46,
    position: 'absolute',
    top: 50,
    width: 46,
    left: '8.86%',//math
  },

  // CSS: .frame .group-wrapper main group
  mainGroup: {
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 16,
    // Box shadow conversion
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // #00000040 is 25% opacity
    shadowRadius: 4,
    
    // display: flex is default, justifyContent centers the content
    justifyContent: 'center',
    height: 582,
    left: '50%',
    transform: [{ translateX: -204 }],
    //left: 16, //HI HELLO HI
    overflow: 'hidden',
    position: 'absolute',
    top: 199,
    width: 408,
  },

  // CSS: .frame .group-7
  mainGroupBG: {
    alignItems: 'center',
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    borderRadius: 16,

    
    // display: flex and flex-direction: column are standard for View
    flexDirection: 'column',
    
    gap: 0, // removed gap between next meal group n giant group, added marginbottom to giant group instead
    height: 582,
    width: 408,
  },

  planRow: {
  flexDirection: 'row',
  justifyContent: 'space-between', // planText left, editText right
  alignItems: 'center',            // vertical alignment
  width: '100%',                   // span the whole group7 width
  paddingHorizontal: 16,           // optional, spacing from edges
},

planText: {
  color: '#ffffff',
  fontFamily: 'Lekton',
  fontSize: 20,
  fontWeight: '700',
  lineHeight: 24,
  textAlign: 'left',
  marginTop: 20,
},

editText: {
  color: '#e74900',
  fontFamily: 'Lekton',
  fontSize: 16,
  fontWeight: '400',
  lineHeight: 16,
  textAlign: 'right',
  textDecorationLine: 'underline',
  marginTop: 20,
},

  // CSS: .frame .group-8
  group8: {
    height: 334,
    marginLeft: 10,
    marginTop: 22,      //fat
    marginBottom: 90,   //guess
    position: 'relative',
    width: 346,
  },

  ellipse1Container: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -177 }], 
  },

  ellipse2Container: {
    position: 'absolute',
    top: 28,
    left: '50%',
    transform: [{ translateX: -149 }], 
  },

  ellipse3Container: {
    position: 'absolute',
    top: 57,
    left: '50%',
    transform: [{ translateX: -120 }], 
  },

  ellipse6Container: {
    position: 'absolute',
    top: 204,
    left: '50%',
    transform: [{ translateX: -105 }], 
  },

  ellipse7Container: {
    position: 'absolute',
    top: 132,
    left: '50%',
    transform: [{ translateX: -145 }], 
  },

  ellipse8Container: {
    position: 'absolute',
    top: 188,
    left: '50%',
    transform: [{ translateX: -170 }], 
  },


  // CSS: .frame .ellipse-6 (Gradient converted to solid fallback)
  kcalBackground: {
    // Fallback for linear-gradient: rgba(255, 255, 255, 0.12)
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 2,
    borderColor: '#ffffff1f',
    // Rounding '77.24px' to 77
    borderRadius: 77, 
    // Box shadow conversion
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // #00000040 is 25% opacity
    shadowRadius: 4,
    
    height: 154,
    left: 90,
    position: 'absolute',
    top: 90,
    width: 154,
  },

  // CSS: .frame .ellipse-7
  randomassdotontheright: {
    backgroundColor: '#ffffff',
    // Rounding '32.88px' to 33
    borderRadius: 33, 
    height: 66,
    left: 262,
    opacity: 0.2,
    position: 'absolute',
    top: 134,
    width: 66,
  },

  // CSS: .frame .text-wrapper-5
  carbsText: {
    alignItems: 'center',
    color: '#ffffff',
    // fontFamily 'Lekton' must be loaded
    fontFamily: 'Lekton', 
    fontSize: 12,
    fontWeight: '700',
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 15, 
    position: 'absolute',
    top: 55,
    // white-space: nowrap is omitted
  },

  // CSS: .frame .text-wrapper-6
  proteinsText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '700',
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 15,
    position: 'absolute',
    top: 26,
  },

  // CSS: .frame .text-wrapper-7
  fatsText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '700',
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 12,
    position: 'absolute',
    top: 0,
  },

  // CSS: .frame .text-wrapper-8
  carbsGramsText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '400',
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 15,
    opacity: 0.4,
    position: 'absolute',
    top: 260,
  },

  // CSS: .frame .text-wrapper-9
  proteinsGramsText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '400',
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 15,
    opacity: 0.4,
    position: 'absolute',
    top: 290,
  },

  // CSS: .frame .text-wrapper-10
  fatsGramsText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '400',
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 15,
    opacity: 0.4,
    position: 'absolute',
    top: 320,
  },

  // CSS: .frame .group-9 (Recommended Next Meal Container)
  nextMealGroup: {
    height: 60,
    marginLeft: 32,
    position: 'relative',
    width: 380,
  },

  // CSS: .frame .rectangle-17 (Main background of Group 9)
  rectangle17: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    height: 60,
    // Converting left: calc(50.00% - 190px)
    left: '50%',
    transform: [{ translateX: -190 }],
    position: 'absolute',
    top: 0,
    width: 348,
  },

  // CSS: .frame .rectangle-18 (Right end tab of Group 9)
  rectangle18: {
    backgroundColor: '#2d2d2d',
    // RN individual border radii
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    
    height: 60,
    // Converting left: calc(50.00% + 172px)
    left: '50%',
    transform: [{ translateX: 172 }],
    position: 'absolute',
    top: 0,
    width: 16,
  },

  // CSS: .frame .rectangle-19
  rectangle19: {
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    borderRadius: 12,
    height: 17,
    // Converting left: calc(50.00% + 62px)
    left: '50%',
    transform: [{ translateX: 62 }],
    position: 'absolute',
    top: 21,
    width: 50,
  },

  // CSS: .frame .rectangle-20
  rectangle20: {
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    borderRadius: 12,
    height: 44,
    // Converting left: calc(50.00% - 175px)
    left: '50%',
    transform: [{ translateX: -175 }],
    position: 'absolute',
    top: 8,
    width: 223,
  },

  // CSS: .frame .rectangle-21
  rectangle21: {
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    borderRadius: 12,
    height: 36,
    // Converting left: calc(50.00% + 133px)
    left: '50%',
    transform: [{ translateX: 133 }],
    position: 'absolute',
    top: 12,
    width: 14,
  },

  // CSS: .frame .text-wrapper-11
  textWrapper11: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    height: 27,
    justifyContent: 'center',
    left: 24,
    letterSpacing: 0,
    lineHeight: 12,
    position: 'absolute',
    top: 18,
    width: 199,
  },

  // CSS: .frame .rectangle-22 (Bottom Navigation/Bar)
  rectangle22: {
    backgroundColor: variabless.VariableCollectionMedium, // Placeholder for var(--variable-collection-medium)
    bottom: 0,
    height: 83,
    left: 1,
    position: 'absolute',
    width: 440,
  },

  // CSS: .frame .text-wrapper-12
  announcements: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    height: 62,
    justifyContent: 'center',
    // Converting left: calc(50.00% - 207px)
    left: '50%',
    transform: [{ translateX: -207 }],
    letterSpacing: 0,
    lineHeight: 12, // Using font size as a default line height
    position: 'absolute',
    textAlign: 'center',
    top: 153,
    width: 416,
  },

  // CSS: .frame .text-wrapper-13
  date: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    height: 43,
    justifyContent: 'center',
    // Converting left: calc(50.00% - 113px)
    left: '50%',
    transform: [{ translateX: -113 }],
    letterSpacing: 0,
    lineHeight: 12,
    position: 'absolute',
    textAlign: 'center',
    top: '6%', //guess
    width: 226,
  },

  // CSS: .frame .rectangle-23
  rectangle23: {
    backgroundColor: '#afafaf',
    height: 29,
    position: 'absolute',
    top: 60,
    width: 20,
    left: '59.77%', //263 / (160 + 260)

  },

  // CSS: .frame .rectangle-24
  rectangle24: {
    backgroundColor: '#afafaf',
    height: 29,
    position: 'absolute',
    top: 60,
    width: 20,
    left: '36.36%', //160 / 160 + 260
  },

  // CSS: .frame .text-wrapper-14
  /*planText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 20,
    fontWeight: '700',
    height: 20,
    justifyContent: 'center',
    left: 34,
    letterSpacing: 0,
    lineHeight: 20,
    position: 'absolute',
    top: 219,
  },*/

  // CSS: .frame .text-wrapper-15
  amText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    height: 15,
    justifyContent: 'center',
    left: '11%', //guess
    letterSpacing: 0,
    lineHeight: 12,
    opacity: 0.4,
    position: 'absolute',
    top: 662,
  },

  // CSS: .frame .text-wrapper-16
  pmText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    height: 15,
    justifyContent: 'center',
    left: '76.5%', //guess
    letterSpacing: 0,
    lineHeight: 12,
    opacity: 0.4,
    position: 'absolute',
    top: 662,
  },

  // CSS: .frame .text-wrapper-17
  /*editText: {
    alignItems: 'center',
    color: '#e74900',
    fontFamily: 'Lekton',
    fontSize: 16,
    fontWeight: '400',
    height: 16,
    justifyContent: 'center',
    left: 375,
    letterSpacing: 0,
    lineHeight: 16,
    position: 'absolute',
    textAlign: 'right',
    textDecorationLine: 'underline', // CSS text-decoration: underline
    top: 221,
  },*/

  // CSS: .frame .group-10
  group10: {
    height: 28,
    // Converting left: calc(50.00% - 175px)
    left: '50%',
    transform: [{ translateX: -175 }],
    position: 'absolute',
    top: 625,
    width: 348,
  },

  // CSS: .frame .group-11
  kcalGroup: {
    // RN default display is flex, but we explicitly set direction
    flexDirection: 'column', 
    height: 92,
    left: "33.8%", //guessed
    position: 'absolute',
    top: 385,
    width: 160,
  },

  // CSS: .frame .text-wrapper-18
  kcalCurrent: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 36,
    fontWeight: '700',
    height: 36,
    justifyContent: 'center',
    letterSpacing: 0,
    lineHeight: 36, // Set line height to match font size
    textAlign: 'center',
    width: 154,
    //marginBottom: 4,
    // Note: Since this is inside a column, justify/align items might not apply cleanly 
    // unless this <Text> is wrapped in a <View>, but keeping the style properties as is.
  },

  // CSS: .frame .rectangle-25
  kcalDivider: {
    backgroundColor: '#ffffff',
    height: 2,
    marginLeft: 23,
    marginTop: 1,
    width: 109,
  },

  // CSS: .frame .text-wrapper-19
  kcalGoal: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 36,
    fontWeight: '400',
    height: 36,
    justifyContent: 'center',
    letterSpacing: 0,
    lineHeight: 36,
    marginLeft: 35,
    marginTop: 9,
    width: 84,
  },

  // CSS: .frame .text-wrapper-20
  kcalText: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '700',
    height: 23,
    justifyContent: 'center',
    letterSpacing: 0,
    lineHeight: 12,
    marginLeft: 30,
    marginTop: 3,
    textAlign: 'right',
    width: 78,
  },
});
