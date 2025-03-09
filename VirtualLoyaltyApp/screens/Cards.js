import React, {useState}  from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import rewardsData  from '../app/components/RewardsData'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Cards() {
  const [isHorizontal, setIsHorizontal] = useState(true);
  
  const toggleScrollDirection = () => {
    setIsHorizontal(!isHorizontal);
  };

  const navigation = useNavigation();
;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.stampTitle}>
        <Text style={styles.header}>Your Stamp Cards</Text>
        <Button title = {isHorizontal ? "Expand" : "Collapse"} onPress = {toggleScrollDirection} />
      </View>

      {/* Cards */}
      <ScrollView style={ isHorizontal ? styles.cardContainerHorizontal : styles.cardContainerVertical} horizontal={isHorizontal} showsHorizontalScrollIndicator={false}>
        <Image source={require("../app/assets/McDonaldCard.png")} style={ isHorizontal? styles.imageHorizontal : styles.imageVertical}></Image>
        <Image source={require("../app/assets/ChickenRiceCard.png")} style={ isHorizontal? styles.imageHorizontal : styles.imageVertical}></Image>
        <Image source={require("../app/assets/FishballCard.png")} style={ isHorizontal? styles.imageHorizontal : styles.imageVertical}></Image>
      </ScrollView>

      {/* Rewards */}
      <Text style={styles.header}>Your Rewards</Text>
      <ScrollView contentContainerStyle={styles.rewardsContainer}>
        {rewardsData.map((rewards) => (
          <View key={rewards.id} style={styles.rewardItem}>
            <View style={styles.rewardIcon}>
              <Ionicons name="gift-outline" size={24} color="black" />
            </View>
            <View style={styles.rewardText}>
              <Text style={styles.rewardText}>Reward: {rewards.reward}</Text>
              <Text style={styles.restaurantText}>Restaurant: {rewards.restaurant}</Text>
            </View>
            <TouchableOpacity style={styles.rewardButton} onPress={() => navigation.navigate('Reward Details', { rewards })}>
              <Text>Use</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  stampTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainerHorizontal: {
    height: 220,
  },
  cardContainerVertical: {
    flex:1
  },
  imageHorizontal: {
    height: 210,
    width: 325,
    marginRight: 10,
    borderRadius: 10,
  },
  imageVertical: {
    height: 220,
    width: 340,
    marginBottom: 15
  },
  rewardsContainer: {
    paddingBottom: 20,
  },
  rewardItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 20,
    flex: 1
  },
  rewardIcon: {
    marginRight: 15
  },
  rewardButton: {
    justifyContent: 'center', // Center the button content
    alignItems: 'center', // Ensure the button content is centered
    backgroundColor: '#ff6257',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  restaurantText: {
    fontSize: 14,
    color: '#555',
    flex: 0.5
  },
  getCouponsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  getCouponsText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
