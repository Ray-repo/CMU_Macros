import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// 1. Your Imports
import Shrimp from "../../assets/images/shrimp-svgrepo-com.svg";
import Turtle from "../../assets/images/turtle-svgrepo-com.svg";
import Crab from "../../assets/images/crab-svgrepo-com.svg";
import Dino from "../../assets/images/dinosaur-svgrepo-com.svg";
import Elk from "../../assets/images/elk-svgrepo-com.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Creature {
  id: number;
  x: number;
  y: number;
  Component: React.FC<any>; // This tells TS it's a component
}


// 2. Put your components in a list for easy picking
const CREATURE_TYPES = [Shrimp, Turtle, Crab, Dino, Elk];



export default function TabTwoScreen() {
  // 2. Tell useState it's an array of Creatures, not "never"
  const [creatures, setCreatures] = useState<Creature[]>([]);

  const addCreature = () => {
    const RandomCreature = CREATURE_TYPES[Math.floor(Math.random() * CREATURE_TYPES.length)];
    
    // 3. This object now matches the "Creature" interface perfectly
    const newEntry: Creature = {
      id: Date.now(),
      x: Math.random() * (Dimensions.get('window').width - 70),
      y: Math.random() * (Dimensions.get('window').height - 200),
      Component: RandomCreature,
    };

    setCreatures([...creatures, newEntry]);
  };

  // --- NEW: The Reset Function ---
  const clearOcean = () => {
    setCreatures([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ocean Party</Text>
        
        {/* The Reset Button */}
        <TouchableOpacity style={styles.clearButton} onPress={clearOcean}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Main touch area to spawn creatures if the screen is empty */}
      {creatures.length === 0 && (
        <TouchableOpacity style={styles.emptyState} onPress={addCreature}>
          <Text style={{ color: 'white' }}>yeet</Text>
        </TouchableOpacity>
      )}

      {creatures.map((item) => {
        const Visual = item.Component;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={addCreature}
            style={[styles.creatureWrapper, { top: item.y, left: item.x }]}
          >
            <Visual width={100} height={100} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    zIndex: 999,               // This is the "Magic" number
    elevation: 10,             // Required for Android "on top" behavior
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: '#9a989869', // Red stands out better
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  creatureWrapper: {
    position: 'absolute',
    // We don't need zIndex here, they will naturally be below 999
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});