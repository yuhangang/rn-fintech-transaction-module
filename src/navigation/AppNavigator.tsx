import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TransactionNavigator } from "../modules/transaction-history/TransactionNavigator";
import Home from "../modules/home/Home";
import { Home as HomeIcon, FileText } from "lucide-react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false, // Hide the header
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 60 + insets.bottom,
            elevation: 5, // for Android shadow
            shadowColor: "#000", // for iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            paddingBottom: insets.bottom + 16,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            marginTop: 3,
          },

          tabBarIcon: ({ color }) => {
            switch (route.name) {
              case "Home":
                return <HomeIcon color={color} size={24} />;
              case "Transactions":
                return <FileText color={color} size={24} />;
              default:
                return null;
            }
          },

          tabBarAccessibilityLabel: route.name,
          tabBarActiveTintColor: "#1E40AF", // A deeper blue for active state
          tabBarInactiveTintColor: "#6B7280", // Neutral gray for inactive state
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionNavigator}
          options={{ tabBarLabel: "Transactions" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
