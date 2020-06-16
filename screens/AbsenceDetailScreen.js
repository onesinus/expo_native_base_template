import React from "react";
import {  Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

import { formatDate } from '../helpers';

export default function AbsenceDetailScreen({
    route
}) {
    const {dataDetail} = route.params;

    const { 
        locationDetail, timezone, utc_offset, abbreviation,
        client_ip, datetime
    } = dataDetail;

    return (
        <Container>
            <Content>
                <ListItem itemDivider>
                    <Text>Location</Text>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="md-locate" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{locationDetail[0].street}</Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="ios-bicycle" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{locationDetail[0].city}</Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="ios-car" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{locationDetail[0].region}</Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="ios-at" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{locationDetail[0].postalCode}</Text>
                    </Body>
                </ListItem>

                <ListItem itemDivider>
                    <Text>Date / Time</Text>
                </ListItem>
                {/* <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="bluetooth" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{timezone}</Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="bluetooth" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{`${utc_offset} (${abbreviation})`}</Text>
                    </Body>
                </ListItem> */}
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="ios-time" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{`${formatDate(datetime, 'date')} ${formatDate(datetime, 'time')}`}</Text>
                    </Body>
                </ListItem>


                <ListItem itemDivider>
                    <Text>Others</Text>
                </ListItem>
                {/* <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="bluetooth" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{client_ip}</Text>
                    </Body>
                </ListItem>
 */}
            </Content>
      </Container>
    );
}