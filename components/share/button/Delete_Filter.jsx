import { View } from "react-native";
import { Reset_Filter } from "./reset_filter";
import { ColorItem } from "../../styles/StylesGlobal";

export const BtnDeleteFilter = ({
  multipleSelectedItem,
  selectedOption,
  removeFilter,
  handleFilter,
}) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        flexDirection:
          multipleSelectedItem[selectedOption] &&
          Object.keys(multipleSelectedItem[selectedOption]).length > 0
            ? "row"
            : "column",
      }}
    >
      <View
        style={{
          width:
            multipleSelectedItem[selectedOption] &&
            Object.keys(multipleSelectedItem[selectedOption]).length > 0
              ? "50%"
              : "",
          paddingHorizontal: 5,
        }}
      >
        {multipleSelectedItem[selectedOption] &&
          Object.keys(multipleSelectedItem[selectedOption]).length > 0 && (
            <Reset_Filter
              backgroundColor={ColorItem.TarnishedSilver}
              title="Borrar filtros"
              colorText="#151515"
              onPress={() => removeFilter(selectedOption)}
            />
          )}
      </View>

      <View
        style={{
          width:
            multipleSelectedItem[selectedOption] &&
            Object.keys(multipleSelectedItem[selectedOption]).length > 0
              ? "50%"
              : "100%",
          paddingHorizontal: 5,
        }}
      >
        <Reset_Filter
          backgroundColor={ColorItem.MediumGreen}
          title="Filtrar"
          colorText="white"
          onPress={handleFilter}
        />
      </View>
    </View>
  );
};


export const BtnDeleteFilterReporte = ({selectedItem, handleCloseSelectOption,applyFilter}) =>{
  return (
    <View
               style={{
                 paddingVertical: 15,
                 flexDirection: selectedItem ? "row" : "column",
               }}
             >
               <View
                 style={{
                   width: selectedItem ? "50%" : "",
                   paddingHorizontal: 5,
                 }}
               >
                 {selectedItem && (
                   <Reset_Filter
                     backgroundColor={ColorItem.TarnishedSilver}
                     title="Borrar filtros"
                     colorText="#151515"
                     onPress={handleCloseSelectOption}
                   />
                 )}
               </View>
   
               <View
                 style={{
                   width: selectedItem ? "50%" : "100%",
                   paddingHorizontal: 5,
                 }}
               >
                 <Reset_Filter
                   backgroundColor={ColorItem.MediumGreen}
                   title="Filtrar"
                   colorText="white"
                   onPress={applyFilter}
                 />
               </View>
             </View>
  );
}
