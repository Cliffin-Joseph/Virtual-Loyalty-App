import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import CardsScreen from './screens/Cards';
import ProfileScreen from './screens/Profile';

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
              <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
              />
              <Tab.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} /> }}
              />
              <Tab.Screen 
                name="Cards" 
                component={CardsScreen} 
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="card" size={size} color={color} /> }}
              />
              <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} /> }}
              />
            </Tab.Navigator>
      </NavigationContainer>
    );
  }