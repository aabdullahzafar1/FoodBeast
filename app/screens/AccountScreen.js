import React, { useContext, useState } from "react";
import { StyleSheet, View, FlatList, Modal } from "react-native";

import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import UpdateAccountScreen from "./UpdateAccountScreen";
import AppButton from "../components/AppButton";
import * as firebase from "firebase"
import 'firebase/firestore';
import authStorage from '../Auth/storage'
import AuthContext from "../Auth/context";


const menuItems = [

  {
    title: "Add Item to Menu",
    icon: {
      name: "food-fork-drink",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Add Menu Item"
  },
  {
    title: "Edit Menu",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Edit Menu"
  },
];
const userItems = [
  {
    title: "My Orders",
    icon: {
      name: "food-fork-drink",
      backgroundColor: colors.primary,
    },
    targetScreen: "Orders"
  },
 
 /* {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages"
  },*/

];

function AccountScreen({navigation}) {
  const [modalVisible, setModalVisible]=useState(false)
  const authContext = useContext(AuthContext)
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={authContext.userDetails.name}
          subTitle={authContext.userDetails.email}
          image={authContext.userDetails.image}
          settingIcon
          onSettingPress={()=>navigation.navigate("Update Account")}

        />
      </View>
      <View style={styles.container}>
        {authContext.userDetails.isRestaurant === true && <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress = {()=>navigation.navigate(item.targetScreen)}
            />
          )}
        />}
        <FlatList
          data={userItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress = {()=>navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=> {authStorage.removeToken();firebase.auth().signOut();authContext.setUserDetails(null)}}
      />
     
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
