import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
//screen showing the list of pets that are to be adopted. 
//The view button opens the OwnerDetailsScreen showing the details of the owner and the pet.
export default class AdoptPetScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      PetsList : []
    }
  this.requestRef= null
  }

  getRequestedPetsList =()=>{
    this.requestRef = db.collection("PetsToAdopt").where('Pet_status',"==",'For Adoption').where('userId','!=',this.state.userId).onSnapshot((snapshot)=>{
      var PetsList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        PetsList : PetsList
      });
    })
  }

  componentDidMount(){
    this.getRequestedPetsList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.PetType}
        subtitle={item.age}
        subtitleStyle = {{fontWeight:'bold', fontSize:15}}
        titleStyle={{ color: C2, fontWeight: 'bold', fontSize:20 }}
        containerStyle = {{backgroundColor:C4}}
        rightElement={
            <TouchableOpacity style={styles.button}
              onPress ={()=>{
                this.props.navigation.navigate("OwnerDetails",{"details": item})
              }}
              >
              <Text style={{color:C1}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor:C1}}>
        <MyHeader title="Adopt Pets" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.PetsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 30, color:C3, fontWeight:'bold'}}>List Of Pet for Adoption</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.PetsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:C1
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:C3,
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
});