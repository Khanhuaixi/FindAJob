import {
  Layout,
  Text,
  Card,
  Button,
  Modal,
  Input,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { deleteEmployer, updateEmployer } from "../../../api/employers";

function AdminEmployerManagement({ route, navigation }) {
  const { employer } = route.params;
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  const [newEmployerId, setNewEmployerIdValue] = React.useState(1);
  const [newCompanyName, setNewCompanyNameValue] = React.useState("");
  const [newCompanyType, setNewCompanyTypeValue] = React.useState("");
  const [newStar, setNewStarValue] = React.useState(1);
  const [newCompanyOverview, setNewCompanyOverviewValue] = React.useState("");

  useEffect(() => {
    if (employer !== "undefined") {
      setNewCompanyNameValue(employer.companyName);
      setNewEmployerIdValue(employer.employerId);
      setNewCompanyTypeValue(employer.companyType);
      setNewStarValue(employer.star);
      setNewCompanyOverviewValue(employer.companyOverview);
    }
  }, [isEditModalVisible]);

  async function handleDeleteEmployer(i) {
    await deleteEmployer(i).then(() => {
      setDeleteModalVisible(false);
      navigation.goBack();
    });
  }

  async function handleUpdateEmployer() {
    await updateEmployer(
      newEmployerId,
      newCompanyName,
      newCompanyType,
      newStar,
      newCompanyOverview
    ).then(() => {
      //update ui
      employer.companyName = newCompanyName;
      employer.employerId = newEmployerId;
      employer.companyType = newCompanyType;
      employer.star = newStar;
      employer.companyOverview = newCompanyOverview;

      setEditModalVisible(false);
      navigation.goBack();
    });
  }

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{employer.companyName}</Text>
      <Text category="s1">{employer.employerId}</Text>
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
        EDIT
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

  return (
    <View style={styles.container}>
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text category="s1">Company Type:</Text>
        <Text>
          {employer.companyType}
          {"\n"}
        </Text>
        <Text category="s1">Rating:</Text>
        <Text>
          {employer.star}
          {"\n"}
        </Text>
        <Text category="s1">Company Overview:</Text>
        <Text>
          {employer.companyOverview}
          {"\n"}
        </Text>
      </Card>

      <Modal
        visible={isDeleteModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDeleteModalVisible(false)}
      >
        <Card disabled={true}>
          <Text>Are you sure you want to delete this?</Text>
          <Text appearance="hint">This cannot be undone.</Text>
          <View flexDirection="row" columnGap="5" alignSelf="flex-end">
            <Button status="basic" onPress={() => setDeleteModalVisible(false)}>
              CANCEL
            </Button>
            <Button
              status="danger"
              onPress={() => handleDeleteEmployer(employer.employerId)}
            >
              CONFIRM
            </Button>
          </View>
        </Card>
      </Modal>

      <Modal
        visible={isEditModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setEditModalVisible(false)}
      >
        <Card disabled={true}>
          <Input
            value={newCompanyName}
            label="Company Name"
            placeholder="Company Name"
            onChangeText={(nextValue) => setNewCompanyNameValue(nextValue)}
          />
          <Input
            value={newEmployerId.toString()}
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
            value={newStar.toString()}
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
            <Button status="basic" onPress={() => setEditModalVisible(false)}>
              CANCEL
            </Button>
            <Button status="primary" onPress={() => handleUpdateEmployer()}>
              SAVE
            </Button>
          </View>
        </Card>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default AdminEmployerManagement;
