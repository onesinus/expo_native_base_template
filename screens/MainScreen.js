import React from 'react';
import { 
  Container, 
  Content, 
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
            <Text>
              Here will be history of attendance
            </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button 
              full
              onPress={() => navigation.navigate('Absence')}
            >
              <Text>Absen</Text>
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
