import { Button, Icon, Input, Layout, Text, Select, IndexPath, SelectItem} from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback, View ,} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../../config";
import { ROLE_APPLICANT } from "../../../../constants/constants";
import { ROLE_EMPLOYER } from "../../../../constants/constants";
import { createApplicant } from "../../../api/applicants";

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [applicationList, setApplicationList] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [skill, setSkill] = useState("");
  const [languages, setLanguage] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const [passwordSecureTextEntry, setPasswordSecureTextEntry] =
    React.useState(true);
  const [confirmPasswordSecureTextEntry, setConfirmPasswordSecureTextEntry] =
    React.useState(true);

    
  const onLoginNavPress = () => {
    navigation.navigate("LoginScreen");
  };


  const onRegisterPress = async () => {
    if(selectedIndex == 2){
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
            role: ROLE_EMPLOYER,
          };
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "EmployerTabBar" }],
              });
              navigation.navigate("EmployerTabBar");
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }else if (selectedIndex == 1){
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
    }   
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

  const data = [
    {
       "id": 1, 
       "name": "I am an Applicant",
    },
    {
       "id": 2, 
       "name": "I am an Employer",
    }
  ]

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
        <Select
        selectedIndex={selectedIndex}
        label = "Select Role"
        onSelect={index => setSelectedIndex(index)}
        value={data[selectedIndex.row]?.name}
        style={styles.input}
        >
        {data.map((item) => (
        <SelectItem title={item.name} key="{title}" />
        ))}
        </Select>

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

const styles1 = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
  }
});
