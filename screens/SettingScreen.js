import React from "react";
import { Text, Button } from "native-base";

export default function SettingScreen({
    setToken
}) {
    return (
        <Button 
            full 
            primary
            onPress={() => setToken(undefined)}
        >
            <Text>Logout</Text>
        </Button>
    )
}