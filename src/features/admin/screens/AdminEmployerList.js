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
  const [newCompanyName, setNewCompanyNameValue] = React.useState("");
  const [newCompanyType, setNewCompanyTypeValue] = React.useState("");
  const [newStar, setNewStarValue] = React.useState("");
  const [newCompanyOverview, setNewCompanyOverviewValue] = React.useState("");
  const [status, setStatus] = useState("basic");
  const [isDisabled, setIsDisabled] = useState(true);

  async function fetchData() {
    const response = await getEmployers();
    setEmployers(response);
  }

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    if (status === "danger") {
      setIsDisabled(true);
    } else {
      setIsDisabled(
        !newCompanyName || !newCompanyType || !newStar || !newCompanyOverview
      );
    }
  }, [newCompanyName, newCompanyType, newStar, newCompanyOverview, status]);

  useEffect(() => {
    if (
      newStar !== "" &&
      newStar !== "1" &&
      newStar !== "2" &&
      newStar !== "3" &&
      newStar !== "4" &&
      newStar !== "5"
    ) {
      setStatus("danger");
    } else {
      setStatus("basic");
    }
  }, [newStar]);

  function clearInputs() {
    setNewCompanyNameValue("");
    setNewCompanyTypeValue("");
    setNewStarValue("");
    setNewCompanyOverviewValue("");
    setStatus("basic");
    setIsDisabled(true);
  }

  function handleCancel() {
    clearInputs();
    setCreateModalVisible(false);
  }

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">
        {info.item.companyName}{" "}
        <Text appearance="hint">Employer Id: {info.item.employerId}</Text>
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
      newCompanyName,
      newCompanyType,
      newStar,
      newCompanyOverview
    ).then(() => {
      clearInputs();
      setCreateModalVisible(false);
      fetchData();
    });
  }

  return (
    <Layout style={{ flex: 1, alignItems: "stretch" }}>
      <Card style={styles.cardTop} status="info">
        <Text category="h5" style={styles.textCardTop}>
          Total Employers: {employers.length}
        </Text>
      </Card>

      <Button style={styles.button} onPress={() => setCreateModalVisible(true)}>
        Add New Employer
      </Button>
      <List data={employers} renderItem={renderItem} />

      <Modal
        style={styles.modal}
        visible={isCreateModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setCreateModalVisible(false)}
      >
        <Card disabled={true}>
          <Input
            style={styles.input}
            value={newCompanyName}
            label="Company Name"
            placeholder="Company Name"
            onChangeText={(nextValue) => setNewCompanyNameValue(nextValue)}
          />
          <Input
            style={styles.input}
            value={newCompanyType}
            label="Company Type"
            placeholder="Company Type"
            onChangeText={(nextValue) => setNewCompanyTypeValue(nextValue)}
          />
          <Input
            style={styles.input}
            status={status}
            value={newStar}
            label="Rating"
            placeholder="Number of Star"
            onChangeText={(nextValue) => setNewStarValue(nextValue)}
            caption="Only accepts rating from 1 to 5"
          />
          <Input
            style={styles.input}
            value={newCompanyOverview}
            label="Company Overview"
            placeholder="Company Overview"
            onChangeText={(nextValue) => setNewCompanyOverviewValue(nextValue)}
          />
          <View flexDirection="row" columnGap="5" alignSelf="flex-end">
            <Button status="basic" onPress={() => handleCancel()}>
              CANCEL
            </Button>
            <Button
              status="primary"
              onPress={() => handleCreateEmployer()}
              disabled={isDisabled}
            >
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
  },
});

export default AdminEmployerList;
