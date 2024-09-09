import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Animation values for fade and scale
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity set to 0
    const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale set to 0.8 (smaller)

    // Animate fade-in and scale-up
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1, // Fade to full opacity
                duration: 2000, // 2 seconds for fade-in
                useNativeDriver: true, // Use native driver for better performance
            }),
            Animated.spring(scaleAnim, {
                toValue: 1, // Scale back to original size
                friction: 3, // Lower friction for smooth scaling
                useNativeDriver: true, // Use native driver for better performance
            })
        ]).start();
    }, [fadeAnim, scaleAnim]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
                const userType = await AsyncStorage.getItem('userType');
                
                console.log('isLoggedIn:', isLoggedIn);
                console.log('userType:', userType);
                
                // Simulate a 3-second delay for splash screen
                setTimeout(() => {
                    if (isLoggedIn === 'true') {
                        if (userType === 'admin') {
                            router.replace("/(tabs)");
                        } else if (userType === 'employee') {
                            router.replace("/(usertabs)");
                        }
                    } else {
                        router.replace("/(auth)");
                    }
                    setLoading(false); 
                }, 3000); // 3-second delay
            } catch (error) {
                console.error('Failed to check login status', error);
                router.replace("/(auth)");
                setLoading(false); 
            }
        };

        checkLoginStatus();
    }, [router]);

    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                
                {/* Animated Content */}
                <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], flex:1, justifyContent:'center', alignItems:'center' }}>
                    <Image
                        source={require('../assets/images/praveshtrack_logo.png')} // Replace with your image path
                        style={styles.image}
                    />
                    <Text style={styles.title}>प्रवेशTrak</Text>
                    <Text style={styles.tagline}>Streamline Attendance, Simplify Work</Text>
                </Animated.View>
            </View>
        );
    }
  
    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Background color for contrast
    },
    image: {
        width: 150, // Adjust width as needed
        height: 150, // Adjust height as needed
        marginBottom: 20, // Space between image and text
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    tagline: {
        fontSize: 16,
        color: 'white',
        fontStyle: 'italic',
    },
});
