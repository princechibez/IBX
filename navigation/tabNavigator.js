import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeNavigatorStack from "./homeNav";
import Bookmarks from "../screens/bookmarks";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarItemStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 0,
          height: "100%",
          width: 50,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#FF3A44",
        tabBarInactiveTintColor: "#A6A6A6",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          // borderRadius: 32,
          height: 90,
          justifyContent: "center",
          width: "90%",
          height: 70,
          alignSelf: "center",
          // bottom: 32,
          elevation: 0,
        },
      })}
    >
      <Tab.Screen
        name="HomeStacks"
        component={HomeNavigatorStack}
        options={({ route }) => ({
          tabBarLabel: "Home",
          headerShown: false,
          // tabBarStyle: {},
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={({ route }) => ({
          // tabBarStyle: {},
          tabBarLabel: "Bookmark",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-bookmark-outline" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
