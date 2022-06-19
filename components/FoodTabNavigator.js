import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MyFoodScreen from '../screens/MyFoodScreen';
import { Icon } from "react-native-elements";
import RequestedFoodScreen from '../screens/RequestedFoodScreen';

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text

export const FoodTabNavigator = createBottomTabNavigator({
  RequestedFood : {
    screen: RequestedFoodScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="fastfood" color = {C2} type ="materialicons" />,
      tabBarLabel : "Requested Food",
    }
  },
  DonatedFood: {
    screen: DonateFoodScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="gift" color = {C2} type ="feather" />,
      tabBarLabel : "Donated Food",
    }
  }
});