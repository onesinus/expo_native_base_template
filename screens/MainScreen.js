import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Content, 
  List, ListItem, Left, Body, Right, Thumbnail,
  Footer, FooterTab, Button, 
  Text
} 
from 'native-base';
import { customFetch } from '../helpers';

export default function MainScreen({
  navigation
}) {
  const [historyAttendance, setHistoryAttendance] = useState([]);

  useEffect(() => {
    async function getAttendance() {
      let resAttendances = await customFetch('internal', 'GET', 'attendance')
      if (resAttendances.success) {
        setHistoryAttendance(resAttendances.data);
      }
    }
    getAttendance();
  }, []);

  return (
    <Container>
        <Content>
          <List>
            {
              historyAttendance.map((data, idx) => (
                <ListItem avatar key={idx}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>{data && data.info && data.info.locationDetail ? data.info.locationDetail[0].street : 'No Location...'}</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              ))
            }
          </List>            
        </Content>
        <Footer>
          <FooterTab>
            <Button 
              full
              onPress={() => navigation.navigate('Absence')}
            >
              <Text>Attendance</Text>
            </Button>
            <Button 
                full
                onPress={() => navigation.navigate('Setting')}
            >
              <Text>Setting</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
  );
}
