import { useIsFocused } from "@react-navigation/native";
import {
  Button,
  Card,
  Input,
  Layout,
  List,
  Modal,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createEmployer, getEmployers } from "../../../api/employers";
import { ROLE_EMPLOYER } from "../../../../constants/constants";
import { firebase } from "../../../../config";

function AdminEmployerList({ navigation }) {
  const isFocused = useIsFocused();
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);

  const [employers, setEmployers] = useState([]);
  const [newEmail, setNewEmailValue] = useState("");
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
        !newEmail ||
          !newCompanyName ||
          !newCompanyType ||
          !newStar ||
          !newCompanyOverview
      );
    }
  }, [
    newEmail,
    newCompanyName,
    newCompanyType,
    newStar,
    newCompanyOverview,
    status,
  ]);

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
    setNewEmailValue("");
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
        });
      }}
    >
      <Text category="s1">
        Email:{"\n"}
        {info.item.email}
        {"\n"}
      </Text>
      <Text category="s1">
        Company Type:{"\n"}
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
      newEmail,
      newCompanyName,
      newCompanyType,
      newStar,
      newCompanyOverview
    ).then(() => {
      clearInputs();
      setCreateModalVisible(false);
      fetchData();
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(newEmail, "Password123$")
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          newEmail,
          role: ROLE_EMPLOYER,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .catch((error) => {
            alert(error);
          });
      })

      .catch((error) => {
        alert(error);
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
        onBackdropPress={() => handleCancel()}
      >
        <Card disabled={true}>
          <Input
            style={styles.input}
            value={newEmail}
            label="Email"
            placeholder="Email"
            onChangeText={(nextValue) => setNewEmailValue(nextValue)}
          />
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
            keyboardType="number-pad"
          />
          <Input
            style={styles.input}
            value={newCompanyOverview}
            label="Company Overview"
            placeholder="Company Overview"
            onChangeText={(nextValue) => setNewCompanyOverviewValue(nextValue)}
          />
          <Text style={styles.input} appearance="hint">
            The account created for employer will have default password of
            'Password123$'
          </Text>
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
