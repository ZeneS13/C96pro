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
//show the information about the food that has been requested by the user
//opens from requested food screen
export default class RequestedFoodDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId          : firebase.auth().currentUser.email,
            userName        : "",
            RId:this.props.navigation.getParam('details')["userId"], //R = requester
            RName:'',
            RAddress:'',
            RContact:'',
            food:this.props.navigation.getParam('details')["Food"],
            reason:this.props.navigation.getParam('details')["reasonToRequest"],
            quantity:this.props.navigation.getParam('details')["quantity"],
            date:this.props.navigation.getParam('details')["date"],
            status:this.props.navigation.getParam('details')["status"],
            requestId : this.props.navigation.getParam('details')["requestId"],
            IUName:this.props.navigation.getParam('details')["IUName"],
            IUId:this.props.navigation.getParam('details')["IUId"],
            IUContact:this.props.navigation.getParam('details')["IUContact"],
            IUAddress:this.props.navigation.getParam('details')["IUAddress"]
        }
    }

    getRequesterInfo = () => {
        db.collection('users').where('email_id','==',this.state.userId).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    RName:doc.data().first_name + ' ' + doc.data().last_name,
                    RAddress: doc.data().address,
                    RNumber: doc.data().contact
                })
            })
        })
    }

    deleteRequest = () => {
        db.collection('requested_Food').where('requestId','==',this.state.requestId).get().then(document => {
            document.forEach(doc => {
                db.collection('requested_Food').id(doc.id).delete();
                db.collection("users").where("email_id", "==", userId).get().then().then((snapshot) => {
                    snapshot.forEach((doc) => {
                      db.collection("users").doc(doc.id).update({
                        IsFoodRequestActive: false,
                      });
                    });
                  });
                Alert.alert('Your Request has been successfully deleted');
            })
        })
    }

    updateStatus = (message) => {
        if(message === 'User Interested'){
            db.collection('users').where('email_id','==',this.state.userId).get().then(document => {
                document.forEach(doc => {
                    db.collection('requested_Food').where('requestId','==',this.state.requestId).set({
                        status:message,
                        //IU = Interested User
                        IUName:doc.data().first_name + ' ' + doc.data().last_name,
                        IUId:this.state.userId,
                        IUContact:doc.data().contact,
                        IUAddress:doc.data().address
                    })
                })
            })
        }else if(message === 'User Interested And Donation Accepted' ){
            db.collection('requested_Food').where('requestId','==',this.state.requestId).update({
                status:message
            })
        }else if(message === 'Donation Rejected'){
            //give notification to the interested user 
            db.collection('requested_Food').where('requestId','==',this.state.requestId).set({
                IUName:'',
                IUId:'',
                IUContact:'',
                IUAddress:'',
                status:'requested'
            })
        }else if(message === 'Donation Cancelled'){
            //send notification to the requester
            db.collection('requested_Food').where('requestId','==',this.state.requestId).set({
                IUName:'',
                IUId:'',
                IUContact:'',
                IUAddress:'',
                status:'requested'
            })
        }else if(message === 'Food Sent'){
            db.collection('requested_Food').where('requestId','==',this.state.requestId).update({
                status:message
            })
        }else if (message === 'recieved'){
            db.collection('requested_Food').where('requestId','==',this.state.requestId).update({
                status:message
            })
        } else {
            console.log(message);
        }
    }

    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color={C2}  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Request Details", style: { color: C4, fontSize:20,fontWeight:"bold", } }}
              backgroundColor = {C5}
              navigation={this.props.navigation} 
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"Request Information"}
                titleStyle= {{fontSize : 20, color:C2}}
                containerStyle = {{backgroundColor:C4}}
              >
              <Card containerStyle = {{backgroundColor:C5}} >
                <Text style={{fontWeight:'bold'}}>Food : {this.state.food}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Quantity : {this.state.quantity}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Reason To Request : {this.state.reason}</Text>
              </Card>
              <Card containerStyle = {{backgroundColor:C5}}>
                <Text style={{fontWeight:'bold'}}>Date of Request : {this.state.date}</Text>
              </Card>
            </Card>
            {this.state.userId === this.state.RId ? (
                this.state.userId === this.state.IUId && this.state.status === 'User Interested' ? null : (
                    <Card
                        title={"Interested User's Information"}
                        titleStyle= {{fontSize : 20, color:C2}}
                        containerStyle = {{backgroundColor:C4}}
                    >
                        <Card containerStyle = {{backgroundColor:C5}}>
                            <Text style={{fontWeight:'bold'}}>Name: {this.state.IUName}</Text>
                        </Card>
                        <Card containerStyle = {{backgroundColor:C5}}>
                            <Text style={{fontWeight:'bold'}}>Contact: {this.state.IUContact}</Text>
                        </Card>
                        <Card containerStyle = {{backgroundColor:C5}}>
                            <Text style={{fontWeight:'bold'}}>Address: {this.state.IUAddress}</Text>
                        </Card>
                        <Card containerStyle = {{backgroundColor:C5}}>
                            <Text style={{fontWeight:'bold'}}>E-mail: {this.state.IUId}</Text>
                        </Card>
                    </Card>
                )
            ) 
            : (
                <Card
                    title={"Requester's Information"}
                    titleStyle= {{fontSize : 20, color:C2}}
                    containerStyle = {{backgroundColor:C4}}
                >
                    <Card containerStyle = {{backgroundColor:C5}}>
                        <Text style={{fontWeight:'bold'}}>Name: {this.state.RName}</Text>
                    </Card>
                    <Card containerStyle = {{backgroundColor:C5}}>
                        <Text style={{fontWeight:'bold'}}>Contact: {this.state.RContact}</Text>
                    </Card>
                    <Card containerStyle = {{backgroundColor:C5}}>
                        <Text style={{fontWeight:'bold'}}>Address: {this.state.RAddress}</Text>
                    </Card>
                    <Card containerStyle = {{backgroundColor:C5}}>
                        <Text style={{fontWeight:'bold'}}>E-mail: {this.state.RId}</Text>
                    </Card>
                </Card>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.status === 'requested'
              ?(
                  this.state.userId === this.state.RId ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.deleteRequest();
                        }}>
                            <Text styles = {styles.buttontxt}>Delete Request</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.updateStatus('User Interested');
                        }}>
                            <Text styles = {styles.buttontxt}>I want to Donate Food</Text>
                    </TouchableOpacity>
                  )
              )
              : this.state.status === 'User Interested' ? (
                  this.state.userId === this.state.RId ? (
                    <View><TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.updateStatus('User Interested And Donation Accepted');
                        }}>
                        <Text styles = {styles.buttontxt}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.updateStatus('Donation Rejected');
                        }}>
                        <Text styles = {styles.buttontxt}>Reject</Text>
                    </TouchableOpacity></View>
                  ) : (
                      this.state.userId === this.state.IUId ? (
                        <View><TouchableOpacity
                            style={styles.button}
                            onPress={()=>{
                                this.updateStatus('Food Sent');
                            }}>
                            <Text styles = {styles.buttontxt}>Food Sent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{
                                this.updateStatus('Donation Cancelled');
                            }}>
                            <Text styles = {styles.buttontxt}>Cancel Donation</Text>
                        </TouchableOpacity>
                        </View>
                      ) : (
                        <Text style={{ fontSize: 20, fontWeight:'bold',color:C3, textAlign:'center'}}>Another User is Donating the Food.</Text>
                      )
                  )
              ) : this.state.status === 'Food Sent' ? (
                this.state.userId === this.state.RId ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.updateStatus('recieved');
                        }}>
                        <Text styles = {styles.buttontxt}>Food Recieved</Text>
                    </TouchableOpacity>
                ) : this.state.userId === this.state.IUId ? (
                    <Text style={{ fontSize: 20, fontWeight:'bold',color:C3, textAlign:'center'}}>Food is on its way to the Requester.</Text>
                ) : (
                    <Text style={{ fontSize: 20, fontWeight:'bold',color:C3, textAlign:'center'}}>Another User is Donating the Food.</Text>
                )
              ): this.state.status === 'recieved' ? (
                <Text style={{ fontSize: 20, fontWeight:'bold',color:C3, textAlign:'center'}}>The Food is already recieved.</Text>
              ):null
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