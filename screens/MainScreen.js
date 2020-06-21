import React, { useState, useEffect } from 'react';
import { 
  List, ListItem, Left, Body, Right, Thumbnail,
  Text,
  Spinner,
  Button,
  View,
  Icon
} 
from 'native-base';
import { customFetch, formatDate } from '../helpers';
import { Drawer } from '../components';

import { Alert } from "react-native";

import { screenHeight, screenWidth } from "../helpers/deviceInfo";

export default function MainScreen({
  navigation,
  setToken
}) {
  const listBodyStyle = {
    minHeight: screenHeight / 12
  }

  const [historyAttendance, setHistoryAttendance] = useState(undefined);

  useEffect(() => {
    async function getAttendance() {
      let resAttendances = await customFetch('internal', 'GET', 'attendance/in')
      if (resAttendances.success) {
        setHistoryAttendance(resAttendances.data);
      }
    }
    setTimeout(() => {
      getAttendance();
    }, 1000);
  }, []);

  const checkOut = ({date, time, id}) => {
      Alert.alert(
        `${date} ${time}`,
        `Are you sure want to check-out this?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: async() => {
            navigation.navigate('Absence', {
              AttendanceOut: id
            })
          }},
        ]
      );    
  }

  const onClickList = (dataDetail) => {
    navigation.navigate('AbsenceDetail', {
      dataDetail: dataDetail
    });
  }

  return (
    <Drawer
      title="Home"
      setToken={setToken}
      navigation={navigation}
    >
      {
        !historyAttendance && <Spinner style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} color='blue' />
      }
      {
        historyAttendance && historyAttendance.length < 1 && <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: screenHeight / 3 }}><Text style={{ fontSize: 20 }}>Welcome to Online Attendance Apps</Text></View>
      }
      {
        historyAttendance && historyAttendance.length > 0 &&
        <List>
          {
            historyAttendance.map((data, _) => (
              <View key={data["_id"]}>
                {
                  data.AttendanceOut && 
                  <ListItem 
                    thumbnail
                    onPressOut={() => onClickList(data.AttendanceOut)}
                  >
                    <Left>
                      <Thumbnail source={{ uri: data.AttendanceOut.imgUrl ? data.AttendanceOut.imgUrl : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} />
                    </Left>
                    <Body style={listBodyStyle}>
                      <Text>{formatDate(data.AttendanceOut.time, 'date')}</Text>
                      <Text note>
                        {data && data.AttendanceOut.locationDetail[0] ? data.AttendanceOut.locationDetail[0].street : 'No Location...'}
                      </Text>
                    </Body>
                    <Right>
                      <Text note>{formatDate(data.AttendanceOut.time, 'time')}</Text>
                      <Text note>OUT</Text>
                    </Right>
                  </ListItem>                  
                }
                <ListItem 
                  avatar
                  onPressOut={() => onClickList(data)}
                >
                  <Left>
                    <Thumbnail source={{ uri: data.imgUrl ? data.imgUrl : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} />
                  </Left>
                  <Body style={listBodyStyle}>
                    <Text>{formatDate(data.time, 'date')}</Text>
                    <Text note>
                      {data && data.locationDetail[0] ? data.locationDetail[0].street : 'No Location...'}
                    </Text>
                  </Body>
                  <Right>
                    <Text note>{formatDate(data.time, 'time')}</Text>
                    {
                      data.AttendanceOut && <Text note>IN</Text>
                    }
                    {
                      !data.AttendanceOut && 
                      <Button 
                        small 
                        onPress={() => checkOut({
                          id: data["_id"],
                          date: formatDate(data.time, 'date'),
                          time: formatDate(data.time, 'time')
                        })}
                      >
                        <Icon name='md-exit' />
                      </Button>                    
                    }
                  </Right>
                </ListItem>
              </View>
            ))
          }
        </List>            
      }
    </Drawer>
  );
}
