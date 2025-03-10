import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import restaurantData from '../app/components/RestaurantData';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);
  const navigation = useNavigation();

  // Function to handle search input changes
  const handleSearch = (text) => {
    setSearchText(text);
    
    if (text.trim() === '') {
      setFilteredRestaurants(restaurantData); // Shows all restaurants if the search box is empty
      return;
    }

    // Filter restaurants based on the search query
    const filtered = restaurantData.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredRestaurants(filtered);
  };

  // To navigate to the restaurant screen
  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Restaurant', { restaurant });
  };

  return (
    <View style={styles.searchContainer}>
      {/* Search Input Field */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      
      {/* Display Search Results or All Restaurants */}
      {filteredRestaurants.length > 0 ? (
        <>
          <Text style={styles.header}>{searchText ? 'Search Results' : 'All Restaurants'}</Text>
          
          {/* Scrollable List of Restaurants */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity key={restaurant.id} style={styles.restaurantCardVertical} onPress={() => handleRestaurantPress(restaurant)}>
                <Image source={restaurant.image} style={styles.restaurantImageVertical} />
                <View style={styles.restaurantDetails}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        // Show message if no results found
        <Text style={styles.noResults}>No restaurants found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchBox: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  restaurantCardVertical: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  restaurantImageVertical: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});