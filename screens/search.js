import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

const Search = () => {
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        animated
      />
      <View
        style={{
          backgroundColor: "#bbb",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      <Text>Search page.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;
