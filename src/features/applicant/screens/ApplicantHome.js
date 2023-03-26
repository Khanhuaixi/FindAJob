import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

function ApplicantHome({ route, navigation }) {
  const { userID, userName } = route.params;

  return (
    <View style={styles.Container}>
      <View style={styles.HeadContainer}>
        <Text>Hello {userName}</Text>
      </View>
    </View>
  );
}
export default ApplicantHome;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  HeadContainer: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
