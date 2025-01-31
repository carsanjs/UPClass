import { View, Text } from "react-native";
import { truncateText } from "../../../../../src/utils/functiones/functions";

export const ContentHorarioD = ({ item, type }) => {
  const title =
    type === "horarios"
      ? truncateText(item.asignatura, 20)
      : `${truncateText(item.asignatura, 15)}`;
  const subtitle = type === "horarios" ? item.dia : item.dia;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          paddingRight: 30,
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
          {title}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#111111",
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};
