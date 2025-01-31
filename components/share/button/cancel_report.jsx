import { View, TouchableOpacity, Text } from "react-native";
import { ColorItem } from "../../styles/StylesGlobal";

export const BtnCancel_Report = ({ handleCancel, handleSubmit }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "40%",
          alignSelf: "center",
          paddingTop: 8,
        }}
      >
        <TouchableOpacity
          onPress={handleCancel}
          style={{
            width: "91.666667%",
            borderRadius: 8,
            backgroundColor: ColorItem.VividRed,
            alignSelf: "center",
            padding: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "40%",
          alignSelf: "center",
          paddingTop: 8,
        }}
      >
        <TouchableOpacity
        onPress={handleSubmit}
          style={{
            backgroundColor: ColorItem.DeepSkyBlue,
            width: "92%",
            alignSelf: "center",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Reportar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
