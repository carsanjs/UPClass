import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ColorItem } from "../../styles/StylesGlobal";
import HeaderRight from "../headerhomeRigth";
import { capitalizeFirstLetter } from "../../../src/utils/functiones/functions";
import { userData } from "../../../src/hooks/use/userData";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import HeaderLeft from "../headerhomeLeft";
import { DrawerActions } from "@react-navigation/native";

export const TabsHome = ({
  tabsConfig,
  initialRouteName,
  activeTinColor = "#ffffff",
}) => {
const {ROL} = userData();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route, navigation }) => {
        return {
          headerStyle:{
            backgroundColor: ColorItem.MediumGreen,
          },
          tabBarStyle: {
            shadowColor: "black",
            shadowOpacity: 0.25,
            backgroundColor: ColorItem.MediumGreen,
          },
          tabBarActiveTintColor: activeTinColor,
          tabBarInactiveTintColor: ColorItem.DeepFir,
          tabBarShowLabel: false,
          headerTitleStyle:{
          color:"#fff",
            fontWeight: "bold",
            fontSize:20,
          },
          headerRight: () => {
              return route.name === initialRouteName ? (
                <HeaderRight
                  rol={capitalizeFirstLetter(ROL)}
                  navigation={navigation}
                />
              ) : null;
            },
               headerLeft: () => {
                return ROL === "director" ?
                <HeaderLeft
                onPress={() => {
                  navigation.dispatch(DrawerActions.openDrawer());
                }}
                icon={
                  <FontAwesome6
                    name="bars-staggered"
                    size={30}
                    color="#ffffff"
                  />
                }
              /> : null
                      },
        };
      }}
    >
      {tabsConfig.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
};
