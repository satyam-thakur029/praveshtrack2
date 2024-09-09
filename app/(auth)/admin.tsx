import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';


export default function Admin() {
    const router = useRouter()
    const [orgId, setOrgId] = useState('');
    const [orgName, setOrgName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleRegister = () => {
      if (!orgId || !orgName || !email) {
        Alert.alert('Validation Error', 'All fields are required.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address.');
        return;
      }
      
      // Simulate OTP sending
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Redirect to OTP verification page
        // navigation.navigate('OtpVerification', { email });
        router.replace({ pathname: "/(auth)/otp", params: { email } });
      }, 2000);
    };
  
    return (
      <LinearGradient colors={['#a7e7f7', '#b5f7c4']} style={styles.container}>
        <View style={styles.formContainer}>
        <Text style={styles.label}>Organization ID</Text>
        <TextInput
          style={styles.input}
          value={orgId}
          onChangeText={setOrgId}
          placeholder="Enter Organization ID"
        />
  
        <Text style={styles.label}>Organization Name</Text>
        <TextInput
          style={styles.input}
          value={orgName}
          onChangeText={setOrgName}
          placeholder="Enter Organization Name"
        />
  
        <Text style={styles.label}>Official Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Official Email"
          keyboardType="email-address"
        />
  
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleRegister}>{loading ? 'Sending OTP...' : 'Register'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText} onPress={() => router.push('/(auth)/adminlogin')}>already registered?</Text>
        </TouchableOpacity>
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
  
  