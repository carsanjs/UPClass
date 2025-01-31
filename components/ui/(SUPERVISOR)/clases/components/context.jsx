import { View, Text, StyleSheet } from "react-native";
import {
  capitalizeFirstLetter,
  getFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";

export const ContentClasS = ({ data }) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <View
        style={{
          paddingRight: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#000000",
            textAlign: "center",
          }}
        >
          {capitalizeFirstLetter(getFirstLetter(data.nombre_docente))}
          {". "}
          {capitalizeFirstLetter(data.apellido_docente)}
        </Text>
      </View>

      <Text
        style={[
          styles.itemP2,
          {
            paddingRight: 15,
          },
        ]}
      >
        {truncateText(data.asignatura, 10)}
      </Text>
      <Text style={styles.itemP2}>{data.fecha.substring(0, 10)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemP2: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
});
