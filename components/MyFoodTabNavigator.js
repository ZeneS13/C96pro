import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MyFoodScreen from '../screens/MyFoodScreen';
import { Icon } from "react-native-elements";
import FoodRequestScreen from '../screens/FoodRequestScreen';

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text

export const MyFoodTabNavigator = createBottomTabNavigator({
    RequestFood: {
        screen: FoodRequestScreen,
        navigationOptions :{
          tabBarIcon : <Icon name="addfile" color = {C2} type ="ant-design" />,
          tabBarLabel : "Request Food",
        }
      },
    MyReceivedPetFood :{
        screen: MyFoodScreen,
        navigationOptions:{
        tabBarIcon : <Icon name="gift" color = {C2} type ="feather" />,
        tabBarLabel : "Recieved Pet Food"
        }
    }
});