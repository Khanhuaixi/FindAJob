import {
  Layout,
  Text,
  Card,
  Button,
  Modal,
  Input,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { deleteJob } from "../../../api/jobs";

function AdminJobManagement({ route, navigation }) {
  const { job } = route.params;
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  // const [jobName, setJobNameValue] = React.useState("");
  // const [employerId, setEmployerIdValue] = React.useState("");
  // const [jobLocation, setJobLocationValue] = React.useState("");
  // const [salaryRange, setSalaryRangeValue] = React.useState("");
  // const [jobDescription, setJobDescriptionValue] = React.useState("");
  // const [careerLevel, setCareerLevelValue] = React.useState("");
  // const [yearsOfExperience, setYearsOfExperienceValue] = React.useState("");
  // const [qualification, setQualificationValue] = React.useState("");
  // const [jobType, setJobTypeValue] = React.useState("");
  // const [jobSpecialization, setJobSpecializationValue] = React.useState("");

  const [newJobName, setNewJobNameValue] = React.useState("");
  const [newEmployerId, setNewEmployerIdValue] = React.useState("");
  const [newJobLocation, setNewJobLocationValue] = React.useState("");
  const [newSalaryRange, setNewSalaryRangeValue] = React.useState("");
  const [newJobDescription, setNewJobDescriptionValue] = React.useState("");
  const [newCareerLevel, setNewCareerLevelValue] = React.useState("");
  const [newYearsOfExperience, setNewYearsOfExperienceValue] =
    React.useState("");
  const [newQualification, setNewQualificationValue] = React.useState("");
  const [newJobType, setNewJobTypeValue] = React.useState("");
  const [newJobSpecialization, setNewJobSpecializationValue] =
    React.useState("");

  useEffect(() => {
    if (job !== "undefined") {
      setNewJobNameValue(job.jobName);
      setNewEmployerIdValue(job.employerId);
      setNewJobLocationValue(job.jobLocation);
      setNewSalaryRangeValue(job.salaryRange);
      setNewJobDescriptionValue(job.jobDescription);
      setNewCareerLevelValue(job.careerLevel);
      setNewYearsOfExperienceValue(job.yearsOfExperience);
      setNewQualificationValue(job.qualification);
      setNewJobTypeValue(job.jobType);
      setNewJobSpecializationValue(job.jobSpecialization);
    }
  }, [isEditModalVisible]);

  async function handleDeleteJob(i) {
    await deleteJob(i);
    console.log();
  }

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{job.jobName}</Text>
      <Text category="s1">{job.employerId}</Text>
      <Text>{job.jobLocation}</Text>
      <Text>RM{job.salaryRange}</Text>
      <Text>Posted on: {job.createdDate}</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        onPress={() => setEditModalVisible(true)}
        style={styles.footerControl}
        size="small"
        status="basic"
      >
        EDIT
      </Button>
      <Button
        onPress={() => setDeleteModalVisible(true)}
        style={styles.footerControl}
        size="small"
        status="danger"
      >
        DELETE
      </Button>
    </View>
  );

  // async function handleSave() {
  //   await updateUser(
  //     theUserId,
  //     email,
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     password,
  //     ROLE_USER
  //   );
  // }

  function handleSave() {
    job.jobName = newJobName;
    job.employerId = newEmployerId;
    job.jobLocation = newJobLocation;
    job.salaryRange = newSalaryRange;
    job.jobDescription = newJobDescription;
    job.careerLevel = newCareerLevel;
    job.yearsOfExperience = newYearsOfExperience;
    job.qualification = newQualification;
    job.jobType = newJobType;
    job.jobSpecialization = newJobSpecialization;
    job.careerLevel = newJobName;
    job.careerLevel = newJobName;

    setEditModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text category="s1">Job Description:</Text>
        <Text>
          {job.jobDescription}
          {"\n"}
        </Text>
        <Text category="s1">Career Level:</Text>
        <Text>
          {job.careerLevel}
          {"\n"}
        </Text>
        <Text category="s1">Years of Experience:</Text>
        <Text>
          {job.yearsOfExperience}
          {"\n"}
        </Text>
        <Text category="s1">Qualification:</Text>
        <Text>
          {job.qualification}
          {"\n"}
        </Text>
        <Text category="s1">Job Type:</Text>
        <Text>
          {job.jobType}
          {"\n"}
        </Text>
        <Text category="s1">Job Specialization:</Text>
        <Text>
          {job.jobSpecialization}
          {"\n"}
        </Text>
      </Card>

      <Modal
        visible={isDeleteModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDeleteModalVisible(false)}
      >
        <Card disabled={true}>
          <Text>Are you sure you want to delete this?</Text>
          <Text appearance="hint">This cannot be undone.</Text>
          <View flexDirection="row" columnGap="5" alignSelf="flex-end">
            <Button status="basic" onPress={() => setDeleteModalVisible(false)}>
              CANCEL
            </Button>
            <Button
              status="danger"
              onPress={() => setDeleteModalVisible(false)}
            >
              CONFIRM
            </Button>
          </View>
        </Card>
      </Modal>

      <Modal
        visible={isEditModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setEditModalVisible(false)}
      >
        <Card disabled={true}>
          <Input
            value={newJobName}
            label="Job Name"
            placeholder="Job Name"
            onChangeText={(nextValue) => setNewJobNameValue(nextValue)}
          />
          <Input
            value={newEmployerId}
            label="Employer Id"
            placeholder="Employer Id"
            onChangeText={(nextValue) => setNewEmployerIdValue(nextValue)}
          />
          <Input
            value={newJobLocation}
            label="Job Location"
            placeholder="Job Location"
            onChangeText={(nextValue) => setNewJobLocationValue(nextValue)}
          />
          <Input
            value={newSalaryRange.toString()}
            label="Salary Range"
            placeholder="Job Name"
            onChangeText={(nextValue) => setNewSalaryRangeValue(nextValue)}
            keyboardType="decimal-pad"
          />
          <Input
            value={newJobDescription}
            label="Job Description"
            placeholder="Job Description"
            onChangeText={(nextValue) => setNewJobDescriptionValue(nextValue)}
          />
          <Input
            value={newCareerLevel}
            label="Career Level"
            placeholder="Career Level"
            onChangeText={(nextValue) => setNewCareerLevelValue(nextValue)}
          />
          <Input
            value={newYearsOfExperience}
            label="Years of Experience"
            placeholder="Years of Experience"
            onChangeText={(nextValue) =>
              setNewYearsOfExperienceValue(nextValue)
            }
          />
          <Input
            value={newQualification}
            label="Qualification"
            placeholder="Qualification"
            onChangeText={(nextValue) => setNewQualificationValue(nextValue)}
          />
          <Input
            value={newJobType}
            label="Job Type"
            placeholder="Job Type"
            onChangeText={(nextValue) => setNewJobTypeValue(nextValue)}
          />
          <Input
            value={newJobSpecialization}
            label="Job Specialization"
            placeholder="Job Specialization"
            onChangeText={(nextValue) =>
              setNewJobSpecializationValue(nextValue)
            }
          />
          <View flexDirection="row" columnGap="5" alignSelf="flex-end">
            <Button status="basic" onPress={() => setEditModalVisible(false)}>
              CANCEL
            </Button>
            <Button status="primary" onPress={() => handleSave()}>
              SAVE
            </Button>
          </View>
        </Card>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default AdminJobManagement;
