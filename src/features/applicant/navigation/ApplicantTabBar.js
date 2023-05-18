import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ApplicantHome from "../screens/ApplicantHome";


const Tab = createMaterialBottomTabNavigator();

export function ApplicantTabBar() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="ApplicantHome"
          component={ApplicantHome}
          options={{
            tabBarLabel: "ApplicantHome",
            tabBarIcon: () => <Ionicons name="home-outline" size={20} />,
          }}
        />
              
      </Tab.Navigator>
    );
  }