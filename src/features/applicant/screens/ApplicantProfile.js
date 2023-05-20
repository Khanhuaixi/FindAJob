import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { firebase } from "../../../../config";
import { useIsFocused } from "@react-navigation/native";
import { getApplicants } from "../../../api/applicants";
import { updateApplicant } from "../../../api/applicants";

function ApplicantProfile({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [applicationList, setApplicationListValue] = React.useState("");
  const [oldApplicationList, setOldApplicationListValue] = React.useState("");
  const [firstName, setFirstNameValue] = React.useState("");
  const [oldFirstName, setOldFirstNameValue] = React.useState("");
  const [lastName, setLastNameValue] = React.useState("");
  const [oldLastName, setOldLastNameValue] = React.useState("");
  const [contactNumber, setContactNumberValue] = React.useState("");
  const [oldContactNumber, setOldContactNumberValue] = React.useState("");
  const [expectedSalary, setExpectedSalaryValue] = React.useState("");
  const [oldExpectedSalary, setOldExpectedSalaryValue] = React.useState("");
  const [experience, setExperienceValue] = React.useState("");
  const [oldExperience, setOldExperienceValue] = React.useState("");
  const [education, setEducationValue] = React.useState("");
  const [oldEducation, setOldEducationValue] = React.useState("");
  const [skill, setSkillValue] = React.useState("");
  const [oldSkill, setOldSkillValue] = React.useState("");
  const [languages, setLanguagesValue] = React.useState("");
  const [oldLanguages, setOldLanguagesValue] = React.useState("");
  const [age, setAgeValue] = React.useState("");
  const [oldAge, setOldAgeValue] = React.useState("");
  const [address, setAddressValue] = React.useState("");
  const [oldAddress, setOldAddressValue] = React.useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
  const [applicants, setApplicants] = useState([]);
  const [applicant, setApplicant] = useState([])

  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  const userRef = db.collection("users").doc(userId);

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
      applicant.contactNumber = contactNumber;
      applicant.applicationList = applicationList;
      applicant.expectedSalary = expectedSalary;
      applicant.experience = experience;
      applicant.education = education;
      applicant.skill = skill;
      applicant.languages = languages;
      applicant.age = age;
      applicant.address = address;
      setOldFirstNameValue(firstName);
      setOldLastNameValue(lastName);
      setOldContactNumberValue(contactNumber);
      setOldApplicationList(applicationList);
      setOldExpectedSalaryValue(expectedSalary);
      setOldExperienceValue(experience);
      setOldEducationValue(education);
      setOldSkillValue(skill);
      setOldLanguagesValue(languages);
      setOldAgeValue(age);
      setOldAddressValue(address);
      setSuccess("Profile updated successfully");
      setTimeout(() => {
        // After 5 seconds set the show value to false
        setSuccess("");
      }, 5000);
    });
  }

  function handleCancel() {
    // clearInputs();
    setCreateModalVisible(false);
  }

  function clearInputs() {
    setNewFirstNameValue("");
    setNewLastNameValue("");
    setNewContactNumberValue("");
    setNewExpectedSalaryValue("");
    setNewExperienceValue("");
    setNewEducationValue("");
    setNewSkillValue("");
    setNewLanguagesValue("");
    setNewAgeValue("");
    setNewAddressValue("");
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
    const response = await getApplicants();
    setApplicants(response);
    
  }

    fetchData();
  
    const findApplicantByEmail = async () => {
        const applicant = applicants.find((applicant) => applicant.email === email);
        if (applicant) {
        console.log(applicant)
        setApplicant(applicant)
        if (applicant !== "undefined") {
            setFirstNameValue(applicant.firstName);
            setLastNameValue(applicant.lastName); 
            setContactNumberValue(applicant.contactNumber);
            setApplicationListValue(applicant.applicationList);
            setExpectedSalaryValue(applicant.expectedSalary);
            setExperienceValue(applicant.experience);
            setEducationValue(applicant.education);
            setSkillValue(applicant.skill);
            setLanguagesValue(applicant.languages);
            setAgeValue(applicant.age);
            setAddressValue(applicant.address);           
            setOldFirstNameValue(applicant.firstName);
            setOldLastNameValue(applicant.lastName); 
            setOldContactNumberValue(applicant.contactNumber);
            setOldExpectedSalaryValue(applicant.expectedSalary);
            setOldExperienceValue(applicant.experience);
            setOldEducationValue(applicant.education);
            setOldSkillValue(applicant.skill);
            setOldLanguagesValue(applicant.languages);
            setOldAgeValue(applicant.age);
            setOldAddressValue(applicant.address);  
        }
        }
    };
    
    findApplicantByEmail();
  }, [isFocused]);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h5">Applicant Profile</Text>
      <Input style={styles.input} value={email} label="Email" disabled />

<ScrollView>
      <Input
        style={styles.input}
        value={firstName}
        label="First Name"
        placeholder={firstName}
        onChangeText={(nextValue) => setFirstNameValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={lastName}
        label="Last Name"
        placeholder={lastName}
        onChangeText={(nextValue) => setLastNameValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={contactNumber}
        label="Contact Number"
        placeholder={contactNumber}
        onChangeText={(nextValue) => setContactNumberValue(nextValue)}
        autoCapitalize="none"
      />

      <Text>
        ApplicationList:{"\n"}
        RM{info.item.applicationList}
        {"\n"}
      </Text>


      <Input
        style={styles.input}
        value={expectedSalary}
        label="Expected Salary"
        placeholder={expectedSalary}
        onChangeText={(nextValue) => setExpectedSalaryValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={experience}
        label="Experience"
        placeholder={experience}
        onChangeText={(nextValue) => setExperienceValue(nextValue)}
        autoCapitalize="none"
      />
      
      <Input
        style={styles.input}
        value={education}
        label="Education"
        placeholder={education}
        onChangeText={(nextValue) => setEducationValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={skill}
        label="Skill"
        placeholder={skill}
        onChangeText={(nextValue) => setSkillValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={languages}
        label="Languages"
        placeholder={languages}
        onChangeText={(nextValue) => setLanguagesValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={age}
        label="Age"
        placeholder={age}
        onChangeText={(nextValue) => setAgeValue(nextValue)}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        value={address}
        label="Address"
        placeholder={address}
        onChangeText={(nextValue) => setAddressValue(nextValue)}
        autoCapitalize="none"
      />

      <Button
        style={styles.button}
        disabled={oldFirstName === firstName && oldLastName === lastName && oldContactNumber === contactNumber && oldExpectedSalary === expectedSalary && oldExperience === experience && oldEducation === education && oldSkill === skill && oldLanguages === languages && oldAge === age && oldAddress === address}
        onPress={() => handleUpdateApplicant()}
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
      </ScrollView>
    </Layout>
  );
}

export default ApplicantProfile;

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