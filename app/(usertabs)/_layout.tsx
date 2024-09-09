import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Drawer Navigator setup
const Drawer = createDrawerNavigator();

function TabLayout({ navigation }) {
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  // Sample notifications with time
  const notifications = [
    { id: '1', time: '09:20 AM', text: 'You have been marked as present today.' },
  { id: '2', time: '10:30 AM', text: 'Reminder: Your check-in time is approaching.' },
  { id: '3', time: '12:05 PM', text: 'You missed your check-in time. Please update your status.' },
  { id: '4', time: '01:18 PM', text: 'Your shift ends in 1 hour.' },
  { id: '5', time: '02:28 PM', text: 'You have a meeting scheduled in 30 minutes.' },
  { id: '6', time: '04:40 PM', text: 'Your attendance report for the week is ready.' },
  { id: '7', time: '05:20 PM', text: 'Don’t forget to submit your timesheet by end of day.' },
  ];

  // Toggle the notification box visibility
  const toggleNotifications = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  return (
    <>
      <Tabs
        screenOptions={() => ({
          tabBarStyle: {
            backgroundColor: '#ffffff', // Light complementary color for the footer (tab bar)
          },
          headerStyle: {
            backgroundColor: '#93F7DC', // Background color for the header
          },
          headerTintColor: '#000000', // Text color for the header
          headerTitleStyle: {
            fontWeight: 'bold', // Optional: makes the header title bold
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu-outline" size={24} color="black" style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={toggleNotifications}>
                <Ionicons name="notifications" size={24} color="black" style={{ marginRight: 16 }} />
              </TouchableOpacity>

              {/* Notification Box */}
              {isNotificationVisible && (
                <View style={styles.notificationBox}>
                  <Text style={styles.notificationTitle}>Notifications</Text>

                  {notifications.map((notification) => (
                    <View key={notification.id} style={styles.notificationItem}>
                      <Text style={styles.notificationText}>{notification.text}</Text>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ),
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'time' : 'time-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

// Custom Drawer Content
function CustomDrawerContent(props) {
  const router = useRouter();

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Update AsyncStorage to reflect logout
      await AsyncStorage.setItem('isLoggedIn', 'false');
      await AsyncStorage.removeItem('userType'); // Optional: Clear the userType

      // Navigate to login page
      router.replace('/(auth)');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://api.multiavatar.com/${encodeURIComponent(name)}.png' }} 
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 18 }}>Arpit Jain</Text>
        <Text style={{ fontSize: 14, color: '#888' }}>arpit@example.com</Text>
      </View>

      <DrawerItem
        label="Leave Management"
        icon={({ color, size }) => <Ionicons name="briefcase-outline" size={size} color={color} />}
        onPress={() => console.log('Leave Management pressed')}
      />
      <DrawerItem
        label="Previous History"
        icon={({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />}
        onPress={() => console.log('Previous History pressed')}
      />
      <DrawerItem
        label="Settings"
        icon={({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />}
        onPress={() => console.log('Settings pressed')}
      />
      <DrawerItem
        label="Compliance"
        icon={({ color, size }) => <Ionicons name="shield-outline" size={size} color={color} />}
        onPress={() => console.log('Compliance pressed')}
      />
      <DrawerItem
        label="Ask AI"
        icon={({ color, size }) => <Ionicons name="chatbox-outline" size={size} color={color} />}
        onPress={() => console.log('Ask AI pressed')}
      />

      <View style={{ flex: 1 }} />

      <DrawerItem
        label="Logout"
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
        onPress={handleLogout}
        style={{ marginBottom: 20 }}
      />
    </DrawerContentScrollView>
  );
}

// Drawer Screen
function CustomDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Hide the drawer header
      }}
    >
      {/* We still need at least one screen for the drawer to function */}
      <Drawer.Screen name="Home" component={TabLayout} />
    </Drawer.Navigator>
  );
}

// Notification styles
const styles = StyleSheet.create({
  notificationBox: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: 250,
    minHeight:400,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  notificationItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationText: {
    fontSize: 18,
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});

export default function App() {
  return (
    // The root NavigationContainer is handled by expo-router, no need to include it again.
    <CustomDrawer />
  );
}
