import { Layout, Text, Card, Button } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

function AdminJobManagement({ route, navigation }) {
  const { job } = route.params;
  console.log("job:");
  console.log(job);

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
      <Button style={styles.footerControl} size="small" status="danger">
        DELETE
      </Button>
    </View>
  );

  return (
    <Layout
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "stretch" }}
    >
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
    </Layout>
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
});

export default AdminJobManagement;
