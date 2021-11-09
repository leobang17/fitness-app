import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Route from './src/Route';

import { Login, Main } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  
  const pressHandler = () => {
    setIsSignedIn(true);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          headerShown : false
        }}
      >
        {
          isSignedIn ? (
              <Stack.Screen name = "Main" component = {Route} />
            )
            : (
              <Stack.Screen name = "Login" component = {Login} initialParams = {{pressHandler : pressHandler}} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}