import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ApplicantHome from "../screens/ApplicantHome";
import ApplicantProfile from "../screens/ApplicantProfile";
import AppliedJobs from "../screens/AppliedJobs";

const Tab = createMaterialBottomTabNavigator();

export function ApplicantTabBar() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ApplicantHome}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Ionicons name="home-outline" size={20} />,
          }}
        />
        <Tab.Screen
          name="AppliedJobs"
          component={AppliedJobs}
          options={{
            tabBarLabel: "Applied Jobs",
            tabBarIcon: () => <Ionicons name="briefcase-outline" size={20} />,
          }}
        /> 
        <Tab.Screen
          name="ApplicantProfile"
          component={ApplicantProfile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => <Ionicons name="person-circle-outline" size={20} />,
          }}
        />  
         
              
      </Tab.Navigator>
    );
  }