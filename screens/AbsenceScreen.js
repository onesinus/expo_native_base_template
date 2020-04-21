import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function AbsenceScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
        try {            
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        
            let currentLocation  = await Location.getCurrentPositionAsync({});
            // let currentAccuracy  = currentLocation ? currentLocation.coords.accuracy : null;
            // let previousAccuracy = location ? location.coords.accuracy : null;

            // console.warn(currentAccuracy , " ", previousAccuracy);

            // if (location === null || currentAccuracy < previousAccuracy ) {
                setLocation(currentLocation);                              
            // }
        } catch (error) {
            console.warn(error);
        }
    }

    getLocation();
    // let timeLeft = 10;
    // const intervalCheckLocation = setInterval(function(){
    //     if (timeLeft <= 1) {
    //         clearInterval(intervalCheckLocation);
    //     }else {
    //         getLocation();
    //         timeLeft -= 1;
    //     }
    // }, 1000);
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}