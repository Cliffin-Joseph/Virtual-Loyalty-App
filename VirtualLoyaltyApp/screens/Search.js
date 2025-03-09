import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import restaurantData from '../app/components/RestaurantData';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    
    if (text.trim() === '') {
      setFilteredRestaurants([]);
      return;
    }

    const filtered = restaurantData.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredRestaurants(filtered);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      
      {filteredRestaurants.length > 0 ? (
        <>
          <Text style={styles.header}>Search Results</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
                <Image source={restaurant.image} style={styles.restaurantImage} />
                <View style={styles.overlay}>
                  <Text style={styles.restaurantText}>{restaurant.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : searchText !== '' && (<Text style={styles.noResults}>No restaurants found.</Text>)}
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
  restaurantCard: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
    height: 170,
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
});

