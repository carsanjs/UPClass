import { View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { Iconcommenting } from "../../../../../assets/icons/IconsGlobal";

export const ContentComentarioD = ({ data }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 15,
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
            {capitalizeFirstLetter(data.nombre_salon)}
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
            {data.numero_salon}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 5,
        }}
      >
        <View
          style={{
            paddingTop: 5,
            width: "80%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <Iconcommenting />
          </View>

          <Text
            style={{
              fontSize: 18,
              color: "#999999",
              textAlign: "center",
            }}
          >
            {truncateText(data.comentario, 15)}
          </Text>
        </View>
      </View>
    </>
  );
};
