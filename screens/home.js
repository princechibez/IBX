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
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

import * as actions from "../stateManager/actions";
import { filters } from "../models/filters";
import NewsScroll from "../components/newsScroll";
import ListCards from "../components/listCards";
import { useRef } from "react";

const { width } = Dimensions.get("window");

const Home = (props) => {
  // local states are managed here
  const [searchQuery, setSearchQuery] = useState("nigeria");
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);

  const filterRef = useRef().current;

  useEffect(() => {
    props.onFetchNews(searchQuery);
  }, [searchQuery, activeFilterIndex]);

  const goToNewsDetails = (newsInfo) => {
    props.navigation.navigate("Details", { ...newsInfo });
  };

  const setFilterHandler = (query, index) => {
    setSearchQuery(query);
    setActiveFilterIndex(index);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.body}>
        <StatusBar translucent backgroundColor="transparent" animated />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Latest news section */}
          <View style={styles.latest}>
            <View style={styles.latestHeaderText}>
              <Text variant="headlineSmall">Latest News</Text>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate("Bookmarks")}
                // contentStyle={{ flexDirection: "row-reverse" }}
                icon={({ size, color }) => (
                  <Ionicons
                    name="md-bookmark-outline"
                    color={color}
                    size={size}
                  />
                )}
              >
                Bookmarks
              </Button>
            </View>

            {/* The News scroller section */}
            <NewsScroll
              loading={props.loading}
              showDetails={goToNewsDetails}
              data={props.newsHeadLine}
            />
          </View>
          {/* Latest news ends here */}

          {/* Filtered news section */}
          <View style={styles.filteredNews}>
            {/* Button filters section */}
            <View ref={filterRef} style={{ height: 50, marginBottom: 12 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filters.map((filt, index) => (
                  <Button
                    key={index}
                    onPress={() => setFilterHandler(filt, index)}
                    style={styles.btnStyle}
                    mode={
                      activeFilterIndex === index ? "contained" : "outlined"
                    }
                  >
                    {filt}
                  </Button>
                ))}
              </ScrollView>
            </View>
            {/* Button filters section */}

            {/* Other news List */}
            {!props.loading &&
              props.otherNews.map((filt, index) => (
                <ListCards
                  key={index}
                  goToDetails={() => goToNewsDetails(filt)}
                  type="filtered"
                  newsImageThumbnail={filt.urlToImage}
                  description={filt.description}
                  author={filt.author}
                  date={filt.publishedAt}
                />
              ))}
            {/* Other news List */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const mapStateToProps = (state) => {
  return {
    newsHeadLine: state.news.newsHeadlines,
    otherNews: state.news.filteredNews,
    error: state.news.error,
    loading: state.news.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNews: (searchQuery) =>
      dispatch(actions.fetchSortedNews(searchQuery)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    // paddingHorizontal: 12,
    display: "flex",
    alignItems: "center",
  },
  latest: {
    display: "flex",
    width: width,
    paddingHorizontal: 24,
    paddingTop: 18,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  latestHeaderText: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filteredNews: {
    display: "flex",
    alignItems: "center",
  },
  btnStyle: {
    marginHorizontal: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
