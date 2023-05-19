import { useIsFocused } from "@react-navigation/native";
import {
  IndexPath,
  Button,
  Card,
  Input,
  Layout,
  List,
  Modal,
  Text,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { createJob, getJobs } from "../../../api/jobs";
import { getEmployers } from "../../../api/employers";
import { firebase } from "../../../../config";

function EmployerJobList({ navigation }) {
  const isFocused = useIsFocused();
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [newJobName, setNewJobNameValue] = React.useState("");
  const [newEmployerId, setNewEmployerIdValue] = React.useState("");
  const [newEmployerId2, setNewEmployerId2Value] = React.useState("");
  const [newJobDescription, setNewJobDescriptionValue] = React.useState("");
  const [newCareerLevel, setNewCareerLevelValue] = React.useState("");
  const [newYearOfExperience, setNewYearOfExperienceValue] = React.useState("");
  const [newQualification, setNewQualificationValue] = React.useState("");
  const [newJobType, setNewJobTypeValue] = React.useState("");
  const [newJobSpecialization, setNewJobSpecializationValue] =
    React.useState("");
  const [newSalaryRange, setNewSalaryRangeValue] = React.useState("");
  const [newApplicantList, setNewApplicantListValue] = React.useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [employers, setEmployers] = useState([]);
  const [employer, setEmployer] = useState([]);


  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  const userRef = db.collection("users").doc(userId);

  async function fetchData() {
    const response = await getJobs();
    setJobs(response.reverse());
  }

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

  useEffect(() => {
    fetchEmployersData();

    const findEmployerByEmail = async () => {
      const employer = employers.find((employer) => employer.email === email);
      if (employer) {
        setEmployer(employer)
        if (employer !== "undefined") {
          setNewEmployerIdValue(employer.employerId)
          
        }
      } else {
      }
    };
    
    findEmployerByEmail();
    
  }, [isFocused]);


  async function fetchEmployersData() {
    const response = await getEmployers();
    setEmployers(response);
  }

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    setIsDisabled(
      !newJobName ||
        !newJobDescription ||
        !newCareerLevel ||
        !newYearOfExperience ||
        !newQualification ||
        !newJobType ||
        !newJobSpecialization ||
        !newSalaryRange
    );
  }, [
    newJobName,
    newEmployerId,
    newEmployerId,
    newJobDescription,
    newCareerLevel,
    newYearOfExperience,
    newQualification,
    newJobType,
    newJobSpecialization,
    newSalaryRange,
  ]);

  function clearInputs() {
    setNewJobNameValue("");
    setNewJobDescriptionValue("");
    setNewCareerLevelValue("");
    setNewYearOfExperienceValue("");
    setNewQualificationValue("");
    setNewJobTypeValue("");
    setNewJobSpecializationValue("");
    setNewSalaryRangeValue("");
    setNewApplicantListValue("");
    setIsDisabled(true);
  }

  function handleCancel() {
    clearInputs();
    setCreateModalVisible(false);
    console.log(newEmployerId);
  }

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.jobName}{" "}
        <Text appearance="hint">Job Id: {info.item.jobId}</Text>
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>
      <Text>
        Year Of Experience Needed:{"\n"}
        {info.item.yearOfExperience}
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Career Level:{"\n"}
        {info.item.careerLevel}
        {"\n"}
        {"\n"}
      </Text>
      Qualification:{"\n"}
      {info.item.qualification}
      {"\n"}
      {"\n"}
    </Text>
  );

  const renderItem = (info) => {
    console.log(employer.employerId)
    if (info.item.employerId == employer.employerId) {
      return (
        <Card
          style={styles.card}
          status="basic"
          header={(headerProps) => renderItemHeader(headerProps, info)}
          footer={(footerProps) => renderItemFooter(footerProps, info)}
          onPress={() => {
            navigation.navigate("EmployerJobManagement", {
              job: info.item,
            });
          }}
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
      
    } else {
      return null; // Don't render the job item if employerId doesn't match
    }
  };


  async function handleCreateJob() {
    const newEmployerId2 = newEmployerId.toString()
    setNewEmployerId2Value(newEmployerId2)
    await createJob(
      newJobName,
      newEmployerId2,
      newJobDescription,
      newCareerLevel,
      newYearOfExperience,
      newQualification,
      newJobType,
      newJobSpecialization,
      newSalaryRange,
      newApplicantList
    ).then(() => {
      clearInputs();
      setCreateModalVisible(false);
      fetchData();
      console.log(newEmployerId)
    });
  }


  return (
    <Layout style={{ flex: 1, alignItems: "stretch" }}>
      <Card style={styles.cardTop} status="info">
        <Text category="h5" style={styles.textCardTop}>
          Total Jobs: {jobs.length}
        </Text>
      </Card>

      <Button style={styles.button} onPress={() => setCreateModalVisible(true)}>
        Add New Job
      </Button>
      <List data={jobs} renderItem={renderItem} />

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
              value={newJobName}
              label="Job Name"
              placeholder="Job Name"
              onChangeText={(nextValue) => setNewJobNameValue(nextValue)}
            />
            <Input
              style={styles.input}
              value={newJobDescription}
              label="Job Description"
              placeholder="Job Description"
              onChangeText={(nextValue) => setNewJobDescriptionValue(nextValue)}
            />
            <Input
              style={styles.input}
              value={newCareerLevel}
              label="Career Level"
              placeholder="Career Level"
              onChangeText={(nextValue) => setNewCareerLevelValue(nextValue)}
            />
            <Input
              style={styles.input}
              value={newYearOfExperience.toString()}
              label="Year of Experience"
              placeholder="Year of Experience"
              onChangeText={(nextValue) =>
                setNewYearOfExperienceValue(nextValue)
              }
              keyboardType="number-pad"
            />
            <Input
              style={styles.input}
              value={newQualification}
              label="Qualification"
              placeholder="Qualification"
              onChangeText={(nextValue) => setNewQualificationValue(nextValue)}
            />
            <Input
              style={styles.input}
              value={newJobType}
              label="Job Type"
              placeholder="Job Type"
              onChangeText={(nextValue) => setNewJobTypeValue(nextValue)}
            />
            <Input
              style={styles.input}
              value={newJobSpecialization}
              label="Job Specialization"
              placeholder="Job Specialization"
              onChangeText={(nextValue) =>
                setNewJobSpecializationValue(nextValue)
              }
            />
            <Input
              style={styles.input}
              value={newSalaryRange}
              label="Salary Range"
              placeholder="Salary Range"
              onChangeText={(nextValue) => setNewSalaryRangeValue(nextValue)}
            />
            <View flexDirection="row" columnGap="5" alignSelf="flex-end">
              <Button status="basic" onPress={() => handleCancel()}>
                CANCEL
              </Button>
              <Button
                status="primary"
                onPress={() => handleCreateJob()}
                disabled={isDisabled}
              >
                SAVE
              </Button>
            </View>
          </ScrollView>
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
    flex: 1,
  },
  card: {
    margin: 5,
    width: "auto",
  },
  cardTop: {
    marginHorizontal: 20,
    marginVertical: 5,
    width: "auto",
  },
  textCardTop: {
    alignSelf: "center",
  },
  button: {
    margin: 5,
    width: "auto",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    marginBottom: 15,
  },
  modal: {
    width: "80%",
    maxHeight: "60%",
    justifyContent: "center",
  },
  select: {
    flex: 1,
    margin: 2,
  },
});

export default EmployerJobList;
