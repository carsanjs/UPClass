import { View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  formatTimeTo12Hour,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { ColorItem } from "../../../../styles/StylesGlobal";
export const ExpadedReport = ({ data, isComentario }) => {
  return (
      <View >

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
              color: ColorItem.DeepFir,
            }}
          >
            {capitalizeFirstLetter(data.nombre_docente)}{" "}
            {capitalizeFirstLetter(data.apellido_docente)}{" "}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: ColorItem.DeepFir,
          }}
        >
          {truncateText(data.asignatura, 30)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: ColorItem.DeepFir,
              }}
            >
              Salon:
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {data.numero_salon}
               {/* - {truncateText(data.nombre_salon, 15)} */}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",

            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: ColorItem.DeepFir,
            }}
          >
            Sector:
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {capitalizeFirstLetter(data.nombre_salon)}
          </Text>
        </View>
       
        <View
          style={{

            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: ColorItem.DeepFir,
            }}
          >
            Horario:
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {formatTimeTo12Hour(data.hora_inicio)} - {formatTimeTo12Hour(data.hora_fin)}
          </Text>
        </View>
       
        {isComentario && (
          <View
          style={{

            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: ColorItem.DeepFir,
            }}
          >
            Comentario:
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {capitalizeFirstLetter(data.comentario)}
          </Text>
        </View>
        )}

      </View>
  );
};
