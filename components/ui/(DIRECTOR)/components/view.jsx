import { Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";

export const ViewDS = ({ item }) => {
  return (
    <>
      <Text
        style={{
          fontWeight: "900",
          fontSize: 16,
        }}
      >
        {capitalizeFirstLetter(item.nombre)}{" "}
      </Text>
      <Text
        style={{
          fontWeight: "900",
          fontSize: 16,
        }}
      >
        {capitalizeFirstLetter(item.apellido)}
      </Text>
    </>
  );
};
