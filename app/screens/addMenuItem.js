import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as Location from 'expo-location'
import * as firebase from "firebase"
import 'firebase/firestore';


import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import AuthContext from "../Auth/context";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  images: Yup.array().max(3, "Image Limit Reached")
});



function addMenuItem() {
  const [imageUri,setImageUri]=useState()
  const authContext = useContext(AuthContext)

  async function uploadImageAsync(uri, values) {
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
    console.log(imageref)
    let databasevalues = {...values, images: imageref, time: firebase.firestore.FieldValue.serverTimestamp()}

    handleSubmit(databasevalues)
    return await snapshot.ref.getDownloadURL();
  }


  const handleSubmit = async (databasevalues) => {

      console.log(databasevalues.images)
      databasevalues.count = 0
      databasevalues.resId = authContext.userDetails.docId 
      // console.log(values.images, imageUri)
      firebase.firestore().collection('menuItems').add(databasevalues)

  }

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          description: "",
          images: []
        }}
        onSubmit={(values) => {uploadImageAsync(values.images[0], values);}}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default addMenuItem;
