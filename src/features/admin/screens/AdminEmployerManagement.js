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

  const [newCompanyName, setNewCompanyNameValue] = React.useState("");
  const [newCompanyType, setNewCompanyTypeValue] = React.useState("");
  const [newStar, setNewStarValue] = React.useState("");
  const [newCompanyOverview, setNewCompanyOverviewValue] = React.useState("");
  const [status, setStatus] = useState("basic");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (employer !== "undefined") {
      setNewCompanyNameValue(employer.companyName);
      setNewCompanyTypeValue(employer.companyType);
      setNewStarValue(employer.star);
      setNewCompanyOverviewValue(employer.companyOverview);
    }
  }, [isEditModalVisible]);

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
      newStar != "" &&
      newStar != "1" &&
      newStar != "2" &&
      newStar != "3" &&
      newStar != "4" &&
      newStar != "5"
    ) {
      setStatus("danger");
    } else {
      setStatus("basic");
    }
  }, [newStar]);

  async function handleDeleteEmployer(i) {
    await deleteEmployer(i).then(() => {
      setDeleteModalVisible(false);
      navigation.goBack();
    });
  }

  async function handleUpdateEmployer() {
    await updateEmployer(
      employer.employerId,
      newCompanyName,
      newCompanyType,
      newStar,
      newCompanyOverview
    ).then(() => {
      employer.companyName = newCompanyName;
      employer.companyType = newCompanyType;
      employer.star = newStar;
      employer.companyOverview = newCompanyOverview;

      setEditModalVisible(false);
    });
  }

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">
        {employer.companyName}{" "}
        <Text appearance="hint">Employer Id: {employer.employerId}</Text>
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
        style={styles.modal}
        visible={isEditModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setEditModalVisible(false)}
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
            value={employer.employerId.toString()}
            label="Employer Id"
            disabled
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
            value={newStar.toString()}
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
            <Button status="basic" onPress={() => setEditModalVisible(false)}>
              CANCEL
            </Button>
            <Button
              status="primary"
              onPress={() => handleUpdateEmployer()}
              disabled={isDisabled}
            >
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
  cardTop: {
    marginHorizontal: 20,
    marginVertical: 5,
    width: "auto",
  },
  textCardTop: {
    alignSelf: "center",
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
  input: {
    marginBottom: 15,
  },
  modal: {
    width: "80%",
  },
});

export default AdminEmployerManagement;
