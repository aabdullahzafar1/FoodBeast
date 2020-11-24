import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons"

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ListingEditScreen from '../screens/ListingEditScreen';
import ListingsScreen from '../screens/ListingsScreen';
import AccountScreen from '../screens/AccountScreen';
import FeedScreen from '../screens/FeedScreen';
import FeedNavigator from './FeedNavigator';
import ListingNavigator from './ListingNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator initialRouteName="Feed" >
        <Tab.Screen 
        options={{
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons color={color} size={size} name = "silverware-fork-knife" />
        }}
        name = "Restaurants" component={ListingNavigator}/>
        <Tab.Screen
        options={{
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons color={color} size={size} name = "account-group" />
        }}
        name = "Feed" component={FeedNavigator}/>
        <Tab.Screen
        options={{
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons color={color} size={size} name = "account" />
        }}
        name = "Account" component={AccountNavigator}/>
    </Tab.Navigator>
)

export default AppNavigator;
