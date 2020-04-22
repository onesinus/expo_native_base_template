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
              This can be place for dashboard or menu
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
                onPress={() => navigation.navigate('History')}
            >
              <Text>History</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
  );
}