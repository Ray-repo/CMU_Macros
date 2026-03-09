import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Camera from "../../assets/images/Camera.svg";
import Mic from "../../assets/images/Mic.svg";
import X from "../../assets/images/X.svg";



// Helper component to replicate your "ItemCondensed" if it's not yet defined
const ItemCondensed = () => (
    <View style={styles.itemCondensedInstance}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'Lekton' }}>Food name</Text>
                <Text style={{ color: 'white', opacity: 0.6 }}>x1</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text style={styles.textWrapper8}>20g</Text>
                <Text style={styles.textWrapper8}>20g</Text>
                <Text style={{ color: 'white' }}>250 kCal</Text>
            </View>
        </View>
    </View>
);

const vars = {
    dark: 'rgba(24, 24, 24, 1)',
    highlight: 'rgba(231, 73, 0, 1)',
    medium: 'rgba(28, 31, 30, 1)',
    cardstroke: 'rgba(255, 255, 255, 0.12)',
    fontLekton: 'Lekton', // Ensure this font is loaded in Expo
};

// Reusable Section Component
const FoodSection = ({ title }: { title: string }) => (
  <View style={styles.foodsectionframe}>
    <Text style={styles.sectionHeader}>{title}</Text>
    <View style={styles.macroHeaderRow}>
      {/* fix? */}
      <Text style={styles.textWrapper8}>protein</Text>
      <Text style={styles.textWrapper9}>carbs</Text>
      <Text style={styles.textWrapper8}>calories</Text>
    </View>
    
    {/* pass data here later */}
    <ItemCondensed />
    <ItemCondensed />
    <ItemCondensed />

    <TouchableOpacity style={styles.frame9}>
      <Text style={styles.textWrapper10}>Show more</Text>
    </TouchableOpacity>
  </View>
);


