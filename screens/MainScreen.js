import React, { useState, useEffect } from 'react';
import { 
  List, ListItem, Left, Body, Right, Thumbnail,
  Text,
  Spinner
} 
from 'native-base';
import { customFetch, formatDate } from '../helpers';
import { Drawer } from '../components';

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
              <ListItem avatar key={idx}>
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
                </Right>
              </ListItem>
            ))
          }
        </List>            
      }
    </Drawer>
  );
}
