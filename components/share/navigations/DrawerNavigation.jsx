import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { CustomDrawerContent } from "./customDrawerLogout";
import HeaderLeft from "../headerhomeLeft";
import { DrawerActions } from "@react-navigation/native";
import { ColorItem } from "../../styles/StylesGlobal";

export const DrawerHome = ({ drawerScreens, initialRouteName }) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => {
        const currentRouteName =
          navigation.getState()?.routes[navigation.getState().index]?.name;
        const viewHeaderHome = () => {
          if (currentRouteName === initialRouteName) {
            return true;
          } else return false;
        };
        return {
          headerShown: viewHeaderHome() ? false : true,
          drawerActiveTintColor: "#ffffff",
          drawerActiveBackgroundColor: ColorItem.MediumGreen,
          drawerInactiveBackgroundColor: ColorItem.Zircon,
          drawerStyle: {
            width: "80%",
          },
          drawerItemStyle: {
            borderRadius: 4,
            marginVertical: 2,
          },
          drawerLabelStyle: { fontSize: 17 },
          headerStyle: { backgroundColor: ColorItem.MediumGreen },
          headerTitleStyle: { color: "#fff" },
          headerLeft: () => {
            return (
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
              />
            );
          },
        };
      }}
    >
      {drawerScreens.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Drawer.Navigator>
  );
};
