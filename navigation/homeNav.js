import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import Details from "../screens/details";
// import Search from "../screens/search";

const HomeNavigatorStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Search"
        component={Search}
        options={({ route }) => ({
          title: "Search News",
        })}
      /> */}
      <Stack.Screen
        name="Details"
        component={Details}
        options={({ route }) => ({
          title: route.params?.author,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigatorStack;
