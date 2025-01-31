import { Text, StyleSheet } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";

export const ViewSalones = ({ item }) => {
  return (
    <>
      <Text style={styles.viewClass}>
        {capitalizeFirstLetter(item.nombre)}
        {" - "}
      </Text>
      <Text style={styles.viewClass}>{item.numero_salon}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  viewClass: {
    fontSize: 16,
    fontWeight: "800",
  },
});
