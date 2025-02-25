import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Placeholder Data
const restaurants = [
  { id: '1', name: 'McDonalds', image: require('../app/assets/alien.jpg') },
  { id: '2', name: 'Fishball Noodles', image: require('../app/assets/article1.jpg') },
  { id: '3', name: 'Ramen House', image: require('../app/assets/article4.jpg') },
  { id: '4', name: 'Bubble Tea', image: require('../app/assets/warcraft.jpg') },
];

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchText.toLowerCase())
    );
    
    setFilteredRestaurants(filtered);
    setSearchActive(true); 
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
      
      {searchActive && filteredRestaurants.length > 0 && (
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

