import { View, Text } from "react-native";
import { capitalizeFirstLetter, formatDate } from "../../../../../src/utils/functiones/functions";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import { BoxView } from "../../components/customBoxView";
import { StatusCircle } from "../../../../share/StatusCircle/StatusCircle";
export const ItemReporteId = ({selectedItem}) => {
  return (
    <BoxView
    >
       <View>
        <Text style={[styles.Title1]}>Asignatura</Text>
        <Text style={[styles.text]}>
         {selectedItem?.asignatura}
        </Text>
      </View>

      <View>
        <Text style={[styles.Title1]}>Docente</Text>
        <Text style={[styles.text]}>
          {capitalizeFirstLetter(selectedItem?.nombre)}{" "}
          {capitalizeFirstLetter(selectedItem?.apellido)}
        </Text>
      </View>
      <View>
        <Text style={[styles.Title1]}>Salon</Text>
        <Text style={[styles.text]}>
          {selectedItem?.numero_salon}
          {" - "}
          {capitalizeFirstLetter(selectedItem?.nombre_salon)}
        </Text>
      </View>
      <View>
        <Text style={[styles.Title1]}>Comentario</Text>
     <View style={{
      flexDirection:"row",
      width:"100%",
      justifyContent:"space-around"
     }}>
     <View style={{
        flexDirection:"column",
      }}>
      <Text style={[styles.comentario]}>
          {capitalizeFirstLetter(selectedItem?.comentario)}
        </Text>
        <Text 
         style={{
         
          fontSize:14,
          fontWeight:"900",
          color:ColorItem.TarnishedSilver
         }}
        
        >
          {formatDate(selectedItem?.fecha)}
        </Text>
      </View>
      <View>
           <StatusCircle item={selectedItem?.estado}/>
      </View>
     </View>

      </View>
    </BoxView>
  );
};
