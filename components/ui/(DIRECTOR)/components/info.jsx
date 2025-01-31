import { Text, View } from "react-native";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";
import { styles } from "../../../styles/StylesGlobal";

export const InfoDS = ({ selectedItem }) => {
  return (
    <View 
    style={{
      backgroundColor:"#fafbfd",
      width:"100%",
      borderRadius:8,
      padding:12,
      shadowColor: "rgba(0, 0, 0, 0.15)", 
      shadowOffset: { width: 0, height: 25 },
      shadowOpacity: 0.15, 
      shadowRadius: 25, 
    }}
    className="bg-white shadow-2xl rounded-lg p-3 w-full">
      <Text style={[styles.Title1]}>Nombre y apellido</Text>
      <Text style={[styles.text]}>
        {capitalizeFirstLetter(selectedItem.nombre)}{" "}
        {capitalizeFirstLetter(selectedItem.apellido)}
      </Text>
      <Text style={[styles.Title1]}>Cédula</Text>
      <Text style={[styles.text]}> {selectedItem.cedula}</Text>
      <Text style={[styles.Title1]}>Correo</Text>
      <Text style={[styles.text]}>{selectedItem.correo}</Text>
    </View>
  );
};