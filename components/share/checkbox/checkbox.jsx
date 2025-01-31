import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { ColorItem, styles } from "../../styles/StylesGlobal";

const UseListCheckbox = ({
  data,
  onPress,
  selectedOption,
  multipleSelectedItems,
  temporalSelectedItem,
  renderText,
}) => {
  let selectedData;
  if (temporalSelectedItem && temporalSelectedItem[selectedOption]) {
    selectedData = temporalSelectedItem[selectedOption];
  } else if (multipleSelectedItems && multipleSelectedItems[selectedOption]) {
    selectedData = multipleSelectedItems[selectedOption];
  } else {
    selectedData = temporalSelectedItem;
  }
  const isDocente = selectedOption === "docente";
  const selectedId = isDocente ? selectedData?.cedula:selectedData?.id;
  const dataId= isDocente ? data.cedula :data.id;
  
  const isSelected = selectedId === dataId;

  const handleCheckSelected = () => {
    const newValue = !isSelected;
    if (newValue) {
      onPress(data, true);
    } else {
      onPress(data, false);
    }
  };

  return (
    <View style={styles.contenCheckbox}>
      <Checkbox
        tintColors={{ true: ColorItem.DeepFir, false: ColorItem.DeepFir }}
        style={{
          borderRadius: 50,
        }}
        value={isSelected}
        onValueChange={handleCheckSelected}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.textinfo}>{renderText}</Text>
      </View>
    </View>
  );
};
export default UseListCheckbox;
