import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import transformDate from "../utilities/dateTransformer";

const ListCards = (props) => {
  return (
    <TouchableOpacity
      onPress={props.goToDetails}
      activeOpacity={0.6}
      style={{
        ...styles.cardBody,
        height: props.type == "filtered" ? 250 : "100%",
        margin: props.type == "filtered" ? 8 : 0,
      }}
    >
      <ImageBackground
        imageStyle={{ borderRadius: 8 }}
        style={styles.backgroundImg}
        source={{ uri: props.newsImageThumbnail }}
      >
        <LinearGradient
          style={{
            height: "100%",
            borderRadius: 8,
            opacity: 0.7,
            position: "relative",
          }}
          start={{ x: 0.5, y: 0.5 }}
          colors={["#202020", "#000000", "#000000", "#000000"]}
        ></LinearGradient>

        {/* Text layer --- Stays ontop of the linear gradient */}
        <View style={styles.newsTextSection}>
          {/* Description section */}
          <Text
            numberOfLines={props.type === "filtered" ? 4 : 6}
            variant="titleMedium"
            style={{ color: "white", textAlign: "left" }}
          >
            {props.description}
          </Text>

          {/* News details */}
          <View style={styles.detailSection}>
            {/* Authors name */}
            <Text
              numberOfLines={1}
              variant="labelLarge"
              style={{ color: "white" }}
            >
              {props.author}
            </Text>
            {/* News date */}
            <Text variant="labelSmall" style={{ color: "white" }}>
              {transformDate(props.date)}
            </Text>
          </View>
          {/* news details end here */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ListCards;

const styles = StyleSheet.create({
  cardBody: {
    width: "98%",
    borderRadius: 8,
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#aaa",
  },
  backgroundImg: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
    borderRadius: 8,
  },
  newsTextSection: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "absolute",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  detailSection: {
    display: "flex",
    alignItems: "flex-start",
  },
});
