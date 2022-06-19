import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MyPetsScreen from '../screens/MyPetsScreen';
import AdoptedPetDetailsScreen from '../screens/AdoptedPetDetailsScreen';

export const MyPetsStackNavigator = createStackNavigator({
  MyPets : {
    screen : MyPetsScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  AdoptedPetDetails : {
    screen : AdoptedPetDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'MyPets'
  }
);