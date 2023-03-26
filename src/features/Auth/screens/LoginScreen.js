import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../../firebaseConfig";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { LoginSVG } from "../images/login.svg";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = async () => {
    console.log("email is: " + email);
    console.log("password is: " + password);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const userprofile = firestoreDocument.data();
            if (email == "khanhuaixi@gmail.com") {
              navigation.navigate("AdminDashboard");
            } else {
              navigation.navigate("ApplicantHome", {
                userID: userprofile.id,
                userName: userprofile.fullName,
              });
            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center", height: 300, width: 300 }}>
            {/* <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          /> */}
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <InputField
            label={"Email ID"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            label={"Password"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <CustomButton label={"Login"} onPress={() => onLoginPress()} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={() => onFooterLinkPress()}>
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});

//admin
//email: khanhuaixi@gmail.com
//password: khanhuaixi123

//applicant
//email: seanleong@gmail.com
//password: seanleong123
