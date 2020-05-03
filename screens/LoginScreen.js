import React, { useState } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        
    }

    return (
        <Container>
            <Content>
                <Form>
                <Item stackedLabel last>
                    <Label>Username</Label>
                    <Input 
                        onChangeText={(value) => setUsername(value)} 
                    />
                </Item>
                <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input 
                        secureTextEntry={true} 
                        onChangeText={(value) => setPassword(value)}
                    />
                </Item>
                <Button 
                    full 
                    primary
                    style={{ marginTop: 10 }} 
                    onPress={login}
                >
                    <Text>Login</Text>
                </Button>
                </Form>
            </Content>
        </Container>
    );
}