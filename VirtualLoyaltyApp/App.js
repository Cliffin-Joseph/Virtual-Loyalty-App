import React from 'react';
import { SafeAreaView, StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import CardsScreen from './screens/Cards';
import ProfileScreen from './screens/Profile';
import RestaurantScreen from './screens/Restaurant';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack that stores all navigations within home tab
function HomeStack() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Restaurant" 
        component={RestaurantScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
    </SafeAreaView>
    
  );
}

// Stack that stores all navigations within profile tab
function ProfileStack() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Navigator>
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      {/* For when we implement the edit profile screen*/}
      <Stack.Screen 
        name="EditProfile" 
        component={ProfileScreen} 
        options={{ headerShown: true, title: 'Edit Profile' }} 
      />
    </Stack.Navigator>
    </SafeAreaView>
  );
}

// The Botton Tab Navigator
function MainAppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={({ route }) => ({
          title: `Welcome, ${route.params?.loggedInUser}!`,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        })} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} /> 
        }} 
      />
      <Tab.Screen 
        name="Cards" 
        component={CardsScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="card" size={size} color={color} /> 
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} /> 
        }} 
      />
    </Tab.Navigator>
  );
}

// The Main Stack that allows you to navigate between login, signup and the main app
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Main" 
        component={MainAppTabs} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// The Root Navigation
export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Store username
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerTitle: `Welcome, ${loggedInUser || "Guest"}!` }}>
            <Tab.Screen name="Home">
                {() => <Home loggedInUser={loggedInUser} />}
            </Tab.Screen>
            <Tab.Screen name="Login">
                {() => <Login setLoggedInUser={setLoggedInUser} />}
            </Tab.Screen>
            <Tab.Screen name="Signup">
                {() => <Signup setLoggedInUser={setLoggedInUser} />}
            </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
);
}

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });