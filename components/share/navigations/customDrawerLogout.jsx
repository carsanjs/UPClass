import { Text, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth } from "../../../src/hooks/use/useAuth";
import { ButtonLogout, handleLogout } from "../../ui/Components/logout/logout";

const DrawerContent = ({ user }) => {
  return (
    <ImageBackground
      style={{ padding: 20 }}
      source={require("../../../assets/img/fondoazulmobil.jpg")}
    >
      <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
        {user.nombre} {user.apellido}
      </Text>
      <Text style={{ fontSize: 16, color: "#FFFFFF" }}>{user.user}</Text>
    </ImageBackground>
  );
};

export const CustomDrawerContent = (props) => {
  const { user, logout } = useAuth();
  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerContent user={user} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <ButtonLogout onPress={() => handleLogout(logout)} />
    </>
  );
};
