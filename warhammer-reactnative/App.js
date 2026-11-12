import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ArmyProvider } from "./src/context/ArmyContext";
import HomeScreen from "./src/screens/HomeScreen";
import UnitDetailsScreen from "./src/screens/UnitDetailsScreen";
import ArmyScreen from "./src/screens/ArmyScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ArmyProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#0f1012" }}
          edges={["top", "left", "right"]}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="UnitDetails" component={UnitDetailsScreen} />
              <Stack.Screen name="Army" component={ArmyScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </ArmyProvider>
    </SafeAreaProvider>
  );
}
