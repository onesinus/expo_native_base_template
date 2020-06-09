import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

const superagent      = require('superagent');
const { BACKEND_URL } = require("../config/global_variables");

export default function CameraComponent({
  setImgFace
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [cam, setCam] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = async (faceProps) => {
    if (cam && faceProps.faces.length > 0) { // Face Detected
      const photo = await cam.takePictureAsync();

       // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = photo.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs

      const formData = new FormData();
      formData.append('img_face', { uri: localUri, name: filename, type });

      const token = await AsyncStorage.getItem("token");

      try {        
        const uploaded_response = await fetch(`${BACKEND_URL}/attendance/upload_face`, {
          method: 'POST',
          headers: { token },
          body: formData
        });

        const image_url = await uploaded_response.json();
        setImgFace(`${BACKEND_URL}/${image_url}`);
      } catch (error) {
        console.warn(JSON.stringify(error));
      }      
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera 
        style={{ flex: 1 }} 
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 5000,
          tracking: true,
        }}
        ref={cam => {
          setCam(cam)
        }}
      >
        {/* <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View> */}
      </Camera>
    </View>
  );
}