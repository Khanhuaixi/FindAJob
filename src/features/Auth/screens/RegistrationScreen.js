import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../../firebaseConfig";
// import DatePicker from "react-native-date-picker";
import InputField from "../components/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import RegistrationSVG from "../images/registration.svg";
import CustomButton from "../components/CustomButton";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            if (email == "khanhuaixi@gmail.com") {
              navigation.navigate("AdminDashboard");
            } else {
              navigation.navigate("ApplicantHome", {
                userID: uid,
                userName: fullName,
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
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center", height: 300, width: 300 }}>
          {/* <RegistrationSVG
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
          Register
        </Text>

        <InputField
          label={"Full Name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          autoCapitalize="none"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

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
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        {/* <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={"date"}
          maximumDate={new Date("2005-01-01")}
          minimumDate={new Date("1980-01-01")}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
 */}
        <CustomButton
          label={"Register"}
          onPress={() => {
            onRegisterPress();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );

  // return (
  //   <View style={styles.container}>
  //     <KeyboardAwareScrollView
  //       style={{ flex: 1, width: "100%" }}
  //       keyboardShouldPersistTaps="always"
  //     >
  //       <Image
  //         style={styles.logo}
  //         source={require("../../../../assets/apu-logo2.png")}
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Full Name"
  //         placeholderTextColor="#aaaaaa"
  //         onChangeText={(text) => setFullName(text)}
  //         value={fullName}
  //         underlineColorAndroid="transparent"
  //         autoCapitalize="none"
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholder="E-mail"
  //         placeholderTextColor="#aaaaaa"
  //         onChangeText={(text) => setEmail(text)}
  //         value={email}
  //         underlineColorAndroid="transparent"
  //         autoCapitalize="none"
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholderTextColor="#aaaaaa"
  //         secureTextEntry
  //         placeholder="Password"
  //         onChangeText={(text) => setPassword(text)}
  //         value={password}
  //         underlineColorAndroid="transparent"
  //         autoCapitalize="none"
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholderTextColor="#aaaaaa"
  //         secureTextEntry
  //         placeholder="Confirm Password"
  //         onChangeText={(text) => setConfirmPassword(text)}
  //         value={confirmPassword}
  //         underlineColorAndroid="transparent"
  //         autoCapitalize="none"
  //       />
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={() => onRegisterPress()}
  //       >
  //         <Text style={styles.buttonTitle}>Create account</Text>
  //       </TouchableOpacity>
  //       <View style={styles.footerView}>
  //         <Text style={styles.footerText}>
  //           Already got an account?{" "}
  //           <Text onPress={onFooterLinkPress} style={styles.footerLink}>
  //             Log in
  //           </Text>
  //         </Text>
  //       </View>
  //     </KeyboardAwareScrollView>
  //   </View>
  // );
}

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
