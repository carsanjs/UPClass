import { Text, View } from "react-native";
import {
  formatDate,
  formatDuration,
  formatHourHHMMAMPM,
} from "../../../../../src/utils/functiones/functions";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import { BoxView } from "../../components/customBoxView";
import { StatusCircle } from "../../../../share/StatusCircle/StatusCircle";

export const ViewDatePicker = ({ viewSelectDate }) => {
  return (
    <BoxView>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: ColorItem.KellyGreen,
            paddingVertical: 5,
            marginVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Horario{" "}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {" "}
            {formatDate(viewSelectDate.fecha)}{" "}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "medium",
                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: 18,
                }}
              >
                {"Salon: "}
              </Text>
              {viewSelectDate.numero_salon}
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "medium",
                paddingLeft: 10,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: 18,
                }}
              >
                {"Horas: "}
              </Text>
              <Text style={[styles.text]}>
                {formatHourHHMMAMPM(viewSelectDate.hora_inicio)}
              </Text>
              {" - "}
              <Text style={[styles.text]}>
                {formatHourHHMMAMPM(viewSelectDate.hora_fin)}
              </Text>
              <Text style={[styles.text]}>
                {` .${formatDuration(
                  viewSelectDate.hora_inicio,
                  viewSelectDate.hora_fin
                )}`}
              </Text>
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StatusCircle item={viewSelectDate.estado} />
          </View>
        </View>
      </View>
    </BoxView>
  );
};
