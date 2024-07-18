import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Logo from './Logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';




const LoginPage = ( {navigation} ) => {

  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [phoneNumber, setphoneNumber] = useState(0);
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let phonepin= f1+f2+f3+f4;

// console.log(phoneNumber, phonepin)
  const API_ENDPOINT = "http://192.168.1.15:3000/api/auth/login"

  const sendOTP = async () => {
    console.log("entered")
    if (!phoneNumber) {
      Alert.alert('Error', 'Pleaseee enter a valid phone number and 4-digit PIN');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the server expects JSON
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber, // Adjust the key as per your API requirements
          pin: phonepin,
        }),
      });
      const data = await response.json();
      if(data) {
        if(data.error){
          setError(!error)
          // console.log(data, "ed")
        } else {
          setError(false)
          navigation.navigate('HomePage', {
            roleId:data.tokenUser.roleId
          })
          // console.log(data, "nd")
        }
      }
    } 
    catch (error) {
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };
 
  return (
    <View style={styles.container}>
      <Image
        source={Logo} 
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.appName}>RETISS</Text>
        <Text style={styles.tagLine}>Stay Connected, Track Your Team in Real Time!</Text>
      </View>

      <TextInput
        style={{borderWidth:1, borderRadius:8, 
        width:"100%",
        marginTop:20,
        height:"10%",
        marginBottom:30,
        color:'black'
        }}
      
        // value={phoneNumber}
        onChangeText={(phn)=>{
          setphoneNumber(phn)
        }}
        placeholder="Enter your mobile number"
        placeholderTextColor={'black'}
        keyboardType="phone-pad"
      />
      
      <Text style={{fontFamily:'OpenSans', 
      alignSelf:'flex-start',
      color:'#505050',
      fontWeight:'600',
      fontSize:16, 
      marginBottom:10
      }}>Enter your 4 Digit PIN</Text>
      
      <View style={styles.otpContainer}>
        <TextInput 
        maxLength={1}
        secureTextEntry={!isPasswordVisible}
        value={f1}
        ref={et1} 
        style={[styles.inputView, {borderColor:f1.length >=1 ? 'blue' : 'black'}]}
        keyboardType='number-pad' 
        onChangeText={txt=>{
          setF1(txt)
          if(txt.length>=1) {
            et2.current.focus();
          } else if (txt.length <= 1) {
            et1.current.focus()
          }
        }}
        />
        <TextInput 
        maxLength={1}
        value={f2}
        secureTextEntry={!isPasswordVisible}
        ref={et2} 
        style={[styles.inputView, {borderColor:f2.length >=1 ? 'blue' : 'black'}]}
        keyboardType='number-pad' 
        onChangeText={txt=>{
          setF2(txt)
          if(txt.length>=1) {
            et3.current.focus();
          } else if (txt.length <= 1) {
            et1.current.focus()
          }
        }}
        />
        <TextInput 
        maxLength={1}
        secureTextEntry={!isPasswordVisible}
        value={f3}
        ref={et3} 
        style={[styles.inputView, {borderColor:f3.length >=1 ? 'blue' : 'black'}]}
        keyboardType='number-pad' 
        onChangeText={txt=>{
          setF3(txt)
          if(txt.length>=1) {
            et4.current.focus();
          } else if (txt.length <= 1) {
            et2.current.focus()
          }
        }}
        />
        <TextInput 
        maxLength={1}
        value={f4}
        ref={et4} 
        
        secureTextEntry={!isPasswordVisible}
        style={[styles.inputView, {borderColor:f4.length >=1 ? 'blue' : 'black'}]}
        keyboardType='number-pad' 
        onChangeText={txt=>{
          setF4(txt)
          if(txt.length>=1) {
            et4.current.focus()
          } else if (txt.length <= 1) {
            et3.current.focus()
          }
        }}
        />
       <TouchableOpacity
          // style={styles.iconContainer}
          onPress={() => setIsPasswordVisible((prev) => !prev)}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={38}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', marginHorizontal:'7%', marginTop:'3%' }}>
        {/* {error ?  null : <Text>Error</Text> } */}
        {error ? <Text 
        numberOfLines={3}
        style={styles.errorText}>You have entered wrong PIN.
Please try again!</Text> : null }
      {/* <TouchableOpacity onPress={handleForgotPin}> */}
        <Text style={styles.forgotPinText}>Forgot PIN?</Text>
      {/* </TouchableOpacity> */}
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={sendOTP}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    
    resizeMode: 'contain',

  },

  errorText:{
    marginRight:'50%',
    fontWeight:'600',
    fontSize:13,
    color:'#CB1424'
  },
  titleContainer: {
    width: '80%', // Adjust to your needs
    alignSelf: 'flex-start', // Ensure alignment to the left
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontFamily:'Montserrat',
    fontWeight: 'bold',
    textAlign: 'left', // Left alignment
    fontWeight:'700',
    color:'black'
  },
  inputView: {
    width: 58,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 10,
    textAlign:'center',
    fontSize:18,
    fontWeight:'700',
    marginHorizontal:20,
    color:'black'
  },
  tagLine: {
    fontSize: 12,
    color: '#3A3A3A',
    fontWeight:'500',
    textAlign: 'left', // Left alignment
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row', // Horizontal layout for OTP boxes
    alignItems: 'center',
  },
  otpInput: {
    width: 40, // Width for each OTP input box
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center', // Center text in the box
    marginRight: 10, // Space between OTP boxes
  },
  forgotPinText: {
    color: '#007BFF', // Clickable text
    fontWeight:'600',
    fontSize:13,

  },
  signInButton: {
    backgroundColor: '#338049',
    padding: 15,
    borderRadius: 32,
    height:65,
    width:'100%',
    marginTop: 20,
  },
  signInButtonText: {
    color: '#FFFFFF',
    alignSelf:'center',
    justifyContent:'center',
    fontSize:24,
    fontWeight:'700',
    fontWeight: 'bold',
  },
});
export default LoginPage;
