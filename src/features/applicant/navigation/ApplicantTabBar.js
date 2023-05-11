import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";


const Tab = createMaterialBottomTabNavigator();

export function ApplicantTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ApplicantHome"
        component={Applicant}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="briefcase-outline" size={20} />,
        }}
      />
      <Tab.Screen
        name="ApplicantSearchJob"
        component={ApplicantSearchJob}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: () => <Ionicons name="business-outline" size={20} />,
        }}
      />
      <Tab.Screen
        name="ApplicantProfile"
        component={ApplicantProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <Ionicons name="person-outline" size={20} />,
        }}
      />

    </Tab.Navigator>
  );
}