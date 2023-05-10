import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { createEmployer, getEmployers } from "../../../api/employers";
import {
  Layout,
  List,
  Text,
  Card,
  Button,
  Modal,
  Input,
} from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";

function AdminEmployerList({ navigation }) {
  const isFocused = useIsFocused();
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);

  const [employers, setEmployers] = useState([]);
  const [newEmployerId, setNewEmployerIdValue] = React.useState("");
  const [newCompanyName, setNewCompanyNameValue] = React.useState("");
  const [newCompanyType, setNewCompanyTypeValue] = React.useState("");
  const [newStar, setNewStarValue] = React.useState("");
  const [newCompanyOverview, setNewCompanyOverviewValue] = React.useState("");

  // useEffect(async () => {
  //   let mounted = true;
  //   getEmployers().then((item) => {
  //     if (mounted) {
  //       setEmployers(item);
  //     }
  //   });

  //   return () => (mounted = false);
  // }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getEmployers();
      // ...
      setEmployers(response);
    }
    fetchData();
  }, [isFocused]); // Or [] if effect doesn't need props or state

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.companyName} {info.index + 1}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>Rating: {info.item.star}</Text>
  );

  const renderItem = (info) => (
    <Card
      style={styles.card}
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, info)}
      footer={(footerProps) => renderItemFooter(footerProps, info)}
      onPress={() => {
        navigation.navigate("AdminEmployerManagement", {
          employer: info.item,
          action: "Update",
        });
      }}
    >
      <Text category="s1">
        Company Type: {"\n"}
        {info.item.companyType}
        {"\n"}
      </Text>
      <Text>
        Company Overview:{"\n"}
        {info.item.companyOverview}
      </Text>
    </Card>
  );

  async function handleCreateEmployer() {
    await createEmployer(
      newEmployerId,
      newCompanyName,
      newCompanyType,
      newStar,
      newCompanyOverview
    ).then(() => {
      const newEmployer = {
        employerId: newEmployerId,
        companyName: newCompanyName,
        companyType: newCompanyType,
        star: newStar,
        companyOverview: newCompanyOverview,
      };
      //update ui
      employers.push(newEmployer);
      //load employers from backend again
      async function fetchData() {
        // You can await here
        const response = await getEmployers();
        // ...
        setEmployers(response);
      }
      fetchData();

      setCreateModalVisible(false);
    });
  }

  return (
    <Layout style={{ flex: 1, alignItems: "stretch" }}>
      <Button style={styles.button} onPress={() => setCreateModalVisible(true)}>
        Add New Employer
      </Button>
      <List data={employers} renderItem={renderItem} />

      <Modal
        visible={isCreateModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setCreateModalVisible(false)}
      >
        <Card disabled={true}>
          <Input
            value={newCompanyName}
            label="Company Name"
            placeholder="Company Name"
            onChangeText={(nextValue) => setNewCompanyNameValue(nextValue)}
          />
          <Input
            value={newEmployerId}
            label="Employer Id"
            placeholder="Employer Id"
            onChangeText={(nextValue) => setNewEmployerIdValue(nextValue)}
          />
          <Input
            value={newCompanyType}
            label="Company Type"
            placeholder="Company Type"
            onChangeText={(nextValue) => setNewCompanyTypeValue(nextValue)}
          />
          <Input
            value={newStar}
            label="Rating"
            placeholder="Number of Star"
            onChangeText={(nextValue) => setNewStarValue(nextValue)}
          />
          <Input
            value={newCompanyOverview}
            label="Company Overview"
            placeholder="Company Overview"
            onChangeText={(nextValue) => setNewCompanyOverviewValue(nextValue)}
          />
          <View flexDirection="row" columnGap="5" alignSelf="flex-end">
            <Button status="basic" onPress={() => setCreateModalVisible(false)}>
              CANCEL
            </Button>
            <Button status="primary" onPress={() => handleCreateEmployer()}>
              SAVE
            </Button>
          </View>
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
  button: {
    margin: 5,
    width: "auto",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default AdminEmployerList;
