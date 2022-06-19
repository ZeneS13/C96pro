import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';
import { RFValue } from "react-native-responsive-fontsize";

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text
//opens from the AdoptPets screen
//show the details of the pet and the owner
//allow the user to adopt a pet
export default class OwnerDetailsScreen extends Component{
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
      ownerName:'',
      ownerId:this.props.navigation.getParam('details')['userId'],
      ownerAddress:'',
      ownerNumber:'',
      docId:'',
      number:'',
      requestId:this.props.navigation.getParam('details')['requestId']
    }
  }



  getRecieverDetails(){
    db.collection('users').where('email_Id','==',this.state.ownerId).get().then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          ownerName:doc.data().first_name + ' ' + doc.data().last_name,
          ownerAddress: doc.data().address,
          ownerNumber: doc.data().contact
        })
      })
    });

    db.collection('PetsToAdopt').where('requestId','==',this.state.requestId).get().then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({docId:doc.id})
     })
  })}


  getUserDetails=(userId)=>{
    db.collection("users").where('email_id','==', userId).get().then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name,
          number: doc.data().contact
        })
      })
    })
  }

  adoptPets=()=>{
    db.collection('AdoptedPets').add({
      ownerId:this.state.ownerId,
      ownerName:this.state.ownerName,
      ownerContact:this.state.ownerNumber,
      ownerAddress: this.state.address,
      newOwnerId:this.state.userId,
      newOwnerName:this.state.userName,
      newOwnerAddress: this.state.newOwnerAddress,
      newOwnerContact:this.state.number,
      petName:this.state.PetName,
      petType:this.state.petType,
      gender:this.state.gender,
      age:this.state.age,
      health:this.state.health,
      status: 'Someone wants to adopt',
      requestId: this.state.requestId,
    });
    db.collection('PetsToAdopt').where('requestId','==',this.state.requestId).update({
      statue:'Someone wants to adopt'
    });
  }

  componentDidMount(){
    this.getRecieverDetails()
    this.getUserDetails(this.state.userId)
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
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Owner's Information"}
              titleStyle= {{fontSize : 20, color:C2}}
              containerStyle = {{backgroundColor:C4}}
              >
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.ownerName}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.ownerNumber}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.ownerAddress}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>E-mail: {this.state.ownerId}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.adoptPets();
                      this.props.navigation.navigate('MyPets');
                    }}>
                  <Text styles = {styles.buttontxt}>I want to Adopt</Text>
                </TouchableOpacity>
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