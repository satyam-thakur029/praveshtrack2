import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function HomeScreen() {
  // Use predefined history
  const [history] = useState([
    { id: '1', type: 'Check In', time: '9:31 AM', location: '12.9716, 77.5946' },
    { id: '2', type: 'Check out', time: '11:11 AM', location: '12.9718, 77.5949' },
    { id: '3', type: 'Check In', time: '1:10 PM', location: '12.9720, 77.5952' },
    { id: '4', type: 'Check out', time: '3:51 PM', location: '12.9722, 77.5955' },
    { id: '5', type: 'Check In', time: '4:19 PM', location: '12.9724, 77.5958' },
    { id: '6', type: 'Check out', time: '5:11 PM', location: '12.9726, 77.5961' },
    { id: '7', type: 'Check In', time: '7:00 PM', location: '12.9728, 77.5964' },
    { id: '8', type: 'Check out', time: '9:00 PM', location: '12.9730, 77.5967' },
  ]);

  const showDetails = (item: { id?: string; type: any; time: any; location: any; }) => {
    Alert.alert(
      `${item.type} Details`,
      `Time: ${item.time}\nLocation: ${item.location}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Today's History</Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDetails(item)}>
              <View style={styles.historyItem}>
                <View>
                  <Text style={[styles.historyText, item.type === 'Check In' ? styles.checkIn : styles.checkOut]}>
                    {item.type}
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  historyText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeText: {
    color: '#6B7280',
  },
  locationText: {
    color: '#3B82F6', // Blue for location
    fontSize: 14,
  },
  checkIn: {
    color: '#10B981', // Green for Check In
  },
  checkOut: {
    color: '#EF4444', // Red for Check Out
  },
});
