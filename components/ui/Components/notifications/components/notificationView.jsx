import { Text, TouchableOpacity, View ,Image} from "react-native";
import {
  truncateText,
  capitalizeFirstLetter,
  DatesYYYYMMDD,
} from "../../../../../src/utils/functiones/functions";
import { useNavigation } from "@react-navigation/native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { IconCheckDone } from "../../../../../assets/icons/IconsGlobal";

export const NotificationView = ({ item, handleUpdateStatus }) => {
  const navigation = useNavigation();

  const handlePressNotification = (item) => {
    handleUpdateStatus(item);
    navigation.navigate("NotificationView", { notification: item });
  };

  return (
    <TouchableOpacity
      onPress={() => handlePressNotification(item)}
      style={{
        borderBottomWidth: 1,
        borderColor: "#e1e1e1",
        paddingBottom: 8,
        backgroundColor: item.estado === "leida" ? "#fff" : "#c5daff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            height: "100%",
            paddingTop: 8,
            alignItems: "center",
          }}
        >
          <Image
             style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              borderRadius: 30,
              overflow: "hidden",
              
             }}
             borderRadius={50}
            source={require("../../../../../assets/webp/teacher.webp")}
          />
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                padding: 5,
                fontSize: 16,
                fontWeight: "bold",
                color: ColorItem.DeepFir,
              }}
            >
              {capitalizeFirstLetter(item.nombre_de)}{" "}
              {capitalizeFirstLetter(item.apellido_de)}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingBottom: 10,
                paddingLeft: 5,
              }}
            >
              {truncateText(item.mensaje, 50)}
            </Text>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "40%",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#888",
                    fontWeight: "700",
                    paddingLeft: 6,
                  }}
                >
                  {DatesYYYYMMDD(item.fecha)}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  padding: 5,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {item.estado && item.estado === "leida" ? (
                  <IconCheckDone />
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
