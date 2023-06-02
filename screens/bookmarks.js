import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import * as actions from "../stateManager/actions";
import ListCards from "../components/listCards";

const Home = (props) => {
  const goToNewsDetails = (newsInfo) => {
    console.log(newsInfo);
    props.navigation.navigate("Details", { ...newsInfo });
  };

  const bookmarkDisplay = () => {
    let display;

    if (props.loading) {
      display = <ActivityIndicator animate size={50} />;
    } else if (props.otherNews.length === 0) {
      display = (
        <>
          <Text style={{ marginVertical: 12 }} variant="labelMedium">
            You do not have any bookmarks now
          </Text>
          <Button
            onPress={() => props.navigation.navigate("Home")}
            mode="contained"
            contentStyle={{ flexDirection: "row-reverse" }}
            icon={({ size, color }) => (
              <Ionicons name="arrow-forward" size={size} color={color} />
            )}
          >
            View News
          </Button>
        </>
      );
    } else {
      display = props.otherNews.map((filt, index) => (
        <ListCards
          key={index}
          goToDetails={() => goToNewsDetails(filt)}
          type="filtered"
          newsImageThumbnail={filt.urlToImage}
          description={filt.description}
          author={filt.author}
          date={filt.publishedAt}
        />
      ));
    }

    return display;
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.body}>
        <StatusBar translucent backgroundColor="transparent" animated />
        <ScrollView
          contentContainerStylestyle={styles.filteredNews}
          showsVerticalScrollIndicator={false}
        >
          {/* Filtered news section */}
          <View style={styles.filteredNews}>{bookmarkDisplay()}</View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const mapStateToProps = (state) => {
  return {
    newsHeadLine: state.news.newsHeadlines,
    // otherNews: state.news.filteredNews,
    otherNews: [],
    error: state.news.error,
    loading: state.news.loading,
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  filteredNews: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
