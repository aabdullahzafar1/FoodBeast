import React from 'react';
import {createStackNavigator} from "@react-navigation/stack"
import AccountScreen from '../screens/AccountScreen';
import OrderNavigator from './OrderNavigator'
import MessagesScreen from '../screens/MessagesScreen';
import addMenuItem from '../screens/addMenuItem';
import editMenu from '../screens/editMenu';
import EditMenuNavigator from './EditMenuNavigator';
import UpdateAccountScreen from '../screens/UpdateAccountScreen';


const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Account" component={AccountScreen}/>
        <Stack.Screen name = "Orders" component={OrderNavigator}/>
        <Stack.Screen name = "Add Menu Item" component={addMenuItem}/>
        <Stack.Screen name = "Edit Menu" component={EditMenuNavigator}/>
        <Stack.Screen name = "Update Account" component={UpdateAccountScreen}/>
        <Stack.Screen name = "Messages" component={MessagesScreen}/>
    </Stack.Navigator>
)

export default AccountNavigator;