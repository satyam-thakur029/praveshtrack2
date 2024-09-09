import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; 
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter(); // Call router inside the component
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (adminId.length !== 8) {
      setErrorMessage('Employee ID must be exactly 8 characters long.');
      return false;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      if (adminId === "admin123" && password === "admin123") {
        try {
          await AsyncStorage.setItem('isLoggedIn', 'true'); 
          await AsyncStorage.setItem('userType', 'admin'); 
          Alert.alert('Login Successful');
          router.replace("/(tabs)");
        } catch (error) {
          console.error('Failed to save login state', error);
        }
      } else {
        Alert.alert("Incorrect ID or password!");
      }
    }
  };

  return (
    <LinearGradient
      colors={['#a7e7f7', '#b5f7c4','#a7e7f7']} 
      style={styles.gradient}
      locations={[0.1, 0.7,1]}
    >
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Admin ID"
        value={adminId}
        onChangeText={(text) => setAdminId(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText} >Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: 'royalblue',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
    color: 'black',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});