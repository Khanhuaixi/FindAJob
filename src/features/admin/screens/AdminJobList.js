import { React, useState, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Card, Layout, Text, List, Button, Modal } from "@ui-kitten/components";

function AdminJobList({ navigation }) {
  const [jobs, setJobs] = useState([]);

  useEffect(async () => {
    // console.log("bla");
    // let mounted = true;
    // getAllFood().then((item) => {
    //   if (mounted) {
    //     setFoods(item);
    //   }
    // });
    // return () => (mounted = false);

    const applicants = new Array(2).fill({
      applicantId: "A001",
    });

    const jobs = new Array(8).fill({
      JobId: "J001",
      JobName: "Full Stack Developer",
      JobLocation: "Bukit Bintang",
      EmployerId: "E001",
      CreatedDate: "2022-08-01",
      JobDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      CareerLevel: "Fresh Grad",
      YearsOfExperience: "0",
      Qualification: "Degree",
      jobType: "Full Time",
      jobSpecialization: "Computer/Information Technology, IT-Software",
      salaryRange: "3500 - 4000",
      applicantList: applicants,
    });

    setJobs(jobs);
  }, []);

  // const jobs = new Array(8).fill({
  //   jobId: "J001",
  //   jobName: "Full Stack Developer",
  //   jobLocation: "Bukit Bintang",
  //   employerId: "E001",
  //   createdDate: "2022-08-01",
  //   jobDescription:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  //   careerLevel: "Fresh Grad",
  //   yearsOfExperience: "0",
  //   qualification: "Degree",
  //   jobType: "Full Time",
  //   jobSpecialization: "Computer/Information Technology, IT-Software",
  //   salaryRange: "3500 - 4000",
  //   applicantList: applicants,
  // });

  // const applicants = new Array(2).fill({
  //   applicantId: "A001",
  // });

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.jobName} {info.index + 1}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>Posted on: {info.item.createdDate}</Text>
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
        Job Location: {"\n"}
        {info.item.jobLocation}
        {"\n"}
      </Text>
      <Text>
        Salary Range:{"\n"}
        RM{info.item.salaryRange}
      </Text>
    </Card>
  );

  return (
    <Layout style={{ flex: 1, alignItems: "stretch" }}>
      <List data={jobs} renderItem={renderItem} />
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
});

export default AdminJobList;
