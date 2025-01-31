import { Alert } from "react-native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { ColorItem } from "../../../styles/StylesGlobal";
import { useState } from "react";
import { IconLogout } from "../../../../assets/icons/IconsGlobal";

export const handleLogout = (logout) => {
  Alert.alert(
    "Confirmación de Cierre de Sesión",
    "¿Estás seguro de que deseas cerrar sesión?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            Alert.alert("Cerrando sesión......... Nos vemos pronto 👋");
            await logout();
          } catch (error) {
            console.error("Error durante el cierre de sesión:", error);
          }
        },
      },
    ],
    { cancelable: true }
  );
};

export const ButtonLogout = ({ title = "Cerrar Sesión", onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <TouchableOpacity style={[styles.button,{
        backgroundColor: isPressed? ColorItem.DeepFir : "white",
      }]} 
        onPressIn={() => setIsPressed(true)} 
        onPressOut={() => setIsPressed(false)}
        onPress={onPress}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IconLogout/>
            <Text style={[styles.text,{
                  color:  ColorItem.DeepFir,
            }]}>{title}</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth:0.9,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderRadius: 4,
    alignItems:"center",
  },
  text: {
    paddingHorizontal: 16,
    fontSize: 17,
    alignItems: "center",
    textTransform: "uppercase",
    fontFamily: "Poppins_600SemiBold",
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
