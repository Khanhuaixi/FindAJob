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

  function ApplicantJobApplication({route, navigation}) {

    const { job } = route.params;
    console.log("start")
    console.log(job)
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
            APPLY
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
          title={`${info.item.jobName}`}
          description={`Name: ${info.item.firstName} ${info.item.lastName} {"\n} Email: ${info.item.email}`}
        />
      );
    
      const renderOption = (title) => <SelectItem key="{title}" title={title} />;
  }

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
        </Card>
        </View>)


export default ApplicantJobApplication;