import { Text } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";

export const ViewHorario = ({ item }) => {
  return (
    <>
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
      }}>
        {capitalizeFirstLetter(item.nombre)}{" "}
        {capitalizeFirstLetter(item.apellido)}
        {" - "}
      </Text>
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
      }}>
        {item.asignatura
          ? truncateText(item.asignatura)
          : "Asignatura no disponible"}
      </Text>
    </>
  );
};
