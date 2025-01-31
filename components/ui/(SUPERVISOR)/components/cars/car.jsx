import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  capitalizeFirstLetter,
  formatDate,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { useState } from "react";
import { IconClassRoom } from "../../../../../assets/icons/IconsGlobal";

import { useNavigation } from "expo-router";
export const CarItemList = ({ item }) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();
  
  const handlePress = (data) => {
    navigation.preload('RegistrarReporte', { data });
    navigation.navigate('RegistrarReporte', { data });
  };
  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleItemPress = () => {
    setIsPressed(true);
    handlePress(item);
    setIsPressed(false);
  };

  return (

    <TouchableOpacity
    style={([styles.card],{
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
      width: "100%",
      backgroundColor: isPressed ? ColorItem.OceanCrest : "white",
    })}
    onPress={handleItemPress}
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}
  >
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 8,
      }}
    >
      <IconClassRoom size={40}
        color={ColorItem.GreenSymphony} />
    </View>

    <View
      style={{
        width: "75%",
      }}
    >
      <View
        style={{
          paddingVertical: 4,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.fontZise]}>
          {capitalizeFirstLetter(item.nombre_docente)}{" "}
          {capitalizeFirstLetter(item.apellido_docente)}
        </Text>
        {item.comentario && item.comentario.length > 0 ? (
          <View>
            <MaterialCommunityIcons
              style={{
                marginTop: 3,
                marginHorizontal: 10,
              }}
              name="read"
              size={22}
              color="black"
            />
          </View>
        ) : null}
      </View>
      <View
        style={{
          paddingVertical: 4,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "#000000",
              fontWeight: "500",
            }}
          >
            {truncateText(item.asignatura, 15)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={[styles.fontZise14]}>
            {item.numero_salon} {" · "}
          </Text>
          <Text style={[styles.fontZise14]}>
            {capitalizeFirstLetter(item.categoria)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#000000",
            fontWeight: "500",
          }}
        >
          {formatDate(item.fecha)}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 13, marginRight: 10 }}>
            {new Date(
              `${item.fecha.split("T")[0]}T${item.hora_inicio}`
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={{ fontSize: 13 }}>
            {new Date(
              `${item.fecha.split("T")[0]}T${item.hora_fin}`
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    marginVertical: 1,
    justifyContent: "center",
    borderBottomWidth: 10,
    borderColor: "black",
    alignItems: "center",
    marginHorizontal: 1,
  },
  subtitle: {
    color: "#181D31",
    fontWeight: "bold",
  },

  fontZise: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  fontZise14: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
});
