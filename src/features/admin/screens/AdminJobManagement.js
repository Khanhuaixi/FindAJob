import {
  IndexPath,
  Button,
  Card,
  Input,
  Modal,
  Text,
  Divider,
  List,
  ListItem,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { deleteJob, updateJob } from "../../../api/jobs";
import { getEmployers } from "../../../api/employers";
import { getApplicantById } from "react-native-web/dist/cjs/exports/AppRegistry/renderApplication";

function AdminJobManagement({ route, navigation }) {
  const { job } = route.params;
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  const [newJobName, setNewJobNameValue] = React.useState("");
  const [newJobId, setNewJobIdValue] = React.useState("");
  const [newEmployerId, setNewEmployerIdValue] = React.useState("");
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
  const [selectedEmployerIndex, setSelectedEmployerIndex] = React.useState(
    new IndexPath(0)
  );
  const displayEmployerValue = employers[selectedEmployerIndex.row];
  const [applicants, setApplicants] = useState([]);

  async function fetchEmployersData() {
    const response = await getEmployers();
    const employerIds = response.map((item) => item.employerId.toString());
    setEmployers(employerIds);
  }

  async function handleDeleteJob(i) {
    await deleteJob(i).then(() => {
      setDeleteModalVisible(false);
      navigation.goBack();
    });
  }

  async function handleUpdateJob() {
    await updateJob(
      job.jobId,
      newJobName,
      newEmployerId,
      newJobDescription,
      newCareerLevel,
      newYearOfExperience,
      newQualification,
      newJobType,
      newJobSpecialization,
      newSalaryRange,
      newApplicantList
    ).then(() => {
      job.jobName = newJobName;
      job.employerId = newEmployerId;
      job.jobDescription = newJobDescription;
      job.careerLevel = newCareerLevel;
      job.yearOfExperience = newYearOfExperience;
      job.qualification = newQualification;
      job.jobType = newJobType;
      job.jobSpecialization = newJobSpecialization;
      job.salaryRange = newSalaryRange;
      job.applicantList = newApplicantList;

      setEditModalVisible(false);
    });
  }

  useEffect(() => {
    if (job.applicantList != "") {
      const applicantIdsString = job.applicantList;
      const applicantIdsArray = applicantIdsString
        .split(",")
        .map((str) => str.trim());

      const fetchApplicants = async () => {
        const applicantPromises = applicantIdsArray.map((applicantId) => {
          return getApplicantById(applicantId);
        });
        const applicants = await Promise.all(applicantPromises);
        setApplicants(applicants);
      };

      fetchApplicants();
    }
  }, [job]);

  useEffect(() => {
    fetchEmployersData();

    if (job !== "undefined") {
      setNewJobNameValue(job.jobName);
      setNewJobIdValue(job.jobId);
      setNewEmployerIdValue(job.employerId);
      setNewJobDescriptionValue(job.jobDescription);
      setNewCareerLevelValue(job.careerLevel);
      setNewYearOfExperienceValue(job.yearOfExperience);
      setNewQualificationValue(job.qualification);
      setNewJobTypeValue(job.jobType);
      setNewJobSpecializationValue(job.jobSpecialization);
      setNewSalaryRangeValue(job.salaryRange);
      setNewApplicantListValue(job.applicantList);

      const employerIndex = employers.indexOf(newEmployerId);
      if (employerIndex !== -1) {
        setSelectedEmployerIndex(new IndexPath(employerIndex));
      }
    }
  }, [isEditModalVisible]);

  useEffect(() => {
    setIsDisabled(
      !newJobName ||
        !newJobId ||
        !newEmployerId ||
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
    newJobId,
    newEmployerId,
    newJobDescription,
    newCareerLevel,
    newYearOfExperience,
    newQualification,
    newJobType,
    newJobSpecialization,
    newSalaryRange,
  ]);

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">
        {job.jobName} <Text appearance="hint">Job Id: {job.jobId}</Text>
      </Text>
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

  const renderItem = (info) => (
    <ListItem
      title={`${info.item.applicantId}`}
      description={`Name: ${info.item.firstName} ${info.item.lastName} {"\n} Email: ${info.item.email}`}
    />
  );

  const renderOption = (title) => <SelectItem key="{title}" title={title} />;

  return (
    <View style={styles.container}>
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text category="s1">Employer Id:</Text>
        <Text>
          {job.employerId}
          {"\n"}
        </Text>
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
          {job.yearOfExperience}
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
        <Text category="s1">Salary Range:</Text>
        <Text>
          RM{job.salaryRange}
          {"\n"}
        </Text>
        <Text category="s1">Applicant List:</Text>
        <Text>
          {job.applicantList === "" ? "No Applicants Yet" : ""}
          {"\n"}
        </Text>
        <List
          style={styles.list}
          data={applicants}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </Card>
      <Modal
        style={styles.modal}
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
            <Button status="danger" onPress={() => handleDeleteJob(job.jobId)}>
              CONFIRM
            </Button>
          </View>
        </Card>
      </Modal>
      <Modal
        style={styles.modal}
        visible={isEditModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setEditModalVisible(false)}
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
              value={job.jobId.toString()}
              label="Job Id"
              disabled
            />
            <Select
              style={styles.select}
              value={displayEmployerValue}
              label="Employer Id"
              selectedIndex={selectedEmployerIndex}
              onSelect={(index) => setSelectedEmployerIndex(index)}
            >
              {employers.map(renderOption)}
            </Select>
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
              keyboardType="decimal-pad"
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
            <Text style={styles.text} category="label" appearance="hint">
              Applicant List
            </Text>
            <Text>
              {job.applicantList === "" ? "No Applicants Yet" : ""}
              {"\n"}
            </Text>
            {/* <List
              style={styles.list}
              data={applicants}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            /> */}
            <List
              style={styles.list}
              data={applicants}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
            {applicants.map((item, index) => (
              <Text key={index}>{item.applicantId}</Text>
            ))}
            <View flexDirection="row" columnGap="5" alignSelf="flex-end">
              <Button status="basic" onPress={() => setEditModalVisible(false)}>
                CANCEL
              </Button>
              <Button
                status="primary"
                onPress={() => handleUpdateJob()}
                disabled={isDisabled}
              >
                SAVE
              </Button>
            </View>
          </ScrollView>
        </Card>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
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
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
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
  list: {
    margin: 5,
    marginBottom: 15,
    maxHeight: 100,
  },
});

export default AdminJobManagement;
