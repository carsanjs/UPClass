import { TouchableOpacity, Text, View } from "react-native";
import { ColorItem } from "../../styles/StylesGlobal";

export const SubmitButton = ({ editing = false, onPress, isDisabled }) => {

  const backgroundColor = !editing
  ? ColorItem.KellyGreen
  : isDisabled
  ? ColorItem.TarnishedSilver
  : ColorItem.GoldOre;
  
  return (
    <View style={{
      width: "94%",
    paddingTop: 12,
    alignSelf: "center",
    }}>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onPress}
        style={{
          backgroundColor: backgroundColor,
          width: "91.666%", 
          alignSelf: "center",
          padding: 11,
          borderRadius: 10,
        }}
      >
        <Text style={{
           color: "#ffffff", 
           textAlign: "center",
           fontWeight: "bold",
           fontSize: 20,
        }}>
          {!editing ? "Registrar" : "Actualizar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
