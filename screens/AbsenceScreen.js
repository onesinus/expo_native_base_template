import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { 
  Container, Content, Button, Text, Grid, Col,
  Card, CardItem, Thumbnail, Left, Body, Toast, Root,
  Spinner
} from 'native-base';

import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera } from "../components";

import { formatDate } from "../helpers";

export default function AbsenceScreen() {
  const [location, setLocation] = useState(null);
  const [locationDetail, setLocationDetail] = useState(null);
  const [imgFace, setImgFace] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    getLocation();
    setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
  }, []);

  const getLocation = async () => {
    setLocationDetail(null);
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        text: 'Permission to access location was denied',
        buttonText: 'OK',
        duration: 5000
      });        
    }else {
      let tempLocation  = await Location.getCurrentPositionAsync({});
      setLocation(tempLocation);     
      getDetailLocation({longitude: location.coords.longitude, latitude: location.coords.latitude})                         
    }
  }

  const getDetailLocation = async(longlat) => {
    const detailLocation = await Location.reverseGeocodeAsync(longlat);
    setLocationDetail(detailLocation);
  }

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
                      {/* <Text note>22 April 2020 17:59</Text> */}
                      <Text note>{formatDate(time)}</Text>
                      {
                        !locationDetail && <><Text note>Getting Location...</Text><Spinner color='blue' /></>
                      }
                      {
                        locationDetail && <Text note>{locationDetail[0].street}</Text>
                      }
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                    <Body>
                      <Image source={{uri: imgFace}} style={{height: 300, width: 325, flex: 1}}/>
                    </Body>
                  </CardItem>
              </Card>
              <Grid>
                <Col>
                  <Button 
                    full 
                    success
                    onPress={() => getLocation()}
                  >
                    <Text> Re-Take Location</Text>
                  </Button>
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