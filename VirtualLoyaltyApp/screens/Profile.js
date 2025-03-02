import React from 'react';
import { View, Text, TextInput, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
          <Text style={styles.header}>Edit your profile here</Text>
    </View>
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
    }
});