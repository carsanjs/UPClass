import { View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  formatTimeTo12Hour,
} from "../../../../../src/utils/functiones/functions";

export const ExpandedHorarioD = ({ item }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#000000",
              textAlign: "center",
            }}
          >
            {capitalizeFirstLetter(item.asignatura)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginLeft: 10,
        }}
      >
        <Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#000000",
              textAlign: "center",
            }}
          >
            {"Salon: "}
          </Text>
          {item.numero_salon}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginLeft: 10,
        }}
      >
        <Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#000000",
              textAlign: "center",
            }}
          >
            {"Sector: "}
          </Text>
          {item.nombre_salon || item.nombre}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 5,
          marginHorizontal: 8,
          justifyContent: "space-between",
          flexDirection: "row",
          marginLeft: 10,
        }}
      >
        <View>
          <Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                color: "#000000",
                textAlign: "center",
              }}
            >
              {"Dia: "}
            </Text>
            {item.dia}
          </Text>
        </View>
        {item.hora_inicio && item.hora_fin && (
          <View>
            <Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                {"Hora: "}
              </Text>
              {formatTimeTo12Hour(item.hora_inicio)}
              {" - "}
              {formatTimeTo12Hour(item.hora_fin)}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};
