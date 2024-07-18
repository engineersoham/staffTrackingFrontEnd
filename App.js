/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/blocks/LoginPage';
import HomePage from './src/blocks/HomePage';


const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <Stack.Navigator >
     <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{title: 'LoginPage', headerShown:false}}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{title: 'HomePage', headerShown:false}}
      />
      
    
    </Stack.Navigator>
  )
}

function App() {
 
  return (
    <NavigationContainer>
    <RootStack/>
  </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
