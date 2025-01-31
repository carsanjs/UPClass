import { createStackNavigator } from "@react-navigation/stack";
import { ColorItem } from "../../../styles/StylesGlobal";

const Stack = createStackNavigator();
const CustomStack = ({ initialRouteName, screens }) => {

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={({ navigation, route }) => {
            return {
              presentation:"card",
              detachPreviousScreen:false,
              cardStyle:{backgroundColor:"#fff"},
              title: screen.title,
              headerTitleAlign: "left",
              headerShown: screen.options?.headerShow !== false,
              headerStyle: {
                backgroundColor:"#fff",
              },
              headerTintColor:ColorItem.DeepFir,
              headerTitleStyle: {
                fontWeight:"900",
                fontSize:20,
                color: ColorItem.DeepFir,
              },
              headerRight: screen.headerRight
              ? () => screen.headerRight(navigation)
              : null,
            };
          }}
        />
      ))}
    </Stack.Navigator>
  );
};
export default CustomStack;
