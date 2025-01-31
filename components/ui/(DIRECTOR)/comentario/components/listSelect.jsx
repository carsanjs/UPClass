import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";

export const ListSelectItem = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      style={styles.optionItem}
    >
      <View style={styles.itemInfo}>
        {selectedOption === "docente" && (
          <Text
            style={{
              color: "black",
              fontSize: 16,
              textAlign: "left",
              paddingVertical: 8,
            }}
          >
            {capitalizeFirstLetter(data.nombre)}{" "}
            {capitalizeFirstLetter(data.apellido)}
          </Text>
        )}
        {selectedOption === "salon" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "left",
                paddingVertical: 8,
              }}
            >
              {data.numero_salon} {"-"} {truncateText(data.nombre, 13)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
