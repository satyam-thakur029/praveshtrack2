import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import React from 'react';  


export default function RootLayout() {
  

  return (
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(usertabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        
      </Stack>
  );
}
