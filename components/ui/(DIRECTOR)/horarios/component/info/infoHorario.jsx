import { Text, View } from "react-native";
import { capitalizeFirstLetter } from "../../../../../../src/utils/functiones/functions";
import { styles } from "../../../../../styles/StylesGlobal";
import { BoxView } from "../../../components/customBoxView";
export const InfoHorario = ({ selectedItem }) => {
  return (
    <BoxView
      style={{
        padding: 12,
      }}
    >
      <View>
        <Text style={[styles.Title1]}>Asignatura Asignada</Text>
        <Text style={[styles.asignatura]}>
          {capitalizeFirstLetter(selectedItem.asignatura)}
        </Text>
      </View>
      <View>
        <Text style={[styles.Title1]}>Docente</Text>
        <Text style={[styles.text]}>
          {capitalizeFirstLetter(selectedItem?.nombre)}{" "}
          {capitalizeFirstLetter(selectedItem?.apellido)}
        </Text>
      </View>
    </BoxView>
  );
};
