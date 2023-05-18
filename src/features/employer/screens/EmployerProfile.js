import { Button, Input, Layout, Text, Modal, Card } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { firebase } from "../../../../config";
import { useIsFocused } from "@react-navigation/native";
import { createEmployer } from "../../../api/employers";
import { getEmployers } from "../../../api/employers";
import { updateEmployer } from "../../../api/employers";


function EmployerProfile({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldFirstName, setOldFirstName] = useState("");
  const [oldLastName, setOldLastName] = useState("");
  const [oldContactNumber, setOldContactNumber] = useState("");
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
  const [newEmail, setNewEmailValue] = React.useState("");
  const [companyName, setCompanyNameValue] = React.useState("");
  const [companyType, setCompanyTypeValue] = React.useState("");
  const [companyOverview, setCompanyOverviewValue] = React.useState("");
  const [oldCompanyName, setOldCompanyNameValue] = React.useState("");
  const [oldCompanyType, setOldCompanyTypeValue] = React.useState("");
  const [oldCompanyOverview, setOldCompanyOverviewValue] = React.useState("");
  const [star, setStarValue] = React.useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
  const [employers, setEmployers] = useState([]);
  const [employer, setEmployer] = useState([])


  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  const userRef = db.collection("users").doc(userId);

  async function handleUpdateEmployer() {
    await updateEmployer(     
      employer.employerId,
      email,
      companyName,
      companyType,
      star,
      companyOverview
    ).then(() => {
      employer.companyName = companyName;
      employer.companyType = companyType;
      employer.companyOverview = companyOverview;
      setOldCompanyNameValue(companyName);
      setOldCompanyTypeValue(companyType);
      setOldCompanyOverviewValue(companyOverview);
      setSuccess("Profile updated successfully");
      setTimeout(() => {
        // After 5 seconds set the show value to false
        setSuccess("");
      }, 5000);
    });
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getEmployers();
  //     setEmployers(response);
  //   }

  //   fetchData();
  
  //   const findEmployerByEmail = async () => {
  //     const employer = employers.find((employer) => employer.email === email);
  //     if (employer) {
  //       setEmployer(employer)
  //       if (employer !== "undefined") {
  //         setCompanyNameValue(employer.companyName);
  //         setCompanyTypeValue(employer.companyType);
  //         setCompanyOverviewValue(employer.companyOverview)
  //         setStarValue(employer.star)
  //         setOldCompanyNameValue(employer.companyName);
  //         setOldCompanyTypeValue(employer.companyType);
  //         setOldCompanyOverviewValue(employer.companyOverview)
  //         console.log(companyName)
  //       }
  //     } else {
  //     }
  //   };
    
  //   findEmployerByEmail();
  // }, []);


  function handleCancel() {
    // clearInputs();
    setCreateModalVisible(false);
  }

  function clearInputs() {
    setNewCompanyNameValue("");
    setNewCompanyTypeValue("");
    setNewCompanyOverviewValue("");
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

  // const handleSubmit = () => {
  //   userRef
  //     .update({ fullName })
  //     .then(() => {
  //       setOldName(fullName);
  //       setSuccess("Profile updated successfully");
  //       setError(null);
  //       setTimeout(() => {
  //         // After 5 seconds set the show value to false
  //         setSuccess("");
  //       }, 5000);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setSuccess(null);
  //     });
  // };

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

    const fetchData = async () => {
      const response = await getEmployers();
      setEmployers(response);
      
    }

    fetchData();
  
    const findEmployerByEmail = async () => {
      const employer = employers.find((employer) => employer.email === email);
      if (employer) {
        console.log(employer)
        setEmployer(employer)
        if (employer !== "undefined") {
          setCompanyNameValue(employer.companyName);
          setCompanyTypeValue(employer.companyType);
          setCompanyOverviewValue(employer.companyOverview)
          setStarValue(employer.star)
          setOldCompanyNameValue(employer.companyName);
          setOldCompanyTypeValue(employer.companyType);
          setOldCompanyOverviewValue(employer.companyOverview)
        }
      }
    };
    
    findEmployerByEmail();
  }, [isFocused]);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h5">Employer Profile</Text>
      <Input style={styles.input} value={email} label="Email" disabled />

      <Input
        style={styles.input}
        value={companyName}
        label="Company Name"
        placeholder={companyName}
        onChangeText={(nextValue) => setCompanyNameValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={companyType}
        label="Company Type"
        placeholder={companyType}
        onChangeText={(nextValue) => setCompanyTypeValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={companyOverview}
        label="Company Overview"
        placeholder={companyOverview}
        onChangeText={(nextValue) => setCompanyOverviewValue(nextValue)}
        autoCapitalize="none"
      />

      <Button
        style={styles.button}
        disabled={oldCompanyName === companyName && oldCompanyType === companyType && oldCompanyOverview === companyOverview}
        onPress={() => handleUpdateEmployer()}
      >
        Save
      </Button>

      {/* <Modal
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
            <Input
              style={styles.input}
              value={newCompanyOverview}
              label="Company Overview"
              placeholder="Company Overview"
              onChangeText={(nextValue) => setNewCompanyOverviewValue(nextValue)}
            />
            <View flexDirection="row" columnGap="5" alignSelf="flex-end">
              <Button status="basic" onPress={() => handleCancel()}>
                CANCEL
              </Button>
              <Button
                status="primary"
                onPress={() => handleCreateEmployer()}
              >
                SAVE
              </Button>
            </View>
          </ScrollView>
        </Card>
      </Modal> */}

      {/* <Button style={styles.button} onPress={() => setCreateModalVisible(true)}>
        Add New Company
      </Button> */}

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
