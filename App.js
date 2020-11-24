import React, { useEffect, useState } from "react";
import { View, Image, LogBox } from "react-native";
import * as firebase from "firebase"
import 'firebase/firestore';
import {WebView} from 'react-native-webview'
import {Video} from 'expo-av'

import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import Card from "./app/components/Card";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Screen from "./app/components/Screen"
import AppText from "./app/components/AppText"
import { ListItem, ListItemSeparator } from "./app/components/lists";
import styles from "./app/config/styles";
import AppReview from "./app/components/AppReview";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import ImageInput from "./app/components/ImageInput";
import FeedScreen from './app/screens/FeedScreen'
import WelcomeScreen from "./app/screens/WelcomeScreen";
import UserDetailScreen from "./app/screens/UserDetailScreen"
import AccountScreen from './app/screens/AccountScreen'

import { YellowBox } from 'react-native';
import OrdersScreen from "./app/screens/OrdersScreen";
import OrderDetailScreen from "./app/screens/OrderDetailScreen";
import ImageInputList from "./app/components/ImageInputList";
import AppPostedReviews from "./app/components/AppPostedReviews";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { AppForm, SubmitButton } from "./app/components/forms";
import FormImagePicker from "./app/components/forms/FormImagePicker";
import uuid from 'uuid'
import { set } from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";
import AuthContext from "./app/Auth/context";
import storage from "./app/Auth/storage";
import {AppLoading} from 'expo'
import MapScreen from "./app/screens/MapScreen";

LogBox.ignoreLogs(['Setting a timer'])

var firebaseConfig = {
  apiKey: "AIzaSyA893QImLDZFgNhnHwt8EyfOf0rqcIToag",
  authDomain: "foodbeast-340381.firebaseapp.com",
  databaseURL: "https://foodbeast-340381.firebaseio.com",
  projectId: "foodbeast-340381",
  storageBucket: "foodbeast-340381.appspot.com",
  messagingSenderId: "947968756348",
  appId: "1:947968756348:web:5663051b369f8a39ff17f9",
  measurementId: "G-BFS5WSKHHJ"
};
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}



export default function App() {
const [user,setUser]=useState()
const [userDetails,setUserDetails] = useState();
const [isReady,setIsReady]=useState(false)


firebase.auth().onAuthStateChanged(function(fUser) {
  if (fUser) {
    setUser(fUser)
  } else {
    setUser(null)
  }
});

const restoreToken = async () => {
  try {
    const u = await firebase.auth().currentUser
    setUser(u)
    const token = JSON.parse(await storage.getToken())
    if(!token) return
    setUserDetails(token)
    console.log(token)
    
  } catch (error) {
    console.log(error)
  }
}

const [imageUri,setImageUri]=useState()
const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
const data= {
  stars: 2.2,
  description: "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
  username: "Hamza Ahmed" 
}

const netInfo = useNetInfo()

   if(!isReady){ 
   return <AppLoading startAsync={restoreToken} onFinish={()=>setIsReady(true)} />
 }
  return  (
    <AuthContext.Provider value={{userDetails, setUserDetails}}>
    <NavigationContainer theme = {navigationTheme}>
      {userDetails ? <AppNavigator></AppNavigator> : <AuthNavigator></AuthNavigator>}
    </NavigationContainer>
    </AuthContext.Provider>
  );
 
// return (
//   <AuthContext.Provider value={{userDetails, setUserDetails}}>
// <MapScreen canDrag={true}></MapScreen>
// </AuthContext.Provider>)
    


  //     <View>
//     <View>
//     <AppForm
//         initialValues={{
//           images: []
//         }}
//         onSubmit={(values) =>{uploadImageAsync(values.images[0]); console.log(imageUri); forceUpdate()}}
//       >
//       <FormImagePicker name="images" />
//       <SubmitButton title="Post" />
//       </AppForm>
//       </View>
//       <View>
// <Image style={{height: 500, width: 500 }} source={{uri: imageUri}} ></Image>
//       </View>
//       </View>

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref().child(Math.random(1000,10000).toString())

  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();
  let imageref= await snapshot.ref.getDownloadURL();
  setImageUri(imageref)
  return await snapshot.ref.getDownloadURL();
}
 
  
}
