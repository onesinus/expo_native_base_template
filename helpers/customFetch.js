import { AsyncStorage, Alert } from 'react-native';

const superagent = require('superagent');
const { BACKEND_URL } = require("../config/global_variables");

export default async function customFetch(type, method, endpoint, sendData) {
    let resData;
    try {
        let token = await AsyncStorage.getItem("token");
        if (token) {
            let url = endpoint;
            if (type !== 'internal') {
                token = '';
            }else {
                url = `${BACKEND_URL}/${endpoint}`;
            }

            if (method === 'POST') {
                await superagent
                    .post(url)
                    .set('token', token)
                    .send(sendData)
                    .then(data => {
                        resData = data.body;
                    })
                    .catch(err => {
                        Alert.alert(err.message);
                    })
            } else if(method === 'GET') {
                await superagent
                    .get(url)
                    .set('token', token)
                    .then(data => {
                        resData = data.body;
                    })
                    .catch(err => {
                        Alert.alert(err.message);
                    })
            }else if (method === 'PUT') {
                await superagent
                    .put(url)
                    .set('token', token)
                    .send(sendData)
                    .then(data => {
                        resData = data.body;
                    })
                    .catch(err => {
                        Alert.alert(err.message);
                    })
            }else if (method === 'DELETE') {
                await superagent
                    .delete(url)
                    .set('token', token)
                    .send(sendData)
                    .then(data => {
                        resData = data.body;
                    })
                    .catch(err => {
                        Alert.alert(err.message);
                    })
            }
            return resData;
        }
        else{
            Alert.alert('Token is invalid');
        }   
    } catch (error) {
        console.log({error});
        Alert.alert(JSON.stringify(error));
    }
}