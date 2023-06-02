import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ActivityIndicator, Text } from "react-native-paper";

import ListCards from "../components/listCards";
const { width } = Dimensions.get("window");

const NewsScroll = ({ data, showDetails, loading }) => {
  return loading ? (
    <View
      style={{
        width: "100%",
        height: width / 1.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator style={{marginBottom: 24}} animating size={50} />
      <Text>Fetching Headlines...</Text>
    </View>
  ) : (
    <Carousel
      loop
      width={width - 24}
      height={width / 1.5}
      mode="parallax"
      style={{ alignSelf: "center" }}
      autoPlay={true}
      data={data}
      scrollAnimationDuration={5000}
      renderItem={({ item, index }) => (
        <ListCards
          goToDetails={() => showDetails(item)}
          key={index}
          newsImageThumbnail={item.urlToImage}
          description={item.description}
          author={item.author}
          date={item.publishedAt}
        />
      )}
    />
  );
};

export default NewsScroll;
