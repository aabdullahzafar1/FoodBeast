import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AppText from '../components/AppText';
import Screen from '../components/Screen'
import colors from '../config/colors';
import ListItemSeparator from "../components/lists/ListItemSeparator"
import ListItem from "../components/lists/ListItem"
import AppButton from '../components/AppButton';
import * as firebase from "firebase"
import 'firebase/firestore';
import AuthContext from '../Auth/context';




function OrderDetailScreen({route, navigation}) {
    const items = route.params;
    const authContext = useContext(AuthContext)

    const acceptOrder = async () => {
        await firebase.firestore().collection('orders').doc(items.id).update({accepted: true})
        navigation.goBack();
    }
    const rejectOrder = async () => {
        await firebase.firestore().collection('orders').doc(items.id).delete();
        navigation.goBack();
    }

    const dispatchOrder = async () => {
        await firebase.firestore().collection('orders').doc(items.id).update({dispatched: true})
        navigation.goBack();
    }

    return (

        <Screen>
            <View style = {styles.container}>
                <AppText style = {styles.titleheader}>{items.data.username}</AppText>
                <AppText>Contact Info: {items.data.number}</AppText>
                <AppText>Address: {items.data.address}</AppText>

            </View>
            <FlatList
                data={items.data.details}
                keyExtractor={(message) => message.id}
                renderItem={({ item }) => (
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <ListItem
                            title={item.data.title}
                            subTitle={item.data.price}
                            onPress={() => console.log("Message selected")}
                /></View>
                <View style = {{alignSelf: "center", padding: 20}}>
                    <AppText>{'Quantity = ' + item.data.count}</AppText>
                </View>
                </View>
                )}
                ItemSeparatorComponent={ListItemSeparator}
                
             />
             <View style ={styles.totalStyle}>
                <AppText style = {{fontWeight: "bold", color: colors.white}}>Total Bill: {items.data.total}</AppText>
             </View>
             {(authContext.userDetails.isRestaurant === true && items.data.accepted===false) && <View style ={{padding: 20}}>
                 <AppButton color = 'secondary' title ="Accept Order" onPress={()=>acceptOrder()}></AppButton>
                 <AppButton title ="Reject Order" onPress={() => rejectOrder()}></AppButton>
                 </View>}
             {(authContext.userDetails.isRestaurant === true && items.data.accepted===true &&  items.data.dispatched===false) && <View style ={{padding: 20}}>
                 <AppButton color = 'secondary' title ="Dispatch Order" onPress={()=>dispatchOrder()}></AppButton>
                 
                 </View>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.light,
        borderRadius: 25,
        marginHorizontal: 20
    },
    titleheader: {
        fontSize: 28,
        fontWeight: "500"
    },
    totalStyle: {
      flexDirection: "row-reverse",
      padding: 20,
      justifyContent:"center",
      backgroundColor: colors.primary
    }
})


export default OrderDetailScreen;