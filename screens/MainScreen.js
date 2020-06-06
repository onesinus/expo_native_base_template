import React, { useState, useEffect } from 'react';
import { 
  List, ListItem, Left, Body, Right, Thumbnail,
  Text,
  Spinner,
  Button
} 
from 'native-base';
import { customFetch, formatDate } from '../helpers';
import { Drawer } from '../components';

import { Alert } from "react-native";

export default function MainScreen({
  navigation,
  setToken
}) {
  const [historyAttendance, setHistoryAttendance] = useState([]);

  useEffect(() => {
    async function getAttendance() {
      let resAttendances = await customFetch('internal', 'GET', 'attendance')
      if (resAttendances.success) {
        setHistoryAttendance(resAttendances.data);
      }
    }
    setTimeout(() => {
      getAttendance();
    }, 1000);
  }, []);

  const checkOut = ({date, time}) => {
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
            console.log("ok");
          }},
        ]
      );    
  }

  return (
    <Drawer
      title="Home"
      setToken={setToken}
      navigation={navigation}
    >
      {
        historyAttendance.length < 1 && <Spinner style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} color='blue' />
      }
      {
        historyAttendance.length > 0 &&
        <List>
          {
            historyAttendance.map((data, idx) => (
              <>
                <ListItem avatar key={data["_id"]}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} />
                  </Left>
                  <Body>
                    <Text>{formatDate(data.datetime, 'date')}</Text>
                    <Text note>
                      {data && data.locationDetail[0] ? data.locationDetail[0].street : 'No Location...'}
                    </Text>
                  </Body>
                  <Right>
                    <Text note>{formatDate(data.datetime, 'time')}</Text>
                    <Text note>IN</Text>
                    {
                      !data.AttendanceOut && 
                      <Button 
                        small 
                        bordered
                        onPress={() => checkOut({
                          id: data["_id"],
                          date: formatDate(data.datetime, 'date'),
                          time: formatDate(data.datetime, 'time')
                        })}
                      >
                        <Text>Out</Text>
                      </Button>                    
                    }
                  </Right>
                </ListItem>
                {
                  data.AttendanceOut && 
                  <ListItem avatar key={idx}>
                    <Left>
                      <Thumbnail source={{ uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} />
                    </Left>
                    <Body>
                      <Text>{formatDate(data.AttendanceOut.datetime, 'date')}</Text>
                      <Text note>
                        {data && data.AttendanceOut.locationDetail[0] ? data.AttendanceOut.locationDetail[0].street : 'No Location...'}
                      </Text>
                    </Body>
                    <Right>
                      <Text note>{formatDate(data.AttendanceOut.datetime, 'time')}</Text>
                      <Text note>OUT</Text>
                    </Right>
                  </ListItem>                  
                }
              </>
            ))
          }
        </List>            
      }
    </Drawer>
  );
}
