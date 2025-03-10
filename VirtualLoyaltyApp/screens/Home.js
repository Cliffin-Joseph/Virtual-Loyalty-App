import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import restaurantData from '../app/components/RestaurantData';

export default function Home() {
  const navigation = useNavigation(); // For Navigation
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersData = await AsyncStorage.getItem('users');
        if (usersData) {
          const users = JSON.parse(usersData);
          const lastUser = users[users.length - 1]; // Get the most recent signed-up user
          if (lastUser && lastUser.name) {
            setName(lastUser.name);
          }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
   <View style={styles.container}>
        {/* Welcome Message*/}
        {name ? <Text style={styles.welcomeText}>Welcome, {name}!</Text> : null}

        {/* Banner */}
        <Image source={require('../app/assets/newsletter2.jpg')} style={styles.banner} />
        
        {/* Promotions Section */}
        <Text style={styles.header}>Promotions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurantData.map((restaurant) => (
            <TouchableOpacity 
            key={restaurant.id} 
            style={styles.promotionCard}
            onPress={() => navigation.navigate('Restaurant', { restaurant })} // Navigate on press
          >
            <Image source={restaurant.image} style={styles.promotionImage} />
            <View style={styles.promotionDetails}>
              <Text style={styles.promotionTitle}>{restaurant.name}</Text>
                <View style={styles.promotionBox}>
                {restaurant.promotions.map((promo, index) => (
                    <Text key={index} style={styles.promotionText}>• {promo}</Text>
                ))}
                </View>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
        
        {/* Nearby Stores Section */}
        <Text style={styles.header}>Nearby Stores</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurantData.map((restaurant) => (
            <TouchableOpacity 
              key={restaurant.id} 
              style={styles.restaurantCard}
              onPress={() => navigation.navigate('Restaurant', { restaurant })} // Navigate on press
            >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  promotionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
    width: 300,
    height: 150,
    alignItems: 'center',
    padding: 0,
  },
  promotionImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  promotionDetails: {
    flex: 1,
    height: '100%',
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    top: 10,
    textAlign:'center',
  },
  promotionBox: {
    fontSize: 14,
    color: '#444',
    marginTop: 20,
  },
  promotionText: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
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
    height: '90%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)',
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