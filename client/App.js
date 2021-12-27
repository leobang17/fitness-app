import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Route, Auth } from './src/Route';

import { AuthMain } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
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
              <Stack.Screen name = "Auth" component = {Auth} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}