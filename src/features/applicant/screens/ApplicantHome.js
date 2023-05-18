import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ViewProps  } from "react-native";
import { getJobs } from "../../../api/jobs";
import { useNavigation } from "@react-navigation/native";
import {
    Card,
    Text,
    SelectItem,
  } from "@ui-kitten/components";


function ApplicantHome(){

    const navigation = useNavigation();
    const [jobs, setJobs] = useState([]);

    async function fetchData() {
        const response = await getJobs();
        setJobs(response);
      };

      
    const renderItemHeader = (headerProps, info) => (
        <View {...headerProps}>
            <Text category="h6">
                {info.item.companyName ? info.item.companyName : "-"}{" "}
                <Text appearance="hint">Company Name: {info.item.applicantId}</Text>
            </Text>
        </View>
    );
     
    const renderItemFooter = (footerProps, info) => (
        <Text {...footerProps}>
            <Text>
                Job Name:{"\n"}
                {info.item.jobName}
                {"\n"}
                {"\n"}
            </Text>
            <Text>
                Star:{"\n"}
                {info.item.star}
                {"\n"}
                {"\n"}
            </Text>
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
                navigation.navigate("AdminJobManagement", {
                  job: info.item,
                });
              }}
            >
              <Text category="s1">
                Company Name: {"\n"}
                {info.item.companyName}
                {"\n"}
              </Text>
              <Text>
                Job Type:{"\n"}
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