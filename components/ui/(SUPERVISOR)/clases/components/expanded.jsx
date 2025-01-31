import { View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  formatDate,
  formatTimeTo12Hour,
  getFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { StatusCircle } from "../../../../share/StatusCircle/StatusCircle";
import { DateChip } from "../../../../share/datechip/DateChip";

export const ExpandedClassS = ({ data }) => {
  return (
    <View style={
      {
        width: '100%',
        justifyContent:"space-between"
      }
    }>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
           justifyContent:"space-between"
        }}
      >
        <View>
          <Text>
          {capitalizeFirstLetter(getFirstLetter(data.nombre_docente))}{". "}
            {capitalizeFirstLetter(data.apellido_docente)}
          </Text>
        </View>
        <View>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#000000",
            textAlign: "center",
          }}>{truncateText(data.asignatura, 15)}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>
            {data.numero_salon} - {data.categoria}
          </Text>
        </View>
        <View
          style={{
           
            alignItems: "center",
            flexDirection: "row",
          }}
        >
        <Text style={{ fontSize: 13}}>
         {formatTimeTo12Hour(data.hora_inicio)}
          </Text>
          <Text style={{ fontSize: 13 }}>
            {formatTimeTo12Hour(data.hora_fin)}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View>
          <DateChip item={formatDate(data.fecha)} />
        </View>

        <View>
          <StatusCircle item={data.estado} />
        </View>
      </View>
    </View>
  );
};
