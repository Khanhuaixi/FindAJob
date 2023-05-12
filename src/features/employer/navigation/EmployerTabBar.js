import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

export function EmployerTabBar() {
    return (
      <Tab.Navigator>
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