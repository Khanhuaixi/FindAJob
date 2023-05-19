import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../../config";
import {
  ROLE_ADMIN,
  ROLE_APPLICANT,
  ROLE_EMPLOYER,
} from "../../../../constants/constants";
import { getEmployers } from "../../../api/employers";
import { getApplicants } from "../../../api/applicants";

function LoginScreen({ navigation }) {
  const [employers, setEmployers] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [employerExists, setEmployerExists] = React.useState(false);
  const [applicantExists, setApplicantExist] = React.useState(false);

  async function fetchEmployersData() {
    const response = await getEmployers();
    setEmployers(response);
  }

  async function fetchApplicantsData() {
    const response = await getApplicants();
    setApplicants(response);
  }

  useEffect(() => {
    fetchEmployersData();
    setEmployerExists(employers.some((employer) => employer.email == email));
    fetchApplicantsData();
    setApplicantExist(applicants.some((applicant) => applicant.email == email));
  }, [email]);

  const onSignupNavPress = () => {
    navigation.navigate("SignupScreen");
  };

  const onLoginPress = async () => {
    if (
      !applicantExists &&
      !employerExists &&
      email != "khanhuaixi@gmail.com"
    ) {
      alert("Account does not exist.");
      return;
    }

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
              alert("User does not exist.");
              return;
            }
            if (firestoreDocument.data().role === ROLE_APPLICANT) {
              navigation.reset({
                index: 0,
                routes: [{ name: "ApplicantTabBar" }],
              });
              return;
            } else if (firestoreDocument.data().role === ROLE_EMPLOYER) {
              navigation.reset({
                index: 0,
                routes: [{ name: "EmployerTabBar" }],
              });
              return;
            } else if (firestoreDocument.data().role === ROLE_ADMIN) {
              navigation.reset({
                index: 0,
                routes: [{ name: "AdminTabBar" }],
              });
              return;
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

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.layout}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require("../../../../assets/findajob.png")}
        />
        <Text style={styles.title}>Login</Text>
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
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
          autoCapitalize="none"
        />

        <Button
          style={styles.button}
          disabled={!email && !password}
          onPress={() => onLoginPress()}
        >
          Log in
        </Button>
        <Text style={styles.text}>
          Don't have an account?{" "}
          <Text onPress={onSignupNavPress} status="info">
            Sign up
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </Layout>
  );
}

export default LoginScreen;

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
