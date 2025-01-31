import { View, TouchableOpacity, Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";
import { ColorItem } from "../../../styles/StylesGlobal";

export const _RenderItemDropDown = ({ item, onSelect }) => (
  <View
    style={{
      padding: 5,
    }}
  >
    <TouchableOpacity
      activeOpacity={0.3}
      style={{
        borderEndColor: ColorItem.TarnishedSilver,
        borderBottomWidth: 1,
        justifyContent: "center",
      }}
      onPress={() => onSelect(item)}
    >
      <Text
        style={{
          color: "black",
          fontSize: 18,
          textAlign: "left",
          paddingVertical: 12,
        }}
      >
        {capitalizeFirstLetter(item.label)}
      </Text>
    </TouchableOpacity>
  </View>
);
