import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { getAllUsers } from "../api/users";

import Toast from "react-native-toast-message";
import { theme } from "../core/theme";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

export default function LogIn({ navigation }) {
  const [loadedUsers, setLoadedUsers] = useState([]);

  const [email, setEmail] = useState("bentley@mail.com");
  const [password, setPassword] = useState("password");
  const [userId, setUserId] = useState(0);

  useEffect(async () => {
    setLoadedUsers(await getAllUsers());
  }, []);

  return (
    <Background>
      <Logo />
      <Header>Login</Header>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        mode="contained"
        title="Submit"
        onPress={() => {
          for (let i = 0; i < loadedUsers.length; i++) {
            if (email == loadedUsers[i].email) {
              if (password == loadedUsers[i].password) {
                Toast.show({
                  type: "success",
                  text1: "Login Success",
                });
                useStore.setState({ StateUserId: loadedUsers[i].userId });
                if (loadedUsers[i].role == ROLE_USER) {
                  setUserId(loadedUsers[i].userId);

                  navigation.reset({
                    index: 0,
                    routes: [{ name: "TabNavigator" }],
                  });
                } else if (loadedUsers[i].role == ROLE_SUPERADMIN) {
                  //navigation.navigate("SuperHome");
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "SuperHome" }],
                  });
                } else {
                  //navigation.navigate("KitchenCrewHome")
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "TopTabNavigator" }],
                  });
                }
              } else {
                Toast.show({
                  type: "error",
                  text1: "Email or Password is wrong!",
                });
              }
            } else {
              Toast.show({
                type: "error",
                text1: "Email does not exist!",
              });
            }
          }
        }}
      >
        Login
      </Button>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "SignUp" }],
            });
          }}
        >
          <Text style={styles.link}>No account ? Sign Up !</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </Background>
  );
  /*
    return (
        <View>
          <Text>Open up App.js to start working1 on your app!</Text>
          <StatusBar />
        </View>
      );*/
}

const styles = StyleSheet.create({
  marg: {
    margin: 10,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
