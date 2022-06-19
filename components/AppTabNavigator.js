import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator';
import AddPetScreen from '../screens/AddPetScreen';
import { Icon } from "react-native-elements";
import { AdoptStackNavigator } from './AdoptStackNavigator'

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text

export const AppTabNavigator = createBottomTabNavigator({
  AdoptPets : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Icon name="gift" color = {C2} type ="feather" />,
      tabBarLabel : "Adopt Pets",
    }
  },
  AddPet: {
    screen: AddPetScreen,
    navigationOptions :{
      tabBarIcon : <Icon name="addfile" color = {C2} type ="ant-design" />,
      tabBarLabel : "Add Pets",
    }
  },
  ForAdoption:{
    screen: AdoptStackNavigator,
    navigationOptions :{
      tabBarIcon : <Icon name="pets" color = {C2} type ="materialicons" />,
      tabBarLabel : "For Adoption",
    }
  }
});