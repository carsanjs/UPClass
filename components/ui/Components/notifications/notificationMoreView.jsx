import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../../src/utils/functiones/functions";
import { ColorItem } from "../../../styles/StylesGlobal";
import { BoxView } from "../../(DIRECTOR)/components/customBoxView";

export const NotificacionView = () => {
  const router = useRoute();
  const { notification } = router.params;
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        <Text style={{ fontWeight: "bold", color: ColorItem.GreenSymphony }}>
          De
        </Text>{" "}
        {capitalizeFirstLetter(notification.nombre_de)}{" "}
        {capitalizeFirstLetter(notification.apellido_de)}.
      </Text>
      <View className="mt-3 flex-col">
        <BoxView
          style={{
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {capitalizeFirstLetter(notification.mensaje)}.
          </Text>
        </BoxView>
        <View
          style={{
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "black",
              }}
            >
              {formatDate(notification.fecha)}.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
