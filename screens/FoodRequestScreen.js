import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { SearchBar, ListItem, Input } from "react-native-elements";

import MyHeader from "../components/MyHeader";

export default class FoodRequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      Food: "",
      reasonToRequest: "",
      IsFoodRequestActive: "",
      requestedFood: "",
      status: "",
      requestId: "",
      userDocId: "",
      docId: "",
      quantity:''
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (Food, reasonToRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();

    db.collection("requested_Food").add({
      userId: userId,
      Food: Food,
      reasonToRequest: reasonToRequest,
      requestId: randomRequestId,
      status: "requested",
      date: firebase.firestore.FieldValue.serverTimestamp(),
      quantity:this.state.quantity,
      IUName:'',
      IUId:'',
      IUContact:'',
      IUAddress:''
    });

    await this.getFoodRequest();
    db.collection("users").where("email_id", "==", userId).get().then().then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            IsFoodRequestActive: true,
          });
        });
      });

    this.setState({
      Food: "",
      reasonToRequest: "",
      quantity:'',
      requestId: randomRequestId,
    });

    return Alert.alert("Request Added Successfully");
  };

  getIsFoodRequestActive() {
    db.collection("users").where("email_id", "==", this.state.userId).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsFoodRequestActive: doc.data().IsFoodRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }

  getFoodRequest = () => {
    // getting the requested Food
    db.collection("requested_Food").where("user_id", "==", this.state.userId).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().status !== "requested") {
            this.setState({
              requestId: doc.data().request_id,
              requestedFood: doc.data().Food,
              status: doc.data().status,
              docId: doc.id,
              quantity:doc.data().quantity
            });
          }
        });
      });
  };

  componentDidMount() {
    this.getFoodRequest();
    this.getIsFoodRequestActive();
  }

  updateFoodRequestStatus = () => {
    //updating the Pet status after receiving the Pet
    db.collection("requested_Food").doc(this.state.docId).update({
      status: "received",
    });

    //getting the  doc id to update the users doc
    db.collection("users").where("email_id", "==", this.state.userId).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          //updating the doc
          db.collection("users").doc(doc.id).update({
            IsFoodRequestActive: false,
          });
        });
      });
  };

  deleteRequest = () => {
    db.collection('requested_Food').id(docId).delete();
    Alert.alert('Your request is successfully deleted');
  }

  render() {
    if (this.state.IsFoodRequestActive === true) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor:C1}}>
          <View
            style={{
              flex: 0.1,
            }}
          >
            <MyHeader title="Food Status" navigation={this.props.navigation} />
          </View>
          <View style={styles.status}>
            <Text style={styles.title}> Type of Food</Text>
            <Text style={styles.description}>{this.state.requestedFood}</Text>
            <Text style={styles.title}>Status: </Text>
            <Text style={styles.description}>{this.state.status}</Text>
            <Text style={styles.title}>quantity: </Text>
            <Text style={styles.description}>{this.state.quantity}</Text>
          </View>
          <View
            style={styles.buttonView}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateFoodRequestStatus();
              }}
            >
              <Text style={styles.buttontxt}>Food Recived</Text>
            </TouchableOpacity>
            {this.state.status === 'requested' ?(<TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.deleteRequest();
              }}
            >
              <Text style={styles.buttontxt}>Delete Request</Text>
            </TouchableOpacity>) :null}
          </View>
        </ScrollView>
      );
    }else{
        return (
            <ScrollView style={{ flex: 1, backgroundColor:C1 }}>
            <View style={{ flex: 0.1 }}>
            <MyHeader title="Request Pet Food" navigation={this.props.navigation} />
            </View>
            <View style={{ flex: 0.9 }}>
                <KeyboardAvoidingView style={{ alignItems: "center" }}>
                <Input
                    style={styles.formTextInput}
                    label={"Food"}
                    labelStyle = {{color:C2}}
                    placeholder={"Food"}
                    containerStyle={{ marginTop: RFValue(60) }}
                    onChangeText={(text) => {
                    this.setState({
                        Food: text,
                    });
                    }}
                    value={this.state.Food}
                />
                <Input
                    style={styles.formTextInput}
                    containerStyle={{ marginTop: RFValue(30) }}
                    multiline
                    numberOfLines={8}
                    label={"Reason"}
                    labelStyle = {{color:C2}}
                    placeholder={"Why do you need the Food"}
                    onChangeText={(text) => {
                    this.setState({
                        reasonToRequest: text,
                    });
                    }}
                    value={this.state.reasonToRequest}
                />
                <Input
                    style={styles.formTextInput}
                    containerStyle={{ marginTop: RFValue(30) }}
                    multiline = {false}
                    label={"Quantity"}
                    labelStyle = {{color:C2}}
                    placeholder={"Quantity of the Food you Want"}
                    onChangeText={(text) => {
                    this.setState({
                        quantity: text,
                    });
                    }}
                    value={this.state.quantity}
                />
                <TouchableOpacity
                    style={[styles.button, { marginTop: RFValue(30) }]}
                    onPress={() => {
                    this.addRequest(
                        this.state.Food,
                        this.state.reasonToRequest
                    );
                    }}
                >
                    <Text
                    style={styles.requestbuttontxt}
                    >
                    Request
                    </Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
        );
    }
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
  ImquantityView:{
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
  },
  imquantityStyle:{
    height: RFValue(150),
    width: RFValue(150),
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: RFValue(10),
  },
  status:{
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
    marginTop:10
  },
});