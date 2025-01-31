import { useState } from "react";
import { useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FilterNotRead, NotificationAll } from "./tabViewFilter";
import { ColorItem, styles } from "../../../styles/StylesGlobal";

const renderScene = SceneMap({
  first: NotificationAll,
  tree: FilterNotRead,
});
export default function Notification() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Todas" },
    { key: "tree", title: "No leidas" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={{
        backgroundColor: ColorItem.MediumGreen,
      }}
      labelStyle={styles.label}
      renderLabel={({ route, focused }) => (
        <Text
          style={[
            styles.label,
            { color: focused ? "#fff" : ColorItem.OceanCrest },
            { fontWeight: focused ? "bold" : "300" },
            { width: 70 },
            { fontSize: focused ? 16 : 15 },
          ]}
        >
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
