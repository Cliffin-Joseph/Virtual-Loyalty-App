import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function RewardDetails({ route }) {
    const { rewards } = route.params;

    return (
    <View style={styles.container}>
        <Text style={styles.header}>Scan QR in the restaurant to claim!</Text>
        <QRCode value="www.google.com" size={200} styles={styles.qr}/>
        <Text style={styles.reward}>{rewards.reward}</Text>
        <Text style={styles.location}>Available at: {rewards.restaurant}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20 
    },
    header: {
        marginTop: -40,
        marginBottom: 60,
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center'
    },
    reward: { 
        fontSize: 24, 
        fontWeight: 'bold',
        marginTop: 10
    },
    location: { 
        fontSize: 18, 
        color: 'gray', 
        marginTop: 10 
    },
});