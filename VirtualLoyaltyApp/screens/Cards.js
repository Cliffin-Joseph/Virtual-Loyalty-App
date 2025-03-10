import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList, Dimensions, Image, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import restaurantData from '../app/components/RestaurantData';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Cards() {
  const navigation = useNavigation();
  const route = useRoute();
  const totalStamps = 8; //total number of stamps required to complete a card

  // To initialize restaurant data with empty stamp arrays 
  const [restaurants, setRestaurants] = useState(
    restaurantData.map(restaurant => ({
      ...restaurant,
      filledStamps: Array(totalStamps).fill(false), // to fill initial state with false (unfilled stamps)
    }))
  );
  const [globalRewards, setGlobalRewards] = useState([]);
  const [isHorizontal, setIsHorizontal] = useState(true);
  
  // Function to toggle between horizontal and vertical view
  const toggleScrollDirection = () => {
    try {
      setIsHorizontal(!isHorizontal);
      console.log("Horizontal is:", isHorizontal);
    } catch (error) {
      console.error("Error toggling scroll direction:", error);
    }
  };

  // Function to fill the next available stamp
  function fillNextStamp(index) {
    try {
      setRestaurants(prevRestaurants => {
        const updatedRestaurants = [...prevRestaurants];
        const restaurant = updatedRestaurants[index];

        if (!restaurant) return prevRestaurants;

        const nextStamp = restaurant.filledStamps.indexOf(false);
        if (nextStamp === -1) return prevRestaurants;

        restaurant.filledStamps[nextStamp] = true;

        // If all stamps are filled, trigger reward and reset stamps
        if (nextStamp === totalStamps - 1) {
          Alert.alert("Congratulations!", `You completed ${restaurant.name}'s stamp card!`);
          setGlobalRewards(prevRewards => [...prevRewards, { name: restaurant.rewards[0], image: restaurant.image, restaurant: restaurant.name }]);
          restaurant.filledStamps.fill(false);
        }

        return updatedRestaurants;
      });
    } catch (error) {
      console.error("Error filling stamp:", error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      
    {/* Header Section */}
    <View style={styles.stampTitle}>
      <Text style={styles.cardHeader}>Your Cards</Text>
      <TouchableOpacity 
        style={styles.changeButton}
        onPress = {toggleScrollDirection}
      >
        <Text style={styles.claimButtonText}>Change View</Text>
      </TouchableOpacity>
    </View>

    {/* Cards Display Section */}
    <View style={styles.cardsContainer}>
        <FlatList
          data={restaurants}
          horizontal={isHorizontal}
          pagingEnabled={isHorizontal}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => fillNextStamp(index)}>
              <View style={[styles.cardWrapper, { width }]}>
                <ImageBackground source={item.image} style={isHorizontal? styles.cardImageBackground : styles.verticalCardImageBackground} imageStyle={styles.cardImage}>
                  <View style={styles.overlay} />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={styles.stampsContainer}>
                    {item.filledStamps.map((filled, i) => (
                      <View key={i} style={[styles.stampPlaceholder, filled && styles.filledStamp]}>
                        {filled && <Ionicons name="star" size={40} color="#FFD700" />}
                      </View>
                    ))}
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Rewards Section */}
      <View style={styles.rewardsSection}>
        <Text style={styles.sectionHeader}>Your Rewards</Text>
        {globalRewards.length === 0 ? (
          <Text style={styles.noRewardsText}>Collect all stamps to unlock rewards!</Text>
        ) : (
          globalRewards.map((reward, i) => (
            <View key={i} style={styles.rewardContainer}>
              <Image source={reward.image} style={styles.rewardImage} />
              <View style={styles.rewardTextContainer}>
                <Text style={styles.rewardText}>{reward.name}</Text>
                <Text style={styles.restaurantText}>{reward.restaurant}</Text>
              </View>
              <TouchableOpacity 
                  style={styles.claimButton}
                  onPress={() => navigation.navigate('Reward Details', { rewards: reward })}
                >
                  <Text style={styles.claimButtonText}>Claim </Text>
                </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  stampTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',  
    paddingHorizontal: 20,
    marginBottom: 10, 
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  changeButton: {
    backgroundColor: '#ff6257',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 0,
  },
  cardsContainer: {
    height: 300,
    width: '100%',
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageBackground: {
    width: 360,
    height: 260,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalCardImageBackground: {
    width: 360,
    height: 260,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardImage: {
    borderRadius: 10,
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 15,
    textAlign: 'center',
  },
  stampsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    height: '60%',
    position: 'absolute',
    bottom: 45,
  },
  stampPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#ddd',
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledStamp: {
    backgroundColor: '#4CAF50',
  },
  rewardsSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  rewardContainer: {
    width: '90%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  rewardImage: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rewardTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
  },
  rewardText: {
    fontSize: 17,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 12,
  },
  restaurantText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
    flex: 0.5,
  },
  claimButton: {
    backgroundColor: '#ff6257',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 20,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noRewardsText: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
}); 