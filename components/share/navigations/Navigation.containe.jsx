import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorItem } from "../../styles/StylesGlobal";
const Stack = createNativeStackNavigator();
export function UseNavigationContainer({ screenContainer }) {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => {
        return {
          headerTitleStyle: {
            fontWeight: "black",
            fontSize: 20,
            color: "#fff",
          },
          
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: ColorItem.MediumGreen,
          },
        };
      }}
    >
      {screenContainer.map((screen, index) => {
        return (
          <Stack.Screen
            key={index}
            
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </Stack.Navigator>
  );
}
