import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: '#e74900', // Matches your orange theme
        tabBarInactiveTintColor: '#888',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6. 
        headerShown: useClientOnlyValue(false, false), //second one hides tab bar(bar at top of each tab) on expo demo?
        // The "Floating" Tab Bar Style
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#2d2d2d', // Matches your meal cards
          borderRadius: 20,
          height: 70,
          borderTopWidth: 0, // Removes the standard gray line
        },
        tabBarItemStyle: {
          marginTop: 10,
          marginBottom: 10,
        },
      }}>
        <Tabs
    ></Tabs>

      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null,
        }}
        
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,

          //this header right thing is hidden because top tab bar hidden
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),

        }}
      />

      
      <Tabs.Screen
        name="editfoodpage" //needs to match file name
        options={{
          title: 'Edit food', // text displayed on tab bar top/bottom
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />, // icon at the bottom
        }}
      />

    </Tabs>
  );
}
