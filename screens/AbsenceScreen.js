import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { 
  Container, Content, Button, Text, Grid, Col,
  Card, CardItem, Thumbnail, Left, Body, Right, Toast, Root
} from 'native-base';

// import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera } from "../components";

export default function AbsenceScreen() {
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [imgFace, setImgFace] = useState(null);

  const onCheckIn = async () => {
    const supportedMethods = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (supportedMethods.length === 0) {
      Toast.show({
        text: 'Device is not supported for face or fingerprint',
        buttonText: 'OK',
        duration: 5000
      });
    }else{
      const isEnrolled = await LocalAuthentication.authenticateAsync();
      if (isEnrolled.success) {
        verifyAbsence();        
      }
    }
  }

  const verifyAbsence = async () => {
    alert("This will hit web service to check the validity of absence");
    // const isCancelled = await LocalAuthentication.cancelAuthenticate();
    // alert(isCancelled);
  }

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

  if (!imgFace) {
    return <Camera setImgFace={setImgFace} />
  }else {
    return (
      <Root>
        
          <Container>
            <Content>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}} />
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
                        <Image source={{uri: imgFace}} style={{height: 200, width: 200, flex: 1}}/>
                      </Body>
                    </Right>
                  </CardItem>
              </Card>
              <Grid>
                <Col>
                  <Button full success><Text> Re-Take Location</Text></Button>
                </Col>
                <Col>
                  <Button 
                    full 
                    info
                    onPress={() => setImgFace(null)}
                    >
                      <Text> Re-Take Picture</Text>
                  </Button>
                </Col>
              </Grid>
              <Button 
                full 
                primary
                onPress={onCheckIn}
              >
                <Text> Check In </Text>
              </Button>
            </Content>
        </Container>
      </Root>
    );
  }
}