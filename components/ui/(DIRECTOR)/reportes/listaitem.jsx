import { TouchableOpacity, View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../src/utils/functiones/functions";
import { styles } from "../../../styles/StylesGlobal";
import { DateChip } from "../../../share/datechip/DateChip";

const ListItem = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionItem}>
      <View style={styles.itemInfo}>
        {selectedOption === "salones" && (
          <Text 
          style={{
            color: 'black',
            fontSize: 18,
            textAlign: 'left',
            paddingVertical:8
          }}
          >
            {data.numero_salon} {"-"} {capitalizeFirstLetter(data.nombre)}
          </Text>
        )}
        {selectedOption === "clases" && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
              
              style={{
                color: 'black',
                fontSize: 18,
                textAlign: 'left',
                paddingVertical:8
              }}
              >
                {truncateText(data.asignatura, 15)} {"-"} {data.numero_salon}
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <DateChip item={new Date(data.fecha).toLocaleDateString()} />
              </View>
            </View>
            <Text 
            style={{
              color: 'black',
              fontSize: 18,
              textAlign: 'left',
              paddingVertical:8
            }}
            >
              {capitalizeFirstLetter(data.docente_nombre)}{" "}
              {capitalizeFirstLetter(data.docente_apellido)}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ListItem;
