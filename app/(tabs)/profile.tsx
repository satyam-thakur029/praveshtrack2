
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Modal, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install Ionicons

export default function ProfileScreen() {
  // State for name, email, username, profile picture, and modal visibility
  const [name, setName] = useState('Arpit Jain');
  const [email, setEmail] = useState('thakursatyam029@gmail.com');
  const [username] = useState('@satyam');
  const [profilePicture, setProfilePicture] = useState('https://api.multiavatar.com/Binx Bond.png');
  const [isEditing, setIsEditing] = useState(false); // Controls the modal visibility

  // Handler for saving profile changes
  const handleSave = () => {
    // Here you can add validation or API calls to save the updated profile
    setIsEditing(false); // Close the modal after saving
    Alert.alert('Success', 'Profile updated successfully.');
  };

  // Handler for signing out
  const handleSignOut = () => {
    // Implement your sign-out logic here, such as clearing auth tokens and navigating to the sign-in screen
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out Admin?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => {
            // Example: Navigate to SignIn screen
            // navigation.navigate('SignIn');
            Alert.alert('Signed Out', 'You have been signed out Admin.');
          } 
        },
      ],
      { cancelable: true }
    );
  };

  // Handler for deleting account
  const handleDeleteAccount = () => {
    // Implement your account deletion logic here, such as making an API call to delete the user account
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account Admin? ',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Example: Call API to delete account
            Alert.alert('Account Deleted', 'Your account has been deleted.');
          } 
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image 
            style={styles.avatar}
            source={{ uri: profilePicture }} // Use the dynamic profile picture URL
          />
        </View>
        
        {/* Name and Username */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>{username}</Text>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit Admin Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Account Settings</Text>

        {/* Settings Options */}
        <TouchableOpacity>
        <View style={styles.option}>
          <Ionicons name="lock-closed-outline" size={24} color="#4285F4" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Security</Text>
            <Text style={styles.optionSubtext}>Activate for extra security</Text>
          </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity >
        <View style={styles.option}>
          <Ionicons name="help-circle-outline" size={24} color="#A142F4" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Attendance Query</Text>
            <Text style={styles.optionSubtext}>Received full details about Attendance</Text>
            
          </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity>
        <View style={styles.option}>
          <Ionicons name="notifications-outline" size={24} color="#34C759" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Notifications</Text>
            <Text style={styles.optionSubtext}>Manage the alerts you receive for Employee</Text>
          </View>
        </View>
        </TouchableOpacity>

        {/* Sign Out Option */}
        <TouchableOpacity style={styles.option} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#FF9500" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Sign Out</Text>
          </View>
        </TouchableOpacity>

        {/* Delete Account Option */}
        <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Delete Account</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={isEditing} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Admin Profile</Text>
            
            {/* Input for changing the name */}
            <TextInput
              style={styles.input}
              placeholder="Change Name"
              value={name}
              onChangeText={setName} // Updates name in state
            />

            {/* Input for changing the email */}
            <TextInput
              style={styles.input}
              placeholder="Enter the E-Mail"
              value={email}
              onChangeText={setEmail} // Updates email in state
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Input for changing the profile picture URL */}
            <TextInput
              style={styles.input}
              placeholder="Change Profile Picture URL"
              value={profilePicture}
              onChangeText={setProfilePicture} // Updates profile picture URL in state
              autoCapitalize="none"
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
 
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#E5E5EA',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  settingsSection: {
    marginTop: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  optionTextContainer: {
    marginLeft: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#E5E5EA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
});

