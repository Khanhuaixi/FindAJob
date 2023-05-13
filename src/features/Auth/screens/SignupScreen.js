import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../../config";
import { ROLE_APPLICANT } from "../../../../constants/constants";
import { createApplicant } from "../../../api/applicants";

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordSecureTextEntry, setPasswordSecureTextEntry] =
    React.useState(true);
  const [confirmPasswordSecureTextEntry, setConfirmPasswordSecureTextEntry] =
    React.useState(true);

  const onLoginNavPress = () => {
    navigation.navigate("LoginScreen");
  };

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    await createApplicant(
      firstName,
      lastName,
      email,
      contactNumber,
      applicationList,
      expectedSalary,
      experience,
      education,
      skill,
      languages,
      age,
      address
    );

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          role: ROLE_APPLICANT,
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

  const togglePasswordSecureEntry = () => {
    setPasswordSecureTextEntry(!passwordSecureTextEntry);
  };

  const toggleConfirmPasswordSecureEntry = () => {
    setConfirmPasswordSecureTextEntry(!confirmPasswordSecureTextEntry);
  };

  const renderIconPassword = (props) => (
    <TouchableWithoutFeedback onPress={togglePasswordSecureEntry}>
      <Icon {...props} name={passwordSecureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderIconConfirmPassword = (props) => (
    <TouchableWithoutFeedback onPress={toggleConfirmPasswordSecureEntry}>
      <Icon
        {...props}
        name={confirmPasswordSecureTextEntry ? "eye-off" : "eye"}
      />
    </TouchableWithoutFeedback>
  );

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
          value={firstName}
          label="First Name"
          placeholder="Enter your first name"
          onChangeText={(nextValue) => setFirstName(nextValue)}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          value={lastName}
          label="Last Name"
          placeholder="Enter your last name"
          onChangeText={(nextValue) => setLastName(nextValue)}
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
          accessoryRight={renderIconPassword}
          secureTextEntry={passwordSecureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          value={confirmPassword}
          label="Confirm Password"
          placeholder="Please confirm your password"
          accessoryRight={renderIconConfirmPassword}
          secureTextEntry={confirmPasswordSecureTextEntry}
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
