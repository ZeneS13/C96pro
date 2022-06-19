import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import PetFoodShopScreen from '../screens/PetFoodShopScreen';
import ShopDetailsScreen from '../screens/ShopDetailsScreen';

export const ShopStackNavigator = createStackNavigator({
  ShopList : {
    screen : PetFoodShopScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  ShopDetails : {
    screen : ShopDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'ShopList'
  }
);