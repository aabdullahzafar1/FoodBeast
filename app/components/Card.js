import React, { useState } from "react";
import { View, StyleSheet, Image,TouchableWithoutFeedback } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'




import AppText from "./AppText";
import colors from "../config/colors";
import MapView, { Marker } from "react-native-maps";

function Card({ title, subTitle, image,isCheckIn, location, isImage, video, isVideo, feedImageStyle, feedStyle, isFeedPost=false, like, onLikePress, onPress, }) {
  const [mute,setMute]=useState(false)
  return (
    <View style={[styles.card, feedStyle]}>
      <View style ={{alignItems: "center",}}>
        {isCheckIn && 
        <MapView
            style ={{height:200, width:"95%"}}
            liteMode
            scrollEnabled={false}
            rotateEnabled ={false}
            region={{
              latitude: location ? location.latitude : 30.3753,
              longitude: location ? location.longitude : 69.3451,
              latitudeDelta:  location ? 0.01:4,
              longitudeDelta: location ? 0.01:4
          }}
        >
          
          <Marker
            pinColor = {colors.primary}
                style ={{borderColor: colors.secondary}}
                draggable ={false}
                coordinate = {location? location : {latitude: 1, longitude: 1}}
                title = "You"
             >
             </Marker>
          
          
          </MapView>}
      {isImage && 
      <TouchableWithoutFeedback onPress={onPress}>
        <Image progressiveRenderingEnabled resizeMethod="scale" resizeMode="contain" style={[styles.image]} source={{uri: image}} />
        </TouchableWithoutFeedback>}
        {isVideo&&
      <VideoPlayer
      height = {500}
      disableSlider
      showControlsOnLoad
      videoBackground= {colors.white}
      showFullscreenButton = {false}
      videoProps={{
        shouldPlay: false,
        resizeMode: "contain",
        source: {
          uri: image,
        },
      }}
      inFullscreen={false}
    />}
    </View>

      <View style={styles.detailsContainer}>
      <TouchableWithoutFeedback onPress = {onPress}>
        <AppText style={styles.title}>{title}</AppText>
        </TouchableWithoutFeedback>
        <AppText style={styles.subTitle}>{subTitle}</AppText>
        {(isFeedPost && !like) &&<MaterialCommunityIcons name = "heart" size = {25} onPress = {onLikePress}/>}
        {(isFeedPost && like ) && <MaterialCommunityIcons color = 'red' name = "heart" size = {25} onPress = {onLikePress}/>}
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    overflow: "hidden",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subTitle: {
    color: colors.medium,
    fontWeight: "100",
    fontStyle: "italic"
  },
  title: {
    marginBottom: 7,
    fontWeight: "500"
  },
});

export default Card;
