import { Button, Input, Layout, Text, List } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { firebase } from "../../../../config";
import { useIsFocused } from "@react-navigation/native";
import { getApplicants } from "../../../api/applicants";
import { updateApplicant } from "../../../api/applicants";
import { getApplicantById } from "../../../api/applicants";

function AppliedJobs({ navigation }) {
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
  const [applicant, setApplicant] = useState([]);

  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  const userRef = db.collection("users").doc(userId);

  function handleCancel() {
    // clearInputs();
    setCreateModalVisible(false);
  }
  
    async function getApplicantByIdFunction() {
        const applicant = await getApplicantById(userId);
        if (applicant) {
        console.log(applicant)
        setApplicant(applicant)
        if (applicant !== "undefined") {
            setApplicationListValue(applicant.applicationList);
        }
        }
    };
    
    useEffect(() => {
            getApplicantByIdFunction();
          }, []);
    
        const renderItem = (info) => (
            <Card
              style={styles.card}
              status="basic"
              header={(headerProps) => renderItemHeader(headerProps, info)}
              footer={(footerProps) => renderItemFooter(footerProps, info)}
              
            >
              <Text category="s1">
                Job Type: {"\n"}
                {info.item.jobType}
                {"\n"}
              </Text>
              <Text>
                Job Specialization:{"\n"}
                {info.item.jobSpecialization}
                {"\n"}
              </Text>
              <Text>
                Salary Range:{"\n"}
                RM{info.item.salaryRange}
                {"\n"}
              </Text>
              <Text>
                Job Description:{"\n"}
                {info.item.jobDescription}
                {"\n"}
              </Text>
            </Card>
          );

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h5">Applicant Profile</Text>
      <Input style={styles.input} value={email} label="Email" disabled />

<ScrollView>
    <List data={applicationList} renderItem={renderItem} />
    
      </ScrollView>
    </Layout>
  );
}

export default AppliedJobs;

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