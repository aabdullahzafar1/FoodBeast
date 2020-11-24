import React, { useContext, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, ListItemSeparator } from '../components/lists';
import Screen from '../components/Screen';
import colors from "../config/colors"
import Card from "../components/Card"
import { StatusBar } from 'expo-status-bar';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthContext from '../Auth/context';
import * as firebase from "firebase"
import 'firebase/firestore';






function UserDetailScreen({route}) {
  const item = route.params
  const [friend,setFriend] = useState(false)
  const [like, setLike] = useState(false)
  const [listings,setListings] = useState()
  const [userProfile,setUserProfile] = useState(null)

  async function loaddata() {
    const postRef = await firebase.firestore().collection("posts").where("userDocId", "==",item.data.userDocId).get()
    setListings(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    const userRef = firebase.firestore().collection('users').doc(item.data.userDocId);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      setUserProfile({id: doc.id, data: doc.data()})
    }
  }
  
  useEffect(()=> {
      loaddata();
  
  },[])
  
  const authContext = useContext(AuthContext)
  

  const handleLike = () => {
    if(like === false){
      setLike(true)
    }
    else{
      setLike(false)
    }
  }

    return (
        <Screen style = {{backgroundColor: colors.light}}>
          {userProfile!==null && <ListItem
            image={userProfile.data.image}
            title={userProfile.data.name}
            subTitle = {userProfile.data.email}
            style = {{backgroundColor: colors.light, flexDirection: "row"}}
            imageStyle ={{borderColor: colors.primary,borderWidth: 5, height: 100, width: 100, borderRadius: 75}}
          ></ListItem>}
          {!friend && <MaterialCommunityIcons style = {{position: "absolute", top: 15, right: 30}} size= {25} color ={colors.primary} onPress={() => setFriend(true)}  name = "account-plus-outline"></MaterialCommunityIcons>}
          {friend && <MaterialCommunityIcons style = {{position: "absolute", top: 15, right: 30}} size= {25} color ={colors.secondary} onPress={() => setFriend(false)}  name = "account-check-outline"></MaterialCommunityIcons>}
          <View style={styles.separator} />
           <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <>

          <Card
            feedImageStyle = {styles.feedImageStyle}
            isVideo = {checkVideo(item.data.type)}
            isImage = {checkImage(item.data.type)}
            isCheckIn = {item.data.isCheckIn}
            location = {item.data.addressLocation}
            isFeedPost            
            title={item.data.name}
            subTitle={item.data.description}
            image={item.data.images}
            onPress = {()=> navigation.navigate("Profile", item.data)}
          /></>
        )}
      />

        </Screen>
    );
    function checkVideo (type) {
      var str = String(type)
      if(str.includes("video"))
      {
        return true
      }
      else return false
    }
    function checkImage (type) {
      var str = String(type)
      if(str.includes("image"))
      {
        return true
      }
      else return false
    }
    
  }


const styles = StyleSheet.create({ 
    feedStyle: {
        height: 600,
        borderRadius: 40,
        marginHorizontal: 20,
    },
    feedImageStyle: {
        aspectRatio: 1,
        alignSelf: "center",
        height: "70%",
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.primary,
        marginBottom: 5,
      },
    
})
export default UserDetailScreen;