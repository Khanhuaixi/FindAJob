import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  Modal,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getJobById } from "../../../api/jobs";
import { deleteApplicant } from "../../../api/applicants";

function AdminApplicantManagement({ route, navigation }) {
  const { applicant } = route.params;
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [applications, setApplications] = useState([]);

  async function handleDeleteApplicant(i) {
    await deleteApplicant(i).then(() => {
      setDeleteModalVisible(false);
      navigation.goBack();
    });
  }

  useEffect(() => {
    if (applicant.applicationList != "") {
      const jobIdsString = applicant.applicantionList;
      const jobIdsArray = jobIdsString.split(",").map((str) => str.trim());

      const fetchApplications = async () => {
        const jobPromises = jobIdsArray.map((jobId) => {
          return getJobById(jobId);
        });
        const applications = await Promise.all(jobPromises);
        setApplications(applications);
      };

      fetchApplications();
    }
  }, [applicant]);

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">
        {applicant.firstName ? applicant.firstName : "-"}{" "}
        {applicant.lastName ? applicant.lastName : "-"}{" "}
        <Text appearance="hint">Applicant Id: {applicant.applicantId}</Text>
      </Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
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

  const renderItem = (info) => (
    <ListItem
      title={`${info.item.jobId}`}
      description={`Job Name: ${info.item.jobName}`}
    />
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text category="s1">Email:</Text>
        <Text>
          {applicant.email ? applicant.email : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Education:</Text>
        <Text>
          {applicant.education ? applicant.education : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Skill:</Text>
        <Text>
          {applicant.skill ? applicant.skill : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Languages:</Text>
        <Text>
          {applicant.languages ? applicant.languages : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Age:</Text>
        <Text>
          {applicant.age ? applicant.age : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Address:</Text>
        <Text>
          {applicant.address ? applicant.address : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Contact Number:</Text>
        <Text>
          {applicant.contactNumber ? applicant.contactNumber : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Expected Salary:</Text>
        <Text>
          RM{applicant.expectedSalary ? applicant.expectedSalary : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Experience:</Text>
        <Text>
          {applicant.experience ? applicant.experience : "-"}
          {"\n"}
        </Text>
        <Text category="s1">Applicant List:</Text>
        <Text>
          {applicant.applicationList === "" ? "No Jobs Applied Yet" : ""}
          {"\n"}
        </Text>
        <List
          style={styles.list}
          data={applications}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </Card>

      <Modal
        visible={isDeleteModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDeleteModalVisible(false)}
      >
        <Card disabled={true}>
          <Text style={styles.text}>Are you sure you want to delete this?</Text>
          <Text style={styles.text} appearance="hint">
            This cannot be undone.
          </Text>
          <View flexDirection="row" columnGap="5" alignSelf="flex-end">
            <Button status="basic" onPress={() => setDeleteModalVisible(false)}>
              CANCEL
            </Button>
            <Button
              status="danger"
              onPress={() => handleDeleteApplicant(applicant.applicantId)}
            >
              CONFIRM
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
  modal: {
    width: "80%",
  },
  text: {
    margin: 10,
  },
});

export default AdminApplicantManagement;
