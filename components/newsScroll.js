import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ActivityIndicator } from "react-native-paper";

import ListCards from "../components/listCards";
const { width } = Dimensions.get("window");

const NewsScroll = ({ data, showDetails, loading }) => {
  return loading ? (
    <View
      style={{
        width: width,
        height: width / 1.5,
        display: "flex",
        position: "relative",
        left: 0,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator animating size={50} />
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
