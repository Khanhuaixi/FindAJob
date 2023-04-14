import { Layout, Text } from "@ui-kitten/components";

function AdminJobManagement({ route, navigation }) {
  const { job } = route.params;
  console.log("job:");
  console.log(job);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">{job.jobName}</Text>
    </Layout>
  );
}

export default AdminJobManagement;
