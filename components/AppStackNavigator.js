import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AdoptPetScreen from '../screens/AdoptPetScreen';
import OwnerDetailsScreen  from '../screens/OwnerDetailsScreen';

export const AppStackNavigator = createStackNavigator({
  AdoptPetList : {
    screen : AdoptPetScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  OwnerDetails : {
    screen : OwnerDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'AdoptPetList'
  }
);