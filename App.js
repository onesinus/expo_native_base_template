import React, { useState, useEffect } from 'react';
import { AbsenceScreen, SettingScreen, MainScreen, LoginScreen } from "./screens";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Spinner } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';


export default function App() {
  const [isReady, setIsReady] = useState(false);
  const Stack = createStackNavigator();

  const [token, setToken] = useState(undefined);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      });
      setIsReady(true);
    }

    function loadStorage() {
      AsyncStorage.getItem("token", (err, result) => {
        if (result) {
          setToken(result);
        }
      })
    }

    loadFont();
    loadStorage();
  }, []);

  useEffect(() => {
    if (token) {
      AsyncStorage.setItem("token", token);
    }else {
      AsyncStorage.removeItem("token");
    }
  }, [token])

  return (
    <>
      {
        !isReady && <Spinner style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} color='blue' />
      }
      {
        isReady && 
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#3F51B5'
              },
              headerTintColor: '#fff',
              headerShown: false
            }}
          >
            {
              !token && 
              <Stack.Screen
                name="Login" 
                component={(props) => <LoginScreen {...props} setToken={setToken}  />} 
                options={{
                  headerShown: true
                }}
              />
            }
            {
              token &&
              <>
                <Stack.Screen
                  name="Home" 
                  component={(props) => <MainScreen {...props} setToken={setToken}  />} 
                />
                <Stack.Screen
                  name="Absence" 
                  options={{
                    title: 'Attendance'
                  }}
                  
                  component={AbsenceScreen} 
                />
                <Stack.Screen
                  name="Setting" 
                  component={(props) => <SettingScreen {...props} setToken={setToken} />} 
                />
              </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
}
