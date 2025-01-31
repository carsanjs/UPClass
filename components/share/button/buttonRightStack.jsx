import { StyleSheet, TouchableOpacity } from "react-native";
import { ColorItem } from "../../styles/StylesGlobal";

export default function Buttonright({ icon:IconComponent, navigation, router }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(router)} style={styles.btnright}>
      <IconComponent />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btnright: {
    marginRight: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: ColorItem.MediumGreen,
  },
});
