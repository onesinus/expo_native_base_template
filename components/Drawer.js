import React, { useState } from "react"
import { 
  Drawer, Button,
  Left, Right,
  Container, Header, Title, Content, Footer, FooterTab, Body, Text, Icon
} from "native-base";

function SideBar({
  navigation,
  setToken,
  closeDrawer
}) {
  return (
    <Container>
      <Header> 
        <Body>
          <Title>Header Sidebar</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        {/* Disini bisa buat gambar */}
        {/* Dibawah gambar ada list menu */}
        {/* Dll dll */}

        <Button transparent onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                { name: "Home" }
              ]
            });
        }}>
          <Text>Home</Text>
        </Button>

        <Button transparent onPress={() => navigation.navigate("Absence")}>
          <Text>Add Attendance</Text>
        </Button>

        <Button transparent onPress={() => navigation.navigate("Setting")}>
          <Text>Settings</Text>
        </Button>


        <Button transparent onPress={() => setToken(null)}>
          <Text>Logout</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Online Attendance | 0.0.1 | 2020</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default function DrawerComponent(props) {
    const [drawer, setDrawer] = useState();

    const closeDrawer = () => {
        drawer._root.close();    
    }

    const openDrawer = () => {
        drawer._root.open();
    }

    return (
        <Drawer
            ref={(ref)  => setDrawer(ref)}
            content={
              <SideBar
                setToken={props.setToken}
                navigation={props.navigation}
                closeDrawer={closeDrawer}
              />
            }
            onClose={closeDrawer}
        >
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={openDrawer}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>{props.title}</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              {props.children}
            </Content>
          </Container>
        </Drawer>
    );
}