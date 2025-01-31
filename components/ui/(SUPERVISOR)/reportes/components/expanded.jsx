import { View, Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { Iconchat } from "../../../../../assets/icons/IconsGlobal";

export const ExpandedReportS = ({ data }) => {
  return (
    <>
      <View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: "#000000",
              fontSize: 16,
            }}
          >
            {data.asignatura}
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 3,
          }}
        >
          <Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: 16,
              }}
            >
              {"Sector: "}
            </Text>
            {capitalizeFirstLetter(data.nombre_salon)}
          </Text>

          <Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: 16,
              }}
            >
              {"Salon: "}
            </Text>
            {data.numero_salon}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <Iconchat />
        <View
          style={{
            paddingTop: 2,
            paddingLeft: 5,
            color: "#444444",
          }}
        >
          <Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: 16,
              }}
            >
              {" Comentario: "}
            </Text>
            {data.comentario}
          </Text>
        </View>
      </View>
    </>
  );
};
