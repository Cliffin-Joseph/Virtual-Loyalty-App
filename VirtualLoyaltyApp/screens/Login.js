import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";

export default function AuthScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Use local storage for registered users
    const [users, setUsers] = useState([]); 
    const [isRegister, setIsRegister] = useState(false);

    const handleAuth = () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password");
            return;
        }

        if (isRegister) {
            // Check if user already exists
            if (users.some(user => user.username === username)) {
                Alert.alert("Error", "User already exists!");
            } else {
                // Add new user
                setUsers([...users, { username, password }]);
                Alert.alert("Success", "Registration complete!");
            }
        } else {
            // Check if login details match
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                Alert.alert("Success", "Login successful!");
            } else {
                Alert.alert("Error", "Invalid username or password");
            }
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />
            <Button title={isRegister ? "Register" : "Login"} onPress={handleAuth} />
            <Text
                onPress={() => setIsRegister(!isRegister)}
                style={{ textAlign: "center", marginTop: 10, color: "blue" }}
            >
                {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </Text>
        </View>
    );
}
