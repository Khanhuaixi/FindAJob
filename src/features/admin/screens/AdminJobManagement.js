import { Layout, Text, Card, Button, Modal } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";

function AdminJobManagement({ route, navigation }) {
  const { job } = route.params;
  console.log("job:");
  console.log(job);

  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{job.jobName}</Text>
      <Text category="s1">{job.employerId}</Text>
      <Text>{job.jobLocation}</Text>
      <Text>RM{job.salaryRange}</Text>
      <Text>Posted on: {job.createdDate}</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button style={styles.footerControl} size="small" status="basic">
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
        <Text category="s1">Job Description:</Text>
        <Text>
          {job.jobDescription}
          {"\n"}
        </Text>
        <Text category="s1">Career Level:</Text>
        <Text>
          {job.careerLevel}
          {"\n"}
        </Text>
        <Text category="s1">Years of Experience:</Text>
        <Text>
          {job.yearsOfExperience}
          {"\n"}
        </Text>
        <Text category="s1">Qualification:</Text>
        <Text>
          {job.qualification}
          {"\n"}
        </Text>
        <Text category="s1">Job Type:</Text>
        <Text>
          {job.jobType}
          {"\n"}
        </Text>
        <Text category="s1">Job Specialization:</Text>
        <Text>
          {job.jobSpecialization}
          {"\n"}
        </Text>
      </Card>

      <Modal
        visible={isDeleteModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDeleteModalVisible(false)}
      >
        <Card disabled={true}>
          <Text>Are you sure you want to delete this modal?</Text>
          <Text appearance="hint">This cannot be undone.</Text>
          <View flexDirection="row" columnGap="5" alignSelf="flex-end">
            <Button status="basic" onPress={() => setDeleteModalVisible(false)}>
              CANCEL
            </Button>
            <Button
              status="danger"
              onPress={() => setDeleteModalVisible(false)}
            >
              CONFIRM
            </Button>
          </View>
        </Card>
      </Modal>
    </View>

    // <View style={styles.container}>
    //   <Card style={styles.card} header={Header} footer={Footer}>
    //     <Text category="s1">Job Description:</Text>
    //     <Text>
    //       {job.jobDescription}
    //       {"\n"}
    //     </Text>
    //     <Text category="s1">Career Level:</Text>
    //     <Text>
    //       {job.careerLevel}
    //       {"\n"}
    //     </Text>
    //     <Text category="s1">Years of Experience:</Text>
    //     <Text>
    //       {job.yearsOfExperience}
    //       {"\n"}
    //     </Text>
    //     <Text category="s1">Qualification:</Text>
    //     <Text>
    //       {job.qualification}
    //       {"\n"}
    //     </Text>
    //     <Text category="s1">Job Type:</Text>
    //     <Text>
    //       {job.jobType}
    //       {"\n"}
    //     </Text>
    //     <Text category="s1">Job Specialization:</Text>
    //     <Text>
    //       {job.jobSpecialization}
    //       {"\n"}
    //     </Text>
    //   </Card>

    //   <Modal
    //     visible={deleteModalVisible}
    //     backdropStyle={styles.backdrop}
    //     onBackdropPress={() => setDeleteModalVisible(false)}
    //   >
    //     <Card disabled={true}>
    //       <Text>Are you sure you want to delete this modal?</Text>
    //       <Text appearance="hint">This cannot be undone.</Text>
    //       <Button onPress={() => setDeleteModalVisible(false)}>Cancel</Button>
    //       <Button status="danger" onPress={() => setDeleteModalVisible(false)}>
    //         Confirm
    //       </Button>
    //     </Card>
    //   </Modal>
    // </View>
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

export default AdminJobManagement;
