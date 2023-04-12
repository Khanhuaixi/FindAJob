import React, { useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import { VictoryPie } from "victory-native";

import { Svg } from "react-native-svg";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";

const AdminDashboard = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.HeadContainer}>
        {/* <Text>Admin Dashboard</Text> */}
      </View>
      <Text style={styles.title}>Native API Calls</Text>
    </View>
  );
};

export default AdminDashboard;

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
  title: {
    fontSize: 35,
    color: "#fff",
  },
});
