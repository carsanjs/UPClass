import { View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { Iconcommenting } from "../../../../../assets/icons/IconsGlobal";

export const ExpandedComentD = ({ data }) => {
  return (
    <View style={{
      width:"100%"
    }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "#000000",
                textAlign: "center",
              }}
            >
              Categoria:{" "}
            </Text>
            {capitalizeFirstLetter(data.nombre_salon)}
          </Text>
        </View>
        <View
          style={{
            width: "50%",
          }}
        >
          <Text>
          <Text style={{
             fontWeight: "bold",
                 fontSize: 16,
                 color: "black",
                 textAlign: "center",
          }}> Salon : </Text>
          
          {truncateText(data.numero_salon)}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingVertical:5,
          flexDirection: "column",
        }}
      >
         <View style={{
          alignItems:"center",
          flexDirection:"row"
         }}>
         <View style={{marginHorizontal:5}}><Iconcommenting/></View>
    
    <Text>{data.comentario}</Text>
         </View>
     
        <View
          style={{
            padding: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              color: "#999999",
            }}
          >
            {data.fecha || "Sin registro de fecha"}
          </Text>
        </View>
      </View>
    </View>
  );
};