export default function TabThreeScreen() {
  return (
    <View style={styles.addItem}>
      {/* Background Layers */}
      <View style={styles.topbg} />

      {/* Search Bar Area */}
      <View style={styles.rectangle4}>
        <Text style={styles.searchText}>Avocado</Text>
        <Mic width={20} height={20} color="white" />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.underscrollbar}>
          {/* fix it later so it actually works */}
          <TouchableOpacity style={styles.highlightedselection}>
            <X width={16} height={16} color="white" />
            <Text style={styles.text}>Meals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherselections}>
            <Text style={styles.text}>Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherselections}>
            <Text style={styles.text}>Ingredients</Text>
          </TouchableOpacity>
          {/* bruh */}
          <View style={[styles.whiterectangle, { marginLeft: 'auto' }]} />
        </View>

        <FoodSection title="Favorites" />
        <FoodSection title="On-Campus" />
        <FoodSection title="Off-Campus" />

        {/* Bottom Action Buttons */}
        <TouchableOpacity style={styles.createboxes}><Text style={styles.createtext}>create food</Text></TouchableOpacity>
        <TouchableOpacity style={styles.createboxes}><Text style={styles.createtext}>create Recipe</Text></TouchableOpacity>
        <View style={styles.customCard}>
          <Text style={styles.customCardText}>Custom</Text>
        </View>
      </ScrollView>


      {/* Header Fixed Elements */}
      <View style={styles.tempbox1} />
      <View style={styles.tempbox2} />

      <TouchableOpacity style={styles.cameraWrapper}>
          <Camera width={24} height={24} color={vars.dark} />
      </TouchableOpacity>

      <Text style={styles.textWrapper13}>Add Meal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    addItem: {
        backgroundColor: vars.medium,
        flex: 1,
        position: 'relative',
    },
    topbg: {
        backgroundColor: vars.dark,
        borderWidth: 1, //change to 0?
        borderColor: vars.cardstroke,
        height: 177,
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    rectangle4: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      borderWidth: 1,
      borderColor: vars.cardstroke,
      borderRadius: 40,
      height: 48,
      left: 14,
      right: 71, // This keeps room for the Camera button next to it
      position: 'absolute',
      top: 114,
      flexDirection: 'row', // Align text and mic horizontally
      alignItems: 'center', // Center them vertically
      paddingHorizontal: 22,
    },
    searchText: {
      color: '#ffffff',
      fontFamily: vars.fontLekton,
      fontSize: 16,
      flex: 1, // Takes up all space, pushing the mic to the right
    },
    scrollcontainer: {
        flex: 1,
        marginTop: 175,
        padding: 12,
    },
    underscrollbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },
    highlightedselection: {
        backgroundColor: vars.highlight,
        borderWidth: 1,
        borderColor: vars.cardstroke,
        borderRadius: 12,
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        alignItems: 'center',
    },
    otherselections: {
        backgroundColor: 'rgba(24, 24, 24, 0.6)',
        borderWidth: 1,
        borderColor: vars.cardstroke,
        borderRadius: 12,
        padding: 10,
    },
    text: {
        color: '#ffffff',
        fontFamily: vars.fontLekton,
        fontSize: 14,
    },
    whiterectangle: {
        backgroundColor: '#d9d9d9',
        height: 35,
        width: 39,
    },
    foodsectionframe: {
        alignItems: 'flex-end',
        width: '100%',
        paddingVertical: 12,
    },
    sectionHeader: {
      color: '#ffffff',
      fontFamily: vars.fontLekton,
      fontSize: 16,
      fontWeight: '700',
      width: '100%',
      paddingHorizontal: 12, 
      marginBottom: 8,       
    },
    macroHeaderRow: {
      flexDirection: 'row',     // Items in a line
      justifyContent: 'flex-end', // Pushes the whole group to the right
      gap: 18,                  // Space between them
      width: '100%',            // Take up full width
      paddingHorizontal: 16,    // The padding from frameWrapper
    },
    textWrapper8: {
        color: '#ffffff',
        fontFamily: vars.fontLekton,
        fontSize: 12,
        opacity: 0.4,
    },
    textWrapper9: {
        color: '#ffffff',
        fontFamily: vars.fontLekton,
        fontSize: 12,
        opacity: 0.4,
        width: 40,
        textAlign: 'center',
    },
    itemCondensedInstance: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    frame9: {
        width: '100%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper10: {
        color: vars.highlight,
        fontFamily: vars.fontLekton,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    createboxes: {
        backgroundColor: vars.dark,
        borderWidth: 1,
        borderColor: vars.cardstroke,
        borderRadius: 12,
        height: 48,
        paddingHorizontal: 14,
        justifyContent: 'center',
        marginBottom: 12,
    },
    createtext: {
        color: '#ffffff',
        fontFamily: vars.fontLekton,
        fontSize: 16,
        width: 888, //fix width later
    },
    customCard: {
    backgroundColor: vars.dark,
    borderWidth: 1,
    borderColor: vars.cardstroke,
    borderRadius: 12,
    height: 130,
    width: '100%',
    // We use padding instead of absolute positioning for the text
    paddingLeft: 29, 
    paddingTop: 36,
    },
    customCardText: {
    color: '#ffffff',
    fontFamily: vars.fontLekton,
    fontSize: 16,
    },
    tempbox1: {
        backgroundColor: '#7c7c7c',
        height: 44,
        width: 49,
        left: 14,
        top: 58,
        position: 'absolute',
    },
    tempbox2: {
        backgroundColor: '#7c7c7c',
        height: 44,
        width: 49,
        right: 12,
        top: 58,
        position: 'absolute',
    },
    cameraWrapper: {
        backgroundColor: vars.highlight,
        borderWidth: 1,
        borderColor: vars.cardstroke,
        borderRadius: 100,
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        right: 13,
        top: 114,
        position: 'absolute',
    },
    textWrapper13: {
        color: '#ffffff',
        fontFamily: vars.fontLekton,
        fontSize: 14,
        width: '100%',
        textAlign: 'center',
        top: 69,
        position: 'absolute',
    },
});
