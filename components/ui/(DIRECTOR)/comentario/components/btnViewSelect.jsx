import { TouchableOpacity, Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";

export const BtnViewSelect = ({ item }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {capitalizeFirstLetter(item.nombre)}
        {" - "}
        {item.numero_salon}
        {" - "} {item.salon_nombre || item.nombre_salon}
      </Text>
    </TouchableOpacity>
  );
};
