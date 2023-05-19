import { useIsFocused } from "@react-navigation/native";
import { Card, Layout, List, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getApplicants } from "../../../api/applicants";

function AdminApplicantList({ navigation }) {
  const isFocused = useIsFocused();

  const [applicants, setApplicants] = useState([]);

  async function fetchData() {
    const response = await getApplicants();
    setApplicants(response.reverse());
  }

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.firstName ? info.item.firstName : "-"}{" "}
        {info.item.lastName ? info.item.lastName : "-"}{" "}
        <Text appearance="hint">Applicant Id: {info.item.applicantId}</Text>
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>
      <Text>
        Contact Number:{"\n"}
        {info.item.contactNumber ? info.item.contactNumber : "-"}
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        Expected Salary:{"\n"}
        {info.item.expectedSalary ? info.item.expectedSalary : "-"}
        {"\n"}
        {"\n"}
      </Text>
      Experience:{"\n"}
      {info.item.experience ? info.item.experience : "-"}
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
        navigation.navigate("AdminApplicantManagement", {
          applicant: info.item,
        });
      }}
    >
      <Text category="s1">
        Email: {"\n"}
        {info.item.email ? info.item.email : "-"}
        {"\n"}
      </Text>
      <Text>
        Education:{"\n"}
        {info.item.education ? info.item.education : "-"}
        {"\n"}
      </Text>
      <Text>
        Skill:{"\n"}
        RM{info.item.skill ? info.item.skill : "-"}
        {"\n"}
      </Text>
      <Text>
        Languages:{"\n"}
        {info.item.languages ? info.item.languages : "-"}
        {"\n"}
      </Text>
      <Text>
        Age:{"\n"}
        {info.item.age ? info.item.age : "-"}
        {"\n"}
      </Text>
      <Text>
        Address:{"\n"}
        {info.item.address ? info.item.address : "-"}
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
  input: {
    marginBottom: 15,
  },
});

export default AdminApplicantList;
