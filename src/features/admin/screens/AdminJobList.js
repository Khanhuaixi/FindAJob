import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Layout, Text, List } from "@ui-kitten/components";

const jobs = new Array(8).fill({
  jobId: "J001",
  jobName: "Full Stack Developer",
  jobLocation: "Bukit Bintang",
  employerId: "E001",
  createdDate: "2022-08-01",
  jobDescription:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  careerLevel: "Fresh Grad",
  yearOfExperience: "0",
  qualification: "Degree",
  jobType: "Office",
  jobSpecialization: "Full Stack",
  salaryRange: "3500 - 4000",
  applicantList: applicants,
});

const applicants = new Array(2).fill({
  applicantId: "A001",
});

function AdminJobList({ navigation }) {
  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.jobName} {info.index + 1}
      </Text>
      <Text category="s1">Job Location: {info.item.jobLocation}</Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>Created Date: {info.item.createdDate}</Text>
  );

  const renderItem = (info) => (
    <Card
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, info)}
      footer={(footerProps) => renderItemFooter(footerProps, info)}
    >
      <Text>Job Description:</Text>
      <Text>{info.item.jobDescription}</Text>

      <Text>Job Location: {info.item.jobLocation}</Text>
    </Card>
  );

  return (
    <Layout style={{ flex: 1, alignItems: "center" }}>
      <List data={jobs} renderItem={renderItem} />
    </Layout>
  );
}

export default AdminJobList;
