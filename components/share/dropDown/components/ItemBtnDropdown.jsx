import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  capitalizeFirstLetter,
  getColorStatus,
  truncateText,
} from "../../../../src/utils/functiones/functions";
import { useRef } from "react";
import { ColorItem } from "../../../styles/StylesGlobal";

export const ItemBtnDropdown = ({
  Onpress,
  expanded,
  valuee,
  placeholder,
  error,
  toLowercase = false,
}) => {
  const buttonRef = useRef(null);
  const CStatus = toLowercase ? getColorStatus(valuee, placeholder) : "#fff";
  const Ctext = toLowercase ? "#fff" : "black";

  return (
    <View
      style={{
        marginTop: 20,

        paddingVertical: 10,
      }}
    >
      <TouchableOpacity
        ref={buttonRef}
        style={[
          styles.button,
          {
            backgroundColor: CStatus,
            borderColor: error ? ColorItem.VividRed : ColorItem.TarnishedSilver,
          },
        ]}
        activeOpacity={0.8}
        onPress={Onpress}
      >
        <Text
          style={{
            color: Ctext,
            fontSize: 18,
            fontWeight: "semibold",
          }}
        >
          {capitalizeFirstLetter(truncateText(valuee, 20)) || placeholder}
        </Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    padding:15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
  },
});
