import { View, Text } from "react-native";
import { Divider } from "@rneui/themed";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { styles } from "../../../../styles/StylesGlobal";
import {
  IcontvOff,
  IcontvOn,
  IconWifi,
} from "../../../../../assets/icons/IconsGlobal";

export const InfoSalones = ({ selectedItem }) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: "100%",
      }}
    >
      <Text style={[styles.Title1]}>Nombre Salon</Text>
      <Text style={[styles.text]}>
        {capitalizeFirstLetter(selectedItem.nombre)}
      </Text>
      <Text style={[styles.Title1]}> # Salon</Text>
      <Text style={[styles.text]}>{selectedItem.numero_salon}</Text>
      <Text style={[styles.Title1]}>Conectividad digital</Text>
      <View style={styles.vertical}>
        {selectedItem.INTernet === "si" ? (
          <IconWifi type="wifi" size={24} color="black" />
        ) : (
          <IconWifi type="wifi-off" size={24} color="black" />
        )}
        <Text style={[styles.text]}>
          {capitalizeFirstLetter(selectedItem.INTernet)}
        </Text>
        <Divider orientation="vertical" width={5} />
        {selectedItem.tv === "si" ? (
          <IcontvOn size={24} color="black" />
        ) : (
          <IcontvOff size={24} color="black" />
        )}
        <Text style={[styles.text]}>
          {capitalizeFirstLetter(selectedItem.tv)}
        </Text>
      </View>
      <Text style={[styles.Title1]}>Categoría</Text>
      <Text style={[styles.text]}>
        {capitalizeFirstLetter(selectedItem.categoria)}
      </Text>
    </View>
  );
};
