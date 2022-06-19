import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import MyPetsScreen from '../screens/MyPetsScreen';
import PetDoctorScreen from '../screens/PetDoctorScreen';
import {FoodTabNavigator} from './FoodTabNavigator';
import {Icon} from 'react-native-elements';
import { ShopStackNavigator } from './ShopStackNavigator';
import {MyFoodTabNavigator} from './MyFoodTabNavigator';

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text

export const AppDrawerNavigator = createDrawerNavigator({
  MyPets :{
    screen: MyPetsScreen,
    navigationOptions:{
      drawerIcon : <Icon name="pets" color = {C2} type ="materialicons" />,
      drawerLabel : "My Pets"
    }
  },
  AdoptPets : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" color = {C2} type ="fontawesome5" />,
      drawerLabel : "Adopt Pets"
    }
  },
  PetVets:{
    screen:PetDoctorScreen,
    navigationOptions:{
      drawerIcon : <Icon name="doctor" color = {C2} type ="fontisto" />,
      drawerLabel : "Pet Vets"
    }
  },
  PetFoodShops:{
    screen : ShopStackNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="shop" color = {C2} type ="entypo" />,
      drawerLabel : "Pet Food Shops"
    }
  },
  FoodRequests:{
    screen : FoodTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="food-apple" color = {C2} type ="materialcommunityicons" />,
      drawerLabel : "Food Requests"
    }
  },
  RequestFood: {
    screen: MyFoodTabNavigator,
    navigationOptions :{
      drawerBarIcon : <Icon name="addfile" color = {C2} type ="ant-design" />,
      drawerBarLabel : "Request Food",
    }
  },
  Notification : {
    screen : NotificationScreen,
    navigationOptions:{
      drawerIcon : <Icon name="bell" color = {C2} type ="font-awesome" />,
      drawerLabel : "My Notifications"
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions:{
      drawerIcon : <Icon name="settings" color = {C2} type ="fontawesome5" />,
      drawerLabel : "Settings"
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'MyPets'
  })