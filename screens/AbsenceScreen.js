import React, { useState, useEffect } from 'react';
import { Image, Alert } from 'react-native';
import { 
  Container, Content, Button, Text, Grid, Col,
  Card, CardItem, Thumbnail, Left, Body, Toast, Root
} from 'native-base';

import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera } from "../components";

import { formatDate, customFetch } from "../helpers";
import { screenHeight, screenWidth } from "../helpers/deviceInfo";

export default function AbsenceScreen({
  navigation,
  route
}) {
  const AttendanceOut = route.params ? route.params.AttendanceOut : undefined;

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

  useEffect(() => {
    if (location) {
      getDetailLocation({longitude: location.coords.longitude, latitude: location.coords.latitude});
    }
  }, [location]);

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
    }
  }

  const getDetailLocation = async(longlat) => {
    const detailLocation = await Location.reverseGeocodeAsync(longlat);
    setLocationDetail(detailLocation);
  }

  const onSubmit = async () => {
    if (!location || !locationDetail) {
      Toast.show({
        text: 'Your location is not defined, Please click re-take location to find your current location',
        buttonText: 'OK',
        duration: 5000
      });
    }else{
      const type_title = AttendanceOut ? 'Check Out' : 'Check In';
      Alert.alert(
        `Confirm ${type_title}`,
        'Are you sure your attendance data is correct?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: async() => {
            // const resTimeNow = await customFetch('-out-', 'GET', 'http://worldtimeapi.org/api/timezone/Asia/Jakarta')
            // if (resTimeNow) {              
              let sendData = { location, locationDetail, time, imgFace};
              let resPostAttendance;

              if (AttendanceOut){ sendData.type = 'out' };

              resPostAttendance = await customFetch('internal', 'POST', 'attendance', sendData);
              
              if (AttendanceOut && resPostAttendance.id) {
                resPostAttendance = await customFetch('internal', 'PUT', `attendance/${AttendanceOut}`, {AttendanceOut: resPostAttendance.id});
              }
              
              if (!resPostAttendance.success) {
                console.log(resPostAttendance);
                  Toast.show({
                      text: resPostAttendance["err_msg"],
                      buttonText: 'OK',
                      duration: 5000
                  });
              }else{ // Success do Attendance
                navigation.reset({
                  index: 0,
                  routes: [
                    { name: "Home" }
                  ]
                });
              }
            // }else{
            //   Toast.show({
            //       text: 'Failed fetch current time API',
            //       buttonText: 'OK',
            //       duration: 5000
            //   });
            // }
          }},
        ]
      );
    }
    /* Sementara wajib pake face / finger print dilepas dulu aja */
    // const supportedMethods = await LocalAuthentication.supportedAuthenticationTypesAsync();
    // if (supportedMethods.length === 0) {
    //   Toast.show({
    //     text: 'Device is not supported for face or fingerprint',
    //     buttonText: 'OK',
    //     duration: 5000
    //   });
    // }else{
    //   const isEnrolled = await LocalAuthentication.authenticateAsync();
    //   if (isEnrolled.success) {
    //     verifyAbsence();        
    //   }
    // }
    /* End face / finger print code */
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
                        !locationDetail && <><Text note>Getting Location...</Text></>
                      }
                      {
                        locationDetail && <Text note>{locationDetail[0].street}</Text>
                      }
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                    <Body>
                      <Image 
                        source={{uri: imgFace}} 
                        style={{
                          height: screenHeight/2, 
                          width: screenWidth - (screenWidth/12), 
                          flex: 1
                        }}
                      />
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
                onPress={onSubmit}
              >
                {
                  !AttendanceOut &&
                  <Text> Check In </Text>
                }
                {
                  AttendanceOut && 
                  <Text> Check Out </Text>
                }
              </Button>
            </Content>
        </Container>
      </Root>
    );
  }
}