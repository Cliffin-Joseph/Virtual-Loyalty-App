import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Placeholder Data
const restaurants = [
  { id: '1', name: 'McDonalds', image: require('./app/assets/alien.jpg') },
  { id: '2', name: 'Fishball Noodles', image: require('./app/assets/article1.jpg') },
  { id: '3', name: 'Ramen House', image: require('./app/assets/article4.jpg') },
  { id: '4', name: 'Bubble Tea', image: require('./app/assets/warcraft.jpg') },
];

// Home Screen with Banner and Horizontal ScrollView
function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Banner */}
      <Image source={require('./app/assets/newsletter2.jpg')} style={styles.banner} />
      {/* Promotions Section */}
      <Text style={styles.header}>Promotions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
            <Image source={restaurant.image} style={styles.restaurantImage} />
            <View style={styles.overlay}>
              <Text style={styles.restaurantText}>{restaurant.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Nearby Stores Section */}
      <Text style={styles.header}>Nearby Stores</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
            <Image source={restaurant.image} style={styles.restaurantImage} />
            <View style={styles.overlay}>
              <Text style={styles.restaurantText}>{restaurant.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Search Screen
function SearchScreen() {
  return (
    <View style={styles.searchContainer}>
      <TextInput style={styles.searchBox} placeholder="Search..." />
      <Text style={styles.header}>Popular Stores</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={styles.popularCard}>
            <Image source={restaurant.image} style={styles.restaurantImage} />
            <View style={styles.overlay}>
              <Text style={styles.restaurantText}>{restaurant.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.header}>Your Favourites</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={styles.favCard}>
            <Image source={restaurant.image} style={styles.restaurantImage} />
            <View style={styles.overlay}>
              <Text style={styles.restaurantText}>{restaurant.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Cards Screen
function CardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Stamp Cards</Text>
    </View>
  );
}

// Profile Screen
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit your profile here</Text>
    </View>
  );
}

function MainTabs() {
  return (
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

//styles - similar to css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flex: 0.75,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  searchBox: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: '30%',
    borderRadius: 10,
    marginBottom: 15,
  },
  restaurantCard: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 165,
    height: 150,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    paddingVertical: 5,
    alignItems: 'center',
  },
  restaurantText: {
    color: 'white',
    fontWeight: 'bold',
  },
  popularCard: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
    height: 170,
  },
  favCard: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
    height: 170,
  },
});