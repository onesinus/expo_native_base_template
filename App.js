import React, { useState, useEffect } from 'react';
import { AbsenceScreen, SettingScreen, MainScreen, LoginScreen } from "./screens";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Spinner } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  const [isReady, setIsReady] = useState(false);
  const Stack = createStackNavigator();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      });
      setIsReady(true);
    }

    loadFont();
  }, []);


  return (
    <>
      {
        !isReady && <Spinner color='blue' />
      }
      {
        isReady && 
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#4000ff'
              },
              headerTintColor: '#fff'
            }}
          >
            <Stack.Screen
              name="Login" 
              component={LoginScreen} 
            />
            <Stack.Screen
              name="Online Presence" 
              component={MainScreen} 
            />
            <Stack.Screen
              name="Absence" 
              component={AbsenceScreen} 
            />

            <Stack.Screen
              name="Setting" 
              component={SettingScreen} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
}
