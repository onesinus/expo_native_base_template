import React from 'react';
import { 
  Container, 
  Content, 
  List, ListItem, Left, Body, Right, Thumbnail,
  Footer, FooterTab, Button, 
  Text
} 
from 'native-base';

export default function MainScreen({
  navigation
}) {
  return (
    <Container>
        <Content>
          <List>
            {
              Array.from({length: 15}).map((data, idx) => (
                <ListItem avatar key={idx}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
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
