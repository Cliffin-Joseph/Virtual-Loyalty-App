import React from 'react';
import { SafeAreaView, StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import CardsScreen from './screens/Cards';
import ProfileScreen from './screens/Profile';
import Restaurant from './screens/Restaurant';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Restaurant" component={Restaurant} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default function Main() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
              <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> } }
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

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff', // Ensure background color matches your theme
    },
  });