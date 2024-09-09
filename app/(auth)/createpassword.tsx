import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreatePassword() {
    const router = useRouter()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleCreatePassword = () => {
      if (!password || !confirmPassword) {
        Alert.alert('Validation Error', 'All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Validation Error', 'Passwords do not match.');
        return;
      }
  
      // Simulate password creation
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Password created successfully.');
        router.replace("/(auth)/adminlogin"); // Redirect to login page
      }, 2000);
    };
  
    return (
      <LinearGradient colors={['#a7e7f7', '#b5f7c4']} style={styles.container}>
        <View style={styles.formContainer}>
        <Text style={styles.label}>Create Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry={true}
        />
  
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
  
        <Button title={loading ? 'Creating Password...' : 'Create Password'} onPress={handleCreatePassword} />
        </View>
        </LinearGradient>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    padding: 24,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1},
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // elevation: 5,
   
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
    

  },
  
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  secondaryButton: {
    borderColor: '#000',
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
  