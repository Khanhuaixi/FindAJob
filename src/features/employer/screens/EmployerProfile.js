import { Button, Input, Layout, Text, Modal, Card } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { firebase } from "../../../../config";
import { useIsFocused } from "@react-navigation/native";
import { getApplicants, updateApplicant } from "../../../api/applicants";


function EmployerProfile({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldFirstName, setOldFirstName] = useState("");
  const [oldLastName, setOldLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [applicationList, setApplicationList] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [skill, setSkill] = useState("");
  const [languages, setLanguages] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState(""); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newCompanyName, setNewCompanyNameValue] = React.useState("");
  const [newCompanyType, setNewCompanyTypeValue] = React.useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
  const [applicants, setApplicants] = useState([]);
  const [applicant, setApplicant] = useState([])


  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  const userRef = db.collection("users").doc(userId);

  async function fetchData() {
    const response = await getApplicants();
    setApplicants(response);
  }

  async function handleUpdateApplicant() {
    await updateApplicant(     
      applicant.applicantId,
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
    ).then(() => {
      applicant.firstName = firstName;
      applicant.lastName = lastName;
    });
  }

  useEffect(() => {
    fetchData();
  
    const findApplicantByEmail = async () => {
      const applicant = applicants.find((applicant) => applicant.email === email);
      if (applicant) {
        setApplicant(applicant)
        if (applicant !== "undefined") {
          setFirstName(applicant.firstName);
          setLastName(applicant.lastName);
          setOldFirstName(applicant.firstName);
          setOldLastName(applicant.lastName);
        }
      } else {
      }
    };
    
    findApplicantByEmail();
  }, [isFocused]);


  function handleCancel() {
    // clearInputs();
    setCreateModalVisible(false);
  }

  function clearInputs() {
    setNewCompanyNameValue("");
    setNewCompanyTypeValue("");
    setIsDisabled(true);
  }


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
        } else {
          console.log("Error", "User not found.");
        }
      });
    };
    fetchUser();
  }, []);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h5">Employer Profile</Text>
      <Input style={styles.input} value={email} label="Email" disabled />

      <Input
        style={styles.input}
        value={firstName}
        label="First Name"
        placeholder={firstName}
        onChangeText={(nextValue) => setFirstName(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={lastName}
        label="Last Name"
        placeholder={lastName}
        onChangeText={(nextValue) => setLastName(nextValue)}
        autoCapitalize="none"
      />

      <Button
        style={styles.button}
        disabled={oldFirstName === firstName && oldLastName === lastName}
        onPress={() => handleUpdateApplicant()}
      >
        Save
      </Button>

      <Modal
        style={styles.modal}
        visible={isCreateModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => handleCancel()}
      >
        <Card disabled={true}>
          <ScrollView>
          <Input
              style={styles.input}
              value={newCompanyName}
              label="Company Name"
              placeholder="Company Name"
              onChangeText={(nextValue) => setNewCompanyNameValue(nextValue)}
            />
            <Input
              style={styles.input}
              value={newCompanyType}
              label="Company Type"
              placeholder="Company Type"
              onChangeText={(nextValue) => setNewCompanyTypeValue(nextValue)}
            />
            <View flexDirection="row" columnGap="5" alignSelf="flex-end">
              <Button status="basic" onPress={() => handleCancel()}>
                CANCEL
              </Button>
              <Button
                status="primary"
                onPress={() => handleCreateCompany()}
                disabled={isDisabled}
              >
                SAVE
              </Button>
            </View>
          </ScrollView>
        </Card>
      </Modal>

      <Button style={styles.button} onPress={() => setCreateModalVisible(true)}>
        Add New Company
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

export default EmployerProfile;

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
