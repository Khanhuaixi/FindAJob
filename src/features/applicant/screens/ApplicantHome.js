import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ViewProps  } from "react-native";
import { getJobs } from "../../../api/jobs";
import { useNavigation } from "@react-navigation/native";
import {
  IndexPath,
  Button,
  Card,
  Layout,
  List,
  Text,
  SelectItem,
  } from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";



function ApplicantHome(){
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [jobs, setJobs] = useState([]);
    const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    async function fetchData() {
        const response = await getJobs();
        setJobs(response);
      };
      
    useEffect(() => {
        fetchData();
      }, [isFocused]);

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

        const renderItem = (info) => (
            <Card
              style={styles.card}
              status="basic"
              header={(headerProps) => renderItemHeader(headerProps, info)}
              footer={(footerProps) => renderItemFooter(footerProps, info)}
              onPress={() => {
                navigation.navigate("ApplicantJobApplication", {
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
        
          const renderOption = (title) => <SelectItem key="{title}" title={title} />;

          return (
            <Layout style={{ flex: 1, alignItems: "stretch" }}>
              <Card style={styles.cardTop} status="info">
                <Text category="h5" style={styles.textCardTop}>
                  Total Jobs: {jobs.length}
                </Text>
              </Card>

              
              <List data={jobs} renderItem={renderItem} />

            </Layout>
          );
    
}

export default ApplicantHome;

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