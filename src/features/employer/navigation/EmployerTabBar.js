import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import EmployerProfile from "../screens/EmployerProfile";
import EmployerJobList from "../screens/EmployerJobList";
import EmployerApplications from "../screens/EmployerAppications";

const Tab = createMaterialBottomTabNavigator();

export function EmployerTabBar() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="EmployerJobList"
          component={EmployerJobList}
          options={{
            tabBarLabel: "Job List",
            tabBarIcon: () => <Ionicons name="briefcase-outline" size={20} />,
          }}
        />
        <Tab.Screen
          name="EmployerApplications"
          component={EmployerApplications}
          options={{
            tabBarLabel: "Applications",
            tabBarIcon: () => <Ionicons name="document-outline" size={20} />,
          }}
        />   
        <Tab.Screen
          name="EmployerProfile"
          component={EmployerProfile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => <Ionicons name="person-circle-outline" size={20} />,
          }}
        />   
         
      </Tab.Navigator>
    );
  }