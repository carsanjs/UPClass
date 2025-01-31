import { View, Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { IconCalendar } from "../../../../../assets/icons/IconsGlobal";

export const ContentReportS = ({data}) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
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
            {capitalizeFirstLetter(data.nombre_docente || data.nombre)}{" "}
            {capitalizeFirstLetter(data.apellido_docente || data.apellido)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></View>
      <View
        style={{
          marginBottom: 5,
        }}
      >
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <IconCalendar/>
          <Text
            style={{
              fontSize: 18,
              color: "#444444",
              textAlign: "center",
              marginLeft: 10,
            }}
          >
            {data.fecha.substring(0, 10)}
          </Text>
        </View>
      </View>
    </>
  );
};
