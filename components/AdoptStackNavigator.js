import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MyPetsForAdoption from '../screens/MyPetsForAdoption';
import MyPetDetailsScreen from '../screens/MyPetDetailsScreen';

export const AdoptStackNavigator = createStackNavigator({
  MyPetsForAdoption : {
    screen : MyPetsForAdoption,
    navigationOptions:{
      headerShown : false
    }
  },
  MyPetDetails : {
    screen : MyPetDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'MyPetsForAdoption'
  }
);