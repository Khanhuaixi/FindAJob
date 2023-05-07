import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../../config";
import { ROLE_APPLICANT } from "../../../../constants/constants";

export default function SignupScreen({ navigation }) {
  const role = ROLE_APPLICANT;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onLoginNavPress = () => {
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
          role: role,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "AdminTabBar" }],
            });
            navigation.navigate("AdminTabBar");
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
    <Layout style={styles.layout}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require("../../../../assets/findajob.png")}
        />
        <Text style={styles.title}>Sign Up</Text>
        <Input
          style={styles.input}
          value={fullName}
          label="Full Name"
          placeholder="Enter your full name"
          onChangeText={(nextValue) => setFullName(nextValue)}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          value={email}
          label="Email"
          placeholder="Enter your email"
          onChangeText={(nextValue) => setEmail(nextValue)}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          value={password}
          label="Password"
          placeholder="Enter your password"
          onChangeText={(nextValue) => setPassword(nextValue)}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          value={confirmPassword}
          label="Confirm Password"
          placeholder="Please confirm your password"
          onChangeText={(nextValue) => setConfirmPassword(nextValue)}
          autoCapitalize="none"
        />

        <Button
          style={styles.button}
          disabled={!email && !password && !confirmPassword}
          onPress={() => onRegisterPress()}
        >
          Create account
        </Button>
        <Text style={styles.text}>
          Already got an account?{" "}
          <Text onPress={onLoginNavPress} status="info">
            Log in
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8F9BB3",
  },
  logo: {
    alignSelf: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  layout: {
    flex: 1,
  },
  input: {
    margin: 5,
  },
  button: {
    margin: 10,
  },
  text: {
    margin: 10,
  },
});
