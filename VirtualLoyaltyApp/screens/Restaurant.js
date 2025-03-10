import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function Restaurant({ route, navigation }) {
  // Check if restaurant data is available in route params
  if (!route.params || !route.params.restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Restaurant Not Found</Text>
      </View>
    );
  }

  const restaurant = route.params.restaurant;  // Extract restaurant data
  const [region, setRegion] = useState(null);  // Store location coordinates
  const [loading, setLoading] = useState(true);  // State to track loading status

  useEffect(() => {
    // to fetch geographical coordinates based on the restaurant's postal code
    const fetchCoordinates = async () => {
      try {
        const apiKey = 'AIzaSyDrm6BoPO7OKt4at6LAqO-W9PvNq3JPLJc';
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant.postalCode},SG&key=${apiKey}`
        );
        const data = await response.json();
        
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [restaurant]); // Runs every time a new restaurant is selected

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Restaurant Image */}
        <Image source={restaurant.image} style={styles.restaurantBanner} />

        {/* Restaurant Name & Description */}
        <Text style={styles.header}>{restaurant.name}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>

        {/* Promotions Section */}
        <Text style={styles.header}>Promotions</Text>
        {restaurant.promotions.map((promo, index) => (
          <Text key={index} style={styles.promoText}>• {promo}</Text>
        ))}

        {/* Nearby Stores Section */}
        <Text style={styles.header}>Find Store</Text>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : region ? (
            <MapView 
              style={styles.map} 
              region={region} // Automatically centers the store
              key={restaurant.id} // ensures that the map re-renders when a new restaurant is selected
            >
              <Marker coordinate={region} title={restaurant.name} />
            </MapView>
          ) : (
            <Text style={styles.errorText}>Map could not be loaded</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0, 
    left: 0,
    zIndex: 10, 
    width: '100%',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    padding: 8,
    alignSelf: 'flex-start',
  },
  scrollContainer: {
    paddingTop: 80, 
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  restaurantBanner: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  mapContainer: {
    width: '100%',
    height: 220, 
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  promoText: {
    fontSize: 14,
    color: '#444',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});
