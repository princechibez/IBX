import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import * as actions from "../stateManager/actions";
import ListCards from "../components/listCards";
import { useCallback } from "react";

const { height, width } = Dimensions.get("window");

const Bookmarks = (props) => {
  useEffect(() => {
    props.fetchAllBookmarks();
  }, []);

  const goToNewsDetails = (newsInfo) => {
    props.navigation.navigate("Details", { ...newsInfo });
  };

  /**
   * The callback below is used to determine
   * what to display on the screen on different conditions
   * 1. when loading, 2. when there are no bookmarks,
   * 3. when there are bookmarks to display
   */
  const bookmarkDisplay = useCallback(() => {
    let display;
    // console.log(props.loading, props.bookmarks);

    if (props.loading) {
      display = <ActivityIndicator animate size={50} />;
      return;
    }

    if (props.bookmarks.length === 0) {
      return (display = (
        <>
          <Text style={{ marginVertical: 12 }} variant="labelMedium">
            {!props.error && "You do not have any bookmarks now"}
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
      ));
    }

    if (props.bookmarks) {
      return (display = props.bookmarks.map((filt, index) => (
        <ListCards
          key={index}
          goToDetails={() => goToNewsDetails(filt)}
          type="filtered"
          newsImageThumbnail={filt.urlToImage}
          description={filt.description}
          author={filt.author}
          date={filt.publishedAt}
        />
      )));
    }
  }, [props.bookmarks, props.loading]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.body}>
        <StatusBar translucent backgroundColor="transparent" animated />
        <ScrollView
          contentContainerStylestyle={styles.filteredNews}
          showsVerticalScrollIndicator={false}
        >
          {/* Filtered news section */}
          <View style={props.bookmarks.length == 0 && styles.filteredNews}>
            {bookmarkDisplay()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmark.bookmarks,
    // error: state.bookmark.error,
    // success: state.bookmark.success,
    loading: state.news.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBookmarks: () => dispatch(actions.fetchBookmarks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);

const styles = StyleSheet.create({
  filteredNews: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: height - 100,
  },
});
