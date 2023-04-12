// import { StyleSheet, View } from "react-native";
// import { useState } from "react";
// import Toast from "react-native-toast-message";

// import { createNewUser } from "../api/users";
// import { ROLE_USER } from "../constants";
// import { TouchableOpacity } from "react-native";

// import Background from "../components/Background";
// import Logo from "../components/Logo";
// import Header from "../components/Header";
// import Button from "../components/Button";
// import TextInput from "../components/TextInput";
// import { theme } from "../core/theme";
// import { Layout, Text } from "@ui-kitten/components";

export default function SignUp({ navigation }) {
  // const [email, setEmail] = useState();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();
  // let role = ROLE_USER;

  // async function handleSubmit() {
  //   console.log("submit: ", email, firstName, lastName);
  //   await createNewUser(
  //     email,
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     password,
  //     role
  //   );
  // }

  // return (
  //   <Background>
  //     <Logo />
  //     <Header>Register</Header>
  //     <TextInput
  //       placeholder="Email"
  //       value={email}
  //       onChangeText={(value) => setEmail(value)}
  //     />
  //     <TextInput
  //       placeholder="First Name"
  //       value={firstName}
  //       onChangeText={(value) => setFirstName(value)}
  //     />
  //     <TextInput
  //       placeholder="Last Name"
  //       value={lastName}
  //       onChangeText={(value) => setLastName(value)}
  //     />
  //     <TextInput
  //       placeholder="Phone Number"
  //       value={phoneNumber}
  //       onChangeText={(value) => setPhoneNumber(value)}
  //     />
  //     <TextInput
  //       placeholder="Password"
  //       value={password}
  //       onChangeText={(value) => setPassword(value)}
  //     />
  //     <TextInput
  //       placeholder="Confirm Password"
  //       value={confirmPassword}
  //       onChangeText={(value) => setConfirmPassword(value)}
  //     />
  //     <Button
  //       mode="contained"
  //       title="Submit"
  //       onPress={() => {
  //         //console.log('TODO')
  //         handleSubmit();
  //       }}
  //     >
  //       Register
  //     </Button>
  //     <View style={styles.row}>
  //       <TouchableOpacity
  //         onPress={() => {
  //           navigation.reset({
  //             index: 0,
  //             routes: [{ name: "LogIn" }],
  //           });
  //         }}
  //       >
  //         <Text style={styles.link}>Log In instead</Text>
  //       </TouchableOpacity>
  //     </View>
  //     <Toast />
  //   </Background>
  // );

  return (
    <View>
      <Text>Sign Up</Text>
      {/* <StatusBar /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     marginTop: 4,
//   },
//   link: {
//     fontWeight: "bold",
//     color: theme.colors.primary,
//   },
// });
