import React, { useEffect, useRef, useState } from "react";
import { View, Image } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

import transformDate from "../utilities/dateTransformer";

const Details = ({ navigation, route }) => {
  // get all properties needed from the nav params
  const { author, content, description, urlToImage, title, publishedAt } =
    route.params;

  // local states
  const [isBookmarked, setIsBookmarked] = useState(false);

  //   refs
  const bookmarkRef = useRef(null);

  //   animated assets for reactions
  const LottiAssets = {
    bookmark: require("../assets/97064-bookmark-icon.json"),
  };

  const reactionHandler = () => {
    console.log(isBookmarked);
    setIsBookmarked(!isBookmarked);
    if (isBookmarked) {
      return bookmarkRef.current?.reset();
    }
    bookmarkRef.current?.play();
  };

  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" animated />
      <ScrollView>
        {/* News image section */}
        <View
          style={{
            display: "flex",
            // justifyContent: "center",
            marginBottom: 100,
            alignItems: "center",
            width: "100%",
            height: 280,
          }}
        >
          <Image
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            source={{ uri: urlToImage }}
          />
          {/* News detail pop */}
          <BlurView
            tint="light"
            intensity={100}
            style={{
              position: "relative",
              zIndex: 100,
              bottom: 100,
              backgroundColor: "#F5F5F5",
              height: 180,
              width: "80%",
              borderRadius: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LinearGradient
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 16,
                opacity: 0.85,
                position: "absolute",
                padding: 16,
              }}
              start={{ x: 0.5, y: 0.5 }}
              colors={["#252525", "#303030", "#707070"]}
            >
              <Text style={{ color: "#FFFFFF" }} variant="bodySmall">
                {transformDate(publishedAt)}
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  lineHeight: 22,
                  fontWeight: 600,
                  paddingVertical: 12,
                }}
                numberOfLines={3}
                variant="titleMedium"
              >
                {title}
              </Text>
              <Text
                numberOfLines={2}
                style={{ color: "#FFFFFF" }}
                variant="bodyMedium"
              >
                Published by{" "}
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16 }}
                  variant="labelLarge"
                >
                  {author}
                </Text>
              </Text>
            </LinearGradient>
          </BlurView>
        </View>

        {/* News descriptions */}
        <View
          style={{
            display: "flex",
            // height: "100%",
            position: "relative",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          {/* News full description here */}
          <View
            style={{
              position: "relative",
              // bottom: 60,
              textAlign: "left",
              paddingHorizontal: 12,
              // backgroundColor: 'red'
            }}
          >
            <Text
              variant="titleMedium"
              style={{ fontSize: 18, textAlign: "left" }}
            >
              London --{" "}
              <Text
                variant="bodyMedium"
                style={{ fontSize: 16, color: "#363434", lineHeight: 24 }}
              >
                {description}
              </Text>
            </Text>

            <Text
              variant="bodyMedium"
              style={{
                fontSize: 16,
                color: "#363434",
                lineHeight: 24,
                paddingTop: 40,
              }}
            >
              {content}
            </Text>
            <IconButton
              icon={() => (
                <LottieView
                  ref={bookmarkRef}
                  style={{ width: 80, height: 80 }}
                  autoPlay={false}
                  loop={false}
                  resizeMode="cover"
                  source={LottiAssets.bookmark}
                />
              )}
              style={{
                backgroundColor: "#050129",
                position: "relative",
                height: 80,
                width: 80,
                borderRadius: 500,
                left: "75%",
                zIndex: 1,
              }}
              onPress={reactionHandler}
            />
            {/* <Button >React</Button> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
