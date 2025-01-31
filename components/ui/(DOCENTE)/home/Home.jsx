import { View } from "react-native";
import { CardInformationCuenta } from "./component/cardsIndex";
import { ListViewScreen } from "./component/viewScreen";
import { useNavigation } from "@react-navigation/native";
import {
  IconCalendar,
  IconClassRoom,
  Iconcommenting,
} from "../../../../assets/icons/IconsGlobal";
import { ButtonLogout, handleLogout } from "../../Components/logout/logout";
import { useAuth } from "../../../../src/hooks/use/useAuth";

export const DashboardDocente = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  const COLORWHITE = "white";
  const screen = [
    {
      title: "Clases",
      icon: <IconClassRoom color={COLORWHITE} />,
      action: () => navigation.navigate("Clases"),
    },
    {
      title: "Horarios",
      icon: <IconCalendar size={25} color={COLORWHITE} />,
      action: () => navigation.navigate("Horarios"),
    },
    {
      title: "Comentarios",
      icon: <Iconcommenting color={COLORWHITE} />,
      action: () => navigation.navigate("Comentarios"),
    },
  ];

  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View>
        <CardInformationCuenta />
        <ListViewScreen screen={screen} />
      </View>
      <ButtonLogout onPress={() => handleLogout(logout)} />
    </View>
  );
};
