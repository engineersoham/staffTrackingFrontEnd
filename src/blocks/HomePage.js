import { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Alert, Linking } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const HomePage = ({navigation, route} ) => {
  // const {id} = route.params;
  console.log(route.params.roleId)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_ENDPOINT = `http://192.168.1.15:3000/api/user/${route.params.roleId}`;
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data?.user.userName)
  const goto = () => {
    Linking.canOpenURL(`tel:${1234567891}`)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Error", "Phone calls are not supported on this device");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => Alert.alert("Error", `An error occurred: ${err.message}`));
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',
      borderBottomLeftRadius:8,
      borderBottomRightRadius:8,
      borderWidth:1,
      padding:16,
      borderColor:"#CCCCCC",
      shadowColor:"yellow",
      width:"100%",
      height:90,
      
    }}>
      <View style={{}}>
        <Text style={{
          // fontFamily:'Montserrat', 
          fontSize:20,
          fontWeight:'500',
          color:"#000000",
          }}>Hello, {data?.user.userName}</Text>
        <Text style={{
          fontWeight:400, 
          fontSize:20,
          color:'#000000'
        }}>{data?.user.roles.name}</Text>
      </View>
      
      <View style={{flexDirection:'row', marginLeft:"40%", }}>
      <TouchableOpacity onPress={()=> {Alert.alert("Emergency Alert Send");}}>
      <Image
      source={require('./emergency.png')}
         // Replace with your app logo
        style={styles.logo}
      />
      </TouchableOpacity>
      <Pressable onPress={()=> {navigation.navigate("LoginPage")}}>
      <Image
        source={require('./SignOut.png')}
        // Replace with your app logo
        style={styles.logo}
      />
      </Pressable>
      </View>
      </View> 
      <View style={{flexDirection:'row',
      borderBottomLeftRadius:8,
      borderBottomRightRadius:8,
      borderWidth:1,
      paddingBottom:8,
      paddingTop:8,
      paddingRight:16,
      paddingLeft:16,
      borderRadius:8,
      borderColor:"#808080",
      shadowColor:"yellow",
      marginTop:30,
      height:90,
      
    }}>
      <View style={{}}>
        <Text style={{
          // fontFamily:'Montserrat', 
          fontSize:20,
          fontWeight:'500',
          color:"#000000",
          }}>{data?.user.manager.name}</Text>
        <Text style={{
          fontWeight:400, 
          fontSize:20,
          color:'#000000'
        }}>+91 {data?.user.manager.phoneNumber}</Text>
      </View>
      
      <View style={{ alignSelf:'center', marginLeft:'30%', 
      backgroundColor:'brown' , 
      borderRadius:20,
      
      }}>
      
      <TouchableOpacity onPress={goto}>
     
      <Text style={{color:'white', padding:8}}>Call Manager</Text>
      </TouchableOpacity>
      
      </View>
      </View> 
      
      
      <MapView
        style={{width:"100%", height:"68%", 
        borderWidth:20, 
        position:'absolute',
        top:"30%",
      }}
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
      >
        <Image
        source={require('./Site.png')}
        // Replace with your app log
        style={{width:100, height:100}}
      />
      
        </Marker>
       
        
      </MapView>
    
    </View>
    // <Text>Hi</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    
    backgroundColor: '#fff',
  },

  logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    margin:10

  },
  call:{
    
    width: 67,
    height: 28,
    resizeMode: 'contain',
    

  },
  manager:{
    
    width: 90,
    resizeMode: 'contain',
    marginTop:10,
    

  }
  
});

export default HomePage;
