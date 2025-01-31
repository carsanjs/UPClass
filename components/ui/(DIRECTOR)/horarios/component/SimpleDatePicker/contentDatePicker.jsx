import { View, Text, TouchableWithoutFeedback} from "react-native";
import { ColorItem, styles } from "../../../../../styles/StylesGlobal";
import moment from "../../../../../../src/utils/InstanceMoment"
export const RenderDatePicker = ({ item, value, handleDateChange }) => {
     const fecha = moment(item.fecha);
     const isActive = value && fecha.isSame(value, "day");
  return (
    <TouchableWithoutFeedback
    //   key={dateIndex}
      onPress={() => handleDateChange(item.fecha)}
    >
      <View
        style={[
          styles.item,
          {
            backgroundColor: isActive ? ColorItem.KellyGreen : "#fff", // Verde si es activo
            borderColor: isActive ? ColorItem.KellyGreen : "lightgray",
          },
        ]}
      >
        <Text
          style={[
            styles.itemWeekday,
            { color: isActive ? "#fff" : ColorItem.DeepFir }, // Blanco si es activo
          ]}
        >
          {item.dia}
        </Text>
        <Text
          style={[
            styles.itemDate,
            { color: isActive ? "#fff" : "black" }, // Blanco si es activo
          ]}
        >
          {fecha.date()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
