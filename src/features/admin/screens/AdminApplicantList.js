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
import { getApplicants } from "../../../api/applicants";

function AdminApplicantList({ navigation }) {
  const isFocused = useIsFocused();
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);

  const [applicants, setApplicants] = useState([]);

  async function fetchData() {
    const response = await getApplicants();
    setApplicants(response);
  }

  useEffect(() => {
    fetchData();
    fetchEmployersData();
  }, [isFocused]);

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.firstName} {info.item.lastName}{" "}
        <Text appearance="hint">Applicant Id: {info.item.applicantId}</Text>
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
        Expected Salary:{"\n"}
        {info.item.expectedSalary}
        {"\n"}
        {"\n"}
      </Text>
      Experience:{"\n"}
      {info.item.experience}
      {"\n"}
      {"\n"}
    </Text>
  );

  const renderItem = (info) => (
    <Card
      style={styles.card}
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, info)}
      footer={(footerProps) => renderItemFooter(footerProps, info)}
      onPress={() => {
        navigation.navigate("AdminJobManagement", {
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

  return (
    <Layout style={{ flex: 1, alignItems: "stretch" }}>
      <Card style={styles.cardTop} status="info">
        <Text category="h5" style={styles.textCardTop}>
          Total Applicants: {applicants.length}
        </Text>
      </Card>

      <List data={applicants} renderItem={renderItem} />
    </Layout>
  );
}

export default AdminApplicantList;
