import { Stack } from "expo-router";
import React from 'react';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ title: 'Register' }} />
      <Stack.Screen name="adminlogin"  options={{ title: 'Login' 
      }}/>
      <Stack.Screen name="otp" options={{ headerShown: false }} />
      <Stack.Screen name="createpassword" options={{ headerShown: false }} />
      <Stack.Screen name="employee" options={{ title: 'Login', headerStyle:{
        backgroundColor:"white"
      } }} />
    </Stack>
  );
};

export default Layout;