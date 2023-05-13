import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { firebase } from "../../../../config";

function AdminProfile({ navigation }) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [oldName, setOldName] = useState("");
  const [fullName, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  const userRef = db.collection("users").doc(userId);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      });
  };

  const handleSubmit = () => {
    userRef
      .update({ fullName })
      .then(() => {
        setOldName(fullName);
        setSuccess("Profile updated successfully");
        setError(null);
        setTimeout(() => {
          // After 5 seconds set the show value to false
          setSuccess("");
        }, 5000);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(null);
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setUser(data);
          setEmail(data.email);
          setOldName(data.fullName);
          setName(data.fullName);
        } else {
          console.log("Error", "User not found.");
        }
      });
    };
    fetchUser();
  }, []);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h5">Admin Profile</Text>
      <Input style={styles.input} value={email} label="Email" disabled />

      <Input
        style={styles.input}
        value={fullName}
        label="Full Name"
        placeholder={fullName}
        onChangeText={(nextValue) => setName(nextValue)}
        autoCapitalize="none"
      />

      <Button
        style={styles.button}
        disabled={oldName === fullName}
        onPress={() => handleSubmit()}
      >
        Save
      </Button>

      <Button
        style={styles.button}
        disabled={!user}
        onPress={() => handleSignOut()}
      >
        Log Out
      </Button>
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
    </Layout>
  );
}

export default AdminProfile;

const styles = StyleSheet.create({
  input: {
    margin: 5,
  },
  button: {
    margin: 10,
  },
  text: {
    margin: 10,
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});
