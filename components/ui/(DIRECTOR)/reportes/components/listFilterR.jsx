import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { Iconcommenting } from "../../../../../assets/icons/IconsGlobal";
import { ColorItem } from "../../../../styles/StylesGlobal";

export const ListReport = ({ data }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <ListItem.Title style={styles.itemP2}>
            {capitalizeFirstLetter(data.nombre)}{" "}
            {capitalizeFirstLetter(data.apellido)}
          </ListItem.Title>
        </View>
        <View>
          <Text style={styles.itemP2}>{data.numero_salon}</Text>
        </View>
      </View>
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Iconcommenting size={20} color={ColorItem.TarnishedSilver} />

        <Text
          style={{
            paddingLeft: 8,
            fontSize: 17,
            color: "#999999",
            textAlign: "center",
          }}
        >
          {truncateText(data.comentario, 20)}
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  itemP2: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});
