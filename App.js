import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import store from "./stateManager/store";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/tabNavigator";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <RootSiblingParent>
        <PaperProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </PaperProvider>
      </RootSiblingParent>
    </ReduxProvider>
  );
}
