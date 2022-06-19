import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import RequestedFoodDetailsScreen from './RequestedFoodDetailsScreen';

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text
//list of food that the user have sent/donated
export default class DonatedFoodScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      donatedFoodList : []
    }
  this.requestRef= null
  }

  getDonatedFoodList =()=>{
    this.requestRef = db.collection("requested_Food").where('IUId','==',this.state.userId).where("status", '==','received').onSnapshot((snapshot)=>{
      var donatedFoodList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        donatedFoodList : donatedFoodList
      });
    })
  }

  componentDidMount(){
    this.getDonatedFoodList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    //console.log(item.Pet_name);
    return (
      <ListItem
        key={i}
        title={item.Food}
        subtitle={item.quantity}
        subtitleStyle = {{fontWeight:'bold', fontSize:15}}
        titleStyle={{ color: C2, fontWeight: 'bold', fontSize:20 }}
        containerStyle = {{backgroundColor:C4}}
        bottomDivider
        rightElement={
          <TouchableOpacity style={styles.button}
            onPress ={()=>{
              this.props.navigation.navigate(RequestedFoodDetailsScreen,{"details": item})
            }}
            >
            <Text style={{color:C1}}>View</Text>
          </TouchableOpacity>
        }
      />
    )
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor:C1}}>
        <MyHeader title="My Donated Pet Food" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.donatedFoodList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 30, fontWeight:'bold',color:C3, textAlign:'center'}}>List Of All Received Pet Food Requests</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.donatedFoodList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
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
})