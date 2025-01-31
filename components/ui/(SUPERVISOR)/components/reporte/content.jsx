import { Text, View } from "react-native";
import {
  formatDate,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { StatusCircle } from "../../../../share/StatusCircle/StatusCircle";

export const ContentReport = ({ data }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          paddingVertical:8,
          flexDirection: "column",
          width:"85%",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {truncateText(data.asignatura, 26)}
        </Text>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {formatDate(data.fecha)}
        </Text>
      </View>

      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <StatusCircle item={data.estado} />
      </View>
    </View>
  );
};
