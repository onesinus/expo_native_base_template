import React, { useState } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast, Root } from 'native-base';

const { BACKEND_URL } = require("../config/global_variables");

const superagent = require('superagent');

export default function Login({
    setToken
}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        superagent
            .post(`${BACKEND_URL}/auth/login`)
            .send({ username, password })
            .then(data => {
                if (!data.body.success) {
                    Toast.show({
                        text: data.body["err_msg"],
                        buttonText: 'OK',
                        duration: 5000
                    });
                }else{ // Success Logged in
                    setToken(data.body.token);
                }
            })
            .catch(err => {
                Toast.show({
                    text: err.message,
                    buttonText: 'OK',
                    duration: 5000
                });
            })
    }

    return (
        <Root>
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
        </Root>
    );
}