// Updated Login.js with User ID Storage
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Function to handle user login
  const handleLogin = async () => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // to find user with matching email and password
    const userFound = users.find((user) => user.email === email && user.password === password);
    if (userFound) {
      await AsyncStorage.setItem('currentUserID', JSON.stringify(userFound.id)); // Store logged-in user ID
      alert('Login successful!');
      
      // Reset navigation so that user wont go back to login screen unless logged out
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }]
      });
    } else {
      alert('Invalid email or password'); // to show error if login fails
    }
  };

  return (
    <View style={styles.container}>
      {/* Login Header */}
      <Text style={styles.header}>Login</Text>
      
      {/* Email Input */}
      <Text style={styles.label}>Enter your Email</Text>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        style={styles.input} 
      />
      
      {/* Password Input */}
      <Text style={styles.label}>Enter your Password</Text>
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />
      
      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Navigation to Signup */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 15,
    color: '#007bff',
    fontSize: 14,
  },
});