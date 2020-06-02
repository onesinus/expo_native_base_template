import React from "react";
import { Text, Button } from "native-base";
import { Drawer } from "../components";

export default function SettingScreen({
    navigation,
    setToken
}) {
    return (
        <Drawer
            navigation={navigation}
            setToken={setToken}
        >
            <Text>Setting Page</Text>
        </Drawer>
    )
}