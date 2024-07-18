import React, {useState, useEffect} from "react";

import { View,Text, StyleSheet, PermissionsAndroid, Button } from "react-native";
import MapView, {Marker} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
const LandingPage = ({navigation}) => {
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        requestLocationPermission();
        Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            error => setErrorMsg(error.message),
            { enableHighAccuracy: false, timeout: 20000000, maximumAge: 1000 }
          );
      }, []);

    //   const requestLocationPermission = async () => {
    //     try {
    //       const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //       if (result === RESULTS.GRANTED) {
    //         // Permission granted, get current location
    //         getCurrentLocation();
    //       } else {
    //         setErrorMsg('Permission denied');
    //       }
    //     } catch (error) {
    //       setErrorMsg(error.message);
    //     }
    //   };
    
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Location Permission',
                'message': 'This app needs access to your location',
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
               
                
            } else {
              console.log("Location permission denied")
             
            }
          } catch (err) {
            console.warn(err)
           
          }
    }

    const getLocation = () => {
        const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
    }

    return (
//       
<View style={{flex:1}}>
      <MapView
        style={{flex:1}}
        initialRegion={{
          latitude: 12.971891,
          longitude: 77.641151,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 12.971891, longitude: 77.641151 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"white"
      },
      text: {
        fontSize: 18,
        marginBottom: 10,
        color:"black"
      },
      error: {
        fontSize: 18,
        color: 'red',
      },
    
  });

  export default LandingPage