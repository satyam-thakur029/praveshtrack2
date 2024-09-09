import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {useRouter} from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';

export default function Otp() {
    const router = useRouter()
    const { email } = useLocalSearchParams();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleVerifyOtp = () => {
      if (!otp || otp.length !== 6) {
        Alert.alert('Validation Error', 'Please enter a valid 6-digit OTP.');
        return;
      }
      
      // Simulate OTP verification
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.replace("/(auth)/createpassword");
      }, 2000);
    };
  
    return (
      <LinearGradient colors={['#a7e7f7', '#b5f7c4']} style={styles.container}>
        <Text style={styles.label}>An OTP has been sent to {email}</Text>
        <TextInput
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter OTP"
          keyboardType="numeric"
        />
        <Button title={loading ? 'Verifying OTP...' : 'Verify OTP'} onPress={handleVerifyOtp} />
        </LinearGradient>
    );
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    label: {
      fontSize: 20,
      marginBottom: 8,
      
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
      backgroundColor:"white"
    },
  });
  