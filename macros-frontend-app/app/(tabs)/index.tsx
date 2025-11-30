//import { StyleSheet } from 'react-native';
//import { Text, View } from '@/components/Themed';
//import EditScreenInfo from '@/components/EditScreenInfo';

import { StyleSheet, View, Text, Image } from 'react-native';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.frame}>
        <View style={styles.group}>


          <View style={styles.div}>
            {/* Convert <img> to <Image> and src to uri */}
            <Image
                style={styles.ellipse}
                alt="Ellipse"
                source={{ uri: "https://c.animaapp.com/7FlCCH6I/img/ellipse-1.svg" }}
            />
            <Image
                style={styles.ellipse2}
                alt="Ellipse"
                source={{ uri: "https://c.animaapp.com/7FlCCH6I/img/ellipse-2.svg" }}
            />
            <Image
                style={styles.ellipse4}
                alt="Ellipse"
                source={{ uri: "https://c.animaapp.com/7FlCCH6I/img/ellipse-3.svg" }}
            />
            <View style={styles.ellipse6} /> 
            <View style={styles.ellipse7} />
            <Image
                style={styles.vector}
                alt="Vector"
                source={{ uri: "https://c.animaapp.com/7FlCCH6I/img/vector-1.svg" }}
            />
            {/* Convert text divs to <Text> */}
            <Text style={styles.textWrapper}>carbs</Text>
            <Text style={styles.textWrapper2}>proteins</Text>
            <Text style={styles.textWrapper3}>fats</Text>
            <Text style={styles.textWrapper4}>20/55 g</Text>
            <Text style={styles.textWrapper5}>80/120 g</Text>
            <Text style={styles.textWrapper6}>154/310 g</Text>
          </View>

          <View style={styles.group2}>
            <View style={styles.rectangle} />
            <View style={styles.rectangle2} />
            <View style={styles.rectangle3} />
            <View style={styles.rectangle4} />
            <View style={styles.rectangle5} />
            <Text style={styles.textWrapper7}>recommended next meal</Text>
          </View>

        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /*
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },*/

  frame: {
    backgroundColor: 'transparent', // #00000000
    borderWidth: 1,
    borderColor: '#ffffff1f',
    // display: flex is default, justifyContent: center is for flex-direction: row
    justifyContent: 'center', 
    minHeight: 582,
    minWidth: 408,
    width: '100%',
  },

  // CSS: .frame .group
  group: {
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    flexDirection: 'column',
    gap: 90,
    height: 582,
    width: 408,
    // Note: This element has display: flex and flex-direction: column
  },

  // CSS: .frame .div
  div: {
    height: 334,
    marginLeft: 10,
    marginTop: 66,
    position: 'relative',
    width: 346,
  },

  // CSS: .frame .ellipse
  ellipse: {
    height: 334,
    // Converting left: calc(50.00% - 173px)
    left: '50%',
    transform: [{ translateX: -173 }],
    position: 'absolute',
    top: 0,
    width: 175,
  },

  // CSS: .frame .img
  img: {
    height: 146,
    // Converting left: calc(50.00% - 170px)
    left: '50%',
    transform: [{ translateX: -170 }],
    position: 'absolute',
    top: 188,
    width: 172,
  },

  // CSS: .frame .ellipse-2
  ellipse2: {
    height: 278,
    // Converting left: calc(50.00% - 145px)
    left: '50%',
    transform: [{ translateX: -145 }],
    position: 'absolute',
    top: 28,
    width: 147,
  },

  // CSS: .frame .ellipse-3
  ellipse3: {
    height: 173,
    // Converting left: calc(50.00% - 145px)
    left: '50%',
    transform: [{ translateX: -145 }],
    position: 'absolute',
    top: 132,
    width: 147,
  },

  // CSS: .frame .ellipse-4
  ellipse4: {
    height: 219,
    // Converting left: calc(50.00% - 116px)
    left: '50%',
    transform: [{ translateX: -116 }],
    position: 'absolute',
    top: 57,
    width: 118,
  },

  // CSS: .frame .ellipse-5
  ellipse5: {
    height: 72,
    // Converting left: calc(50.00% - 105px)
    left: '50%',
    transform: [{ translateX: -105 }],
    position: 'absolute',
    top: 204,
    width: 107,
  },

  // CSS: .frame .ellipse-6 (Gradient converted to solid fallback)
  ellipse6: {
    // Fallback for linear-gradient(..., rgba(255, 255, 255, 0.2) ...)
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderWidth: 1,
    borderColor: '#ffffff1f',
    // RN borderRadius must use a number, not string unit like '77.24px'
    borderRadius: 77, 
    height: 154,
    left: 90,
    position: 'absolute',
    top: 90,
    width: 154,
  },

  // CSS: .frame .ellipse-7 (Gradient converted to solid fallback)
  ellipse7: {
    // Fallback for nested linear-gradients. Using the solid color opacity.
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#ffffff1f',
    borderRadius: 33, // Rounding '32.88px' to 33
    height: 66,
    left: 262,
    position: 'absolute',
    top: 134,
    width: 66,
  },



  vector: {
    height: 31,
    left: 282,
    position: 'absolute',
    top: 152,
    width: 25,
  },

  // CSS: .frame .text-wrapper
  //carbs
  textWrapper: {
    alignItems: 'center',
    color: '#ffffff',
    // Note: fontFamily 'Lekton' must be loaded in Expo
    fontFamily: 'Lekton', 
    fontSize: 12,
    fontWeight: '700',
    height: 12,
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 12, // Using font size as a default line height
    position: 'absolute',
    top: 58,
    // white-space: nowrap is omitted as it's not a standard RN property for single-line text
  },

  // CSS: .frame .text-wrapper-2
  //proteins
  textWrapper2: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '700',
    height: 12,
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 12,
    position: 'absolute',
    top: 29,
  },

  // CSS: .frame .text-wrapper-3
  //fats
  textWrapper3: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '700',
    height: 12,
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 12,
    position: 'absolute',
    top: 0,
  },

  // CSS: .frame .text-wrapper-4
  //20/50g
  textWrapper4: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '400',
    height: 12,
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 12,
    opacity: 0.4,
    position: 'absolute',
    top: 262,
  },

  // CSS: .frame .text-wrapper-5
  //80/120 g
  textWrapper5: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '400',
    height: 12,
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 12,
    opacity: 0.4,
    position: 'absolute',
    top: 292,
  },

  // CSS: .frame .text-wrapper-6
  //154/310 g
  textWrapper6: {
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Lekton',
    fontSize: 12,
    fontWeight: '400',
    height: 12,
    justifyContent: 'center',
    left: 181,
    letterSpacing: 0,
    lineHeight: 12,
    opacity: 0.4,
    position: 'absolute',
    top: 322,
  },

  // CSS: .frame .group-2
  group2: {
    height: 60,
    marginLeft: 32,
    position: 'relative',
    width: 380,
  },


  //bottom large rectangle
  rectangle: {
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

  // CSS: .frame .rectangle-2
  //partial rectangle on very right
  rectangle2: {
    backgroundColor: '#2d2d2d',
    // RN only supports a single borderRadius or individual corner radii:
    borderTopLeftRadius: 12,
    borderTopRightRadius: 0, // Explicitly set to 0 for the single-edge curve
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 12,
    
    height: 60,
    // Converting left: calc(50.00% + 172px)
    left: '50%',
    transform: [{ translateX: 172 }],
    position: 'absolute',
    top: 0,
    width: 16,
  },

  // CSS: .frame .rectangle-3
  rectangle3: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    height: 17,
    // Converting left: calc(50.00% + 62px)
    left: '50%',
    transform: [{ translateX: 62 }],
    position: 'absolute',
    top: 21,
    width: 50,
  },

  // CSS: .frame .rectangle-4
  rectangle4: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    height: 44,
    // Converting left: calc(50.00% - 175px)
    left: '50%',
    transform: [{ translateX: -175 }],
    position: 'absolute',
    top: 8,
    width: 223,
  },

  // CSS: .frame .rectangle-5
  rectangle5: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    height: 36,
    // Converting left: calc(50.00% + 133px)
    left: '50%',
    transform: [{ translateX: 133 }],
    position: 'absolute',
    top: 12,
    width: 14,
  },

  // CSS: .frame .text-wrapper-7
  //recommended next meal text
  textWrapper7: {
    alignItems: 'center',
    color: '#ffffff',
    // fontFamily 'Inter' must be loaded in Expo
    fontFamily: 'Inter', 
    fontSize: 12,
    fontWeight: '400',
    height: 27,
    justifyContent: 'center',
    left: 24,
    letterSpacing: 0,
    lineHeight: 12, // Using font size as a default line height
    position: 'absolute',
    top: 18,
    width: 199,
  },
});
