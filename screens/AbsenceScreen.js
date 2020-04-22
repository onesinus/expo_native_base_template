import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { 
  Container, Content, Button, Text, Grid, Col,
  Card, CardItem, Thumbnail, Icon, Left, Body, Right
} from 'native-base';

// import * as Location from 'expo-location';

export default function AbsenceScreen() {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   const getLocation = async () => {
  //       try {            
  //           let { status } = await Location.requestPermissionsAsync();
  //           if (status !== 'granted') {
  //               setErrorMsg('Permission to access location was denied');
  //           }
        
  //           let currentLocation  = await Location.getCurrentPositionAsync({});
  //           // let currentAccuracy  = currentLocation ? currentLocation.coords.accuracy : null;
  //           // let previousAccuracy = location ? location.coords.accuracy : null;

  //           // console.warn(currentAccuracy , " ", previousAccuracy);

  //           // if (location === null || currentAccuracy < previousAccuracy ) {
  //               setLocation(currentLocation);                              
  //           // }
  //       } catch (error) {
  //           console.warn(error);
  //       }
  //   }

  //   getLocation();
  //   // let timeLeft = 10;
  //   // const intervalCheckLocation = setInterval(function(){
  //   //     if (timeLeft <= 1) {
  //   //         clearInterval(intervalCheckLocation);
  //   //     }else {
  //   //         getLocation();
  //   //         timeLeft -= 1;
  //   //     }
  //   // }, 1000);
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: ''}} />
                <Body>
                  <Text>Onesinus Saut Parulian</Text>
                  <Text note>22 April 2020 17:59</Text>
                  <Text note>Rusun Griya Tipar Cakung</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Right>
                  <Body>
                    <Image source={{uri: ''}} style={{height: 200, width: 200, flex: 1}}/>
                  </Body>
                </Right>
              </CardItem>
          </Card>
          <Grid>
            <Col>
              <Button full success><Text> Re-Take Location</Text></Button>
            </Col>
            <Col>
              <Button full info><Text> Re-Take Picture</Text></Button>
            </Col>
          </Grid>
          <Button full primary><Text> Check In </Text></Button>
        </Content>
    </Container>
  );
}