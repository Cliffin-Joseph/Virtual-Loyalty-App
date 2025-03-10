// Updated Profile.js to Persist Profile Picture
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const storedUsers = await AsyncStorage.getItem('users');
    const currentUserID = await AsyncStorage.getItem('currentUserID');
    
    if (storedUsers && currentUserID) {
      const users = JSON.parse(storedUsers);
      const loggedInUser = users.find(user => user.id === JSON.parse(currentUserID));
      if (loggedInUser) {
        setUser(loggedInUser);
        setEditedUser(loggedInUser);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedUser.name || !editedUser.mobile || !editedUser.email || !editedUser.dob) {
      alert('All fields are required!');
      return;
    }

    setUser(editedUser);
    setIsEditing(false);
    
    // Update stored users
    const storedUsers = await AsyncStorage.getItem('users');
    if (storedUsers) {
      let users = JSON.parse(storedUsers);
      const index = users.findIndex(u => u.id === editedUser.id);
      if (index !== -1) {
        users[index] = editedUser;
        await AsyncStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newProfileImage = result.assets[0].uri;
      setEditedUser({ ...editedUser, profileImage: newProfileImage });

      // Save updated profile picture
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        let users = JSON.parse(storedUsers);
        const index = users.findIndex(u => u.id === editedUser.id);
        if (index !== -1) {
          users[index].profileImage = newProfileImage;
          await AsyncStorage.setItem('users', JSON.stringify(users));
        }
      }
    }
  };

  // Create function for calling onto other functions for changing profile picture
  const handleProfilePicturePress = () => {
    Alert.alert(
      "Change Profile Picture",
      "Do you want to change your profile picture?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: pickImage }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your Profile</Text>  
      {user ? (
        <>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleProfilePicturePress}>
              <Image source={editedUser.profileImage ? { uri: editedUser.profileImage } : require('../app/assets/default_profile.png')} style={styles.profileImage} />
            </TouchableOpacity>
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput 
              style={styles.input} 
              value={editedUser.name} 
              editable={isEditing} 
              onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
            />
            
            <Text style={styles.label}>Mobile</Text>
            <TextInput 
              style={styles.input} 
              value={editedUser.mobile} 
              editable={isEditing} 
              onChangeText={(text) => setEditedUser({ ...editedUser, mobile: text })}
            />
            
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              value={editedUser.email} 
              editable={isEditing} 
              onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
            />
            
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput 
              style={styles.input} 
              value={editedUser.dob} 
              editable={isEditing} 
              onChangeText={(text) => setEditedUser({ ...editedUser, dob: text })}
            />
          </View>

          {isEditing ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#ff6257',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
