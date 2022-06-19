import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { SearchBar, ListItem, Input } from "react-native-elements";

import MyHeader from "../components/MyHeader";
//screen to add entry of pets for adoption
export default class AddPetScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      PetType: "",
      status: "For Adoption",
      gender:'',
      age:'',
      health:'',
      petName:''
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addPet = async () => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();

    db.collection("PetsToAdopt").add({
      userId: userId,
      PetName: this.state.petName,
      requestId: randomRequestId,
      status: "For Adoption",
      date: firebase.firestore.FieldValue.serverTimestamp(),
      age:this.state.age,
      gender:this.state.gender,
      health:this.state.health,
      petType:this.state.petType
    });

    this.setState({
      PetType: "",
      gender:'',
      age:'',
      requestId: randomRequestId,
      petName:'',
      health:''
    });

    return Alert.alert("Pet Added Successfully !!");
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor:C1 }}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Add Pet For Adoption" navigation={this.props.navigation} />
        </View>
        <View style={{ flex: 0.9 }}>
            <KeyboardAvoidingView style={{ alignItems: "center" }}>
              <Input
                style={styles.formTextInput}
                label={"Pet Type"}
                labelStyle = {{color:C2}}
                placeholder={"Pet Type"}
                containerStyle={{ marginTop: RFValue(30) }}
                onChangeText={(text) => {
                  this.setState({
                    PetType: text,
                  });
                }}
                value={this.state.PetType}
              />
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(30) }}
                label={"Name of the Pet"}
                labelStyle = {{color:C2}}
                placeholder={'Pet Name'}
                onChangeText={(text) => {
                  this.setState({
                    petName: text
                  });
                }}
                value={this.state.petName}
              />
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(30) }}
                label={"Age"}
                labelStyle = {{color:C2}}
                placeholder={"Age of the Pet"}
                onChangeText={(text) => {
                  this.setState({
                    age: text,
                  });
                }}
                value={this.state.age}
              />
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(30) }}
                labelStyle = {{color:C2}}
                label={"Gender"}
                placeholder={"Gender of the Pet"}
                onChangeText={(text) => {
                  this.setState({
                    gender: text,
                  });
                }}
                value={this.state.gender}
              />
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(30) }}
                multiline
                numberOfLines={8}
                labelStyle = {{color:C2}}
                label={"Health"}
                placeholder={"Health Condition of the Pet"}
                onChangeText={(text) => {
                  this.setState({
                    health: text,
                  });
                }}
                value={this.state.health}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: RFValue(30) }]}
                onPress={() => {
                  this.addRequest();
                }}
              >
                <Text style={styles.requestbuttontxt}>Add Pet</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "80%",
    height: RFValue(10),
    borderWidth: 1.5,
    borderColor: C2,
    borderRadius:20,
    fontSize: RFValue(12),
    paddingLeft: RFValue(10),
    color:C5
  },
  ImageView:{
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
  },
  imageStyle:{
    height: RFValue(150),
    width: RFValue(150),
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: RFValue(10),
  },
  Petstatus:{
    flex: 0.5,
    alignItems: "center",
  },
  title:{
    fontSize: RFValue(25),
    fontWeight: "500",
    fontWeight: "bold",
    marginLeft:20,
    color:C2,
    marginTop:20
  },
  description:{
    fontSize: RFValue(20),
    fontWeight: "bold",
    marginTop: 10,
    color:C5
  },
  buttonView:{
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontxt:{
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: C1,
  },
  touchableopacity:{
    alignItems: "center",
    backgroundColor: C3,
    padding: 10,
    width: "90%",
  },
  requestbuttontxt:{
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: C1,
  },
  button: {
    width: "45%",
    height: RFValue(45),
    justifyContent: "center",
    alignItems: "center",
    marginRight:5,
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
    marginTop:10
  },
  negetive: {
    width: "45%",
    height: RFValue(45),
    justifyContent: "center",
    alignItems: "center",
    marginRight:5,
    borderRadius: RFValue(50),
    backgroundColor: 'red',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:10
  },
});