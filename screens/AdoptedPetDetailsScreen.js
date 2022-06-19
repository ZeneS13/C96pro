import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';
import { RFValue } from "react-native-responsive-fontsize";
import { Alert } from 'react-native';

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text
//show the details of the pet that i have adopted
//aloow user to specify if the pet is recieved or not OR cancel the request.
export default class AdoptedPetDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      userName        : "",
      status       : this.props.navigation.getParam('details')["status"],
      PetName        : this.props.navigation.getParam('details')["PetName"],
      PetType : this.props.navigation.getParam('details')['PetType'],
      Age: this.props.navigation.getParam('details')['age'],
      health:this.props.navigation.getParam('details')['health'],
      gender:this.props.navigation.getParam('details')['gender'],
      docId:'',
      requestId:this.props.navigation.getParam('details')['requestId'],
      Oname:this.props.navigation.getParam('details')['ownerName'],
      Oid:this.props.navigation.getParam('details')['ownerId'],
      Oaddress:this.props.navigation.getParam('details')['ownerAddress'],
      Ocontact:this.props.navigation.getParam('details')['ownerContact'],
    }
  }

  petRecieved = () => {
    db.collection('PetsToAdopt').where('requestId','==',this.state.requestId).update({
        status:'Adopted and Recieved'
      });
      db.collection('AdoptedPets').where('requestId','==',this.state.requestId).update({
        status:'Adopted and Recieved'
      });
  }

  cancelAdoption = () => {
    db.collection('PetsToAdopt').where('requestId','==',this.state.requestId).update({
      status:'For Adoption'
    });
    db.collection('AdoptedPets').where('requestId','==',this.state.requestId).delete();
  }

    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color={C2}  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Pet Details", style: { color: C4, fontSize:20,fontWeight:"bold", } }}
              backgroundColor = {C5}
              navigation={this.props.navigation} 
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"Pet Information"}
                titleStyle= {{fontSize : 20, color:C2}}
                containerStyle = {{backgroundColor:C4}}
              >
              <Card containerStyle = {{backgroundColor:C5}} >
                <Text style={{fontWeight:'bold'}}>Name : {this.state.PetName}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Type of Pet : {this.state.PetType}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Age of Pet : {this.state.age}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Gender of Pet : {this.state.gender}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Pet's Health Statue : {this.state.health}</Text>
              </Card>
            </Card>
            <Card
              title={"Previous Owner's Information"}
              titleStyle= {{fontSize : 20, color:C2}}
              containerStyle = {{backgroundColor:C4}}
              >
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.Oname}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.Ocontact}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.Oaddress}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>E-mail: {this.state.Oid}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.status === 'Adopted, On its way.'
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      petRecieved();
                    }}>
                  <Text styles = {styles.buttontxt}>Pet Recieved</Text>
                </TouchableOpacity>
              )
              : this.state.status === 'Adopted, but not Recieved' ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      cancelAdoption();
                    }}>
                  <Text styles = {styles.buttontxt}>Cancel Adoption</Text>
                </TouchableOpacity>
              ) : null
            }
          </View>
        </View>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:C1
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: C3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttontxt:{
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: C1,
  },
})