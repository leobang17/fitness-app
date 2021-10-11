import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { Login, Main } from './src/pages';

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
              <Stack.Screen name = "Main" component = {Main} />
            )
            : (
              <Stack.Screen name = "Login" component = {Login} initialParams = {{pressHandler : pressHandler}} />
          )
        }
      </Stack.Navigator>

    </NavigationContainer>
  );
}