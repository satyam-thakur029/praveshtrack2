import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter(); // Call router inside the component

  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: { url: "https://cdn.devdojo.com/images/september2021/3d-sponsorship.png" },
      heading: "Keep Up With Your Team's Attendance!!",
    },
    {
      image: { url: "https://paperplanetheme.com/wp-content/themes/paper-plane-landing/build/i/advantages-260.png" },
      heading: "Easily discover your team location ",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <LinearGradient
      colors={['#a7e7f7', '#b5f7c4','#a7e7f7']} 
      style={styles.gradient}
      locations={[0.1, 0.7,1]}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>{slides[currentIndex].heading}</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: slides[currentIndex].image.url }} style={styles.image} />
        </View>
        <View style={styles.dotContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentIndex(index)}
              style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}
          onPress={() => router.push("/(auth)/admin")}
          >Register Organization</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}
          onPress={() => router.push("/(auth)/employee")}
          >Employee Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};



  // return (
  //   <SafeAreaView style={styles.header}>
  //     <Text style={styles.title}>Welcome</Text>
  //     <Button 
  //       title="Register Organization" // Added title prop for the Button text
  //       onPress={() => router.push("/(auth)/admin")} 
  //     />
  //     <Button 
  //       title="Employee login" // Added title prop for the Button text
  //       onPress={() => router.push("/(auth)/employee")} 
  //     />
  //   </SafeAreaView>
  // );

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 20,
    marginLeft: 40,
    textAlign:"center",
    marginRight:45
  },
  imageContainer: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  registerButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
  },
});


