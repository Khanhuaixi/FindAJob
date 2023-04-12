import React, { useState, useEffect, useRef } from "react";
import { firebase } from "../../../../config";
import { Layout, Text } from "@ui-kitten/components";

function AdminProfile({ navigation }) {
  const [user, setUser] = useState("");
  const [oldName, setOldName] = useState("");
  const [fullName, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // const db = firebase.firestore();
  // const userId = firebase.auth().currentUser.uid;
  // const userRef = db.collection("users").doc(userId);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">Admin Profile</Text>
    </Layout>
  );
}

export default AdminProfile;
