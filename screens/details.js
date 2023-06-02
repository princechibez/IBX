import React, { useCallback, useRef, useState } from "react";
import { View, Image } from "react-native";
import { ActivityIndicator, Button, IconButton, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import Toast from "react-native-root-toast";
import { connect } from "react-redux";

import * as actions from "../stateManager/actions";
import transformDate from "../utilities/dateTransformer";
import { useEffect } from "react";

const Details = (props) => {
  // get all properties needed from the nav params
  const { author, content, description, urlToImage, title, publishedAt } =
    props.route.params;

  const toastConfigs = {
    duration: Toast.durations.SHORT,
    animation: true,
    hideOnPress: true,
    delay: 0,
  };

  // local states
  const [isBookmarked, setIsBookmarked] = useState(false);

  //   refs
  const bookmarkRef = useRef(null);

  //   animated assets for reactions
  const LottiAssets = {
    bookmark: require("../assets/97064-bookmark-icon.json"),
  };

  useEffect(() => {
    if (
      props.bookmarks.includes({
        author,
        content,
        description,
        urlToImage,
        title,
        publishedAt,
      })
    ) {
      setIsBookmarked(true);
    }
  }, []);

  const bookmarkHandler = useCallback(
    async (toastMessage) => {
      const focusedNews = {
        author,
        content,
        description,
        urlToImage,
        title,
        publishedAt,
      };
      if (!isBookmarked) {
        props.addToBookmarks(focusedNews);
        bookmarkRef.current?.play();
        Toast.show(toastMessage, toastConfigs);
      } else {
        props.deleteFromBookmarks(focusedNews);
        bookmarkRef.current?.reset();
        Toast.show(toastMessage, toastConfigs);
      }
    },
    [isBookmarked, props.bookmarks]
  );

  const reactionHandler = () => {
    setIsBookmarked(!isBookmarked);
    if (isBookmarked) {
      bookmarkHandler("Removed from Bookmarks");
    }
    bookmarkHandler("Added to Bookmarks");
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
            <Button
              icon={() =>
                props.loading ? (
                  <ActivityIndicator animate size={30} />
                ) : (
                  <LottieView
                    ref={bookmarkRef}
                    style={{ width: 80, height: 80 }}
                    autoPlay={false}
                    loop={false}
                    resizeMode="cover"
                    source={LottiAssets.bookmark}
                  />
                )
              }
              mode="outlined"
              style={{
                // backgroundColor: "#050129",
                marginVertical: 24,
                alignSelf: 'center',
                position: "relative",
                height: 80,
                width: "80%",
                borderRadius: 8,
                // left: "75%",
                zIndex: 1,
              }}
              onPress={reactionHandler}
            >Add to Bookmarks</Button>
            {/* <Button >React</Button> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmark.bookmarks,
    loading: state.news.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToBookmarks: (news) => dispatch(actions.addToBookmarks(news)),
    deleteFromBookmarks: (news) => dispatch(actions.deleteFromBookmark(news)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
