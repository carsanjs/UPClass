
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  formatDuration,
  formatTimeTo12Hour,
} from "../../../../../../src/utils/functiones/functions.js";
import {memo, useState } from "react";
import { StatusCircle } from "../../../../../share/StatusCircle/StatusCircle.jsx";

const RenderAgenItem = memo(({ item }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: isPressed ? "lightblue" : "#fff",
        },
      ]}
      key={item.keyunica}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View>
        <Text style={styles.itemText}>
          <Text style={styles.titleBold}>Sector: </Text>
          {item.numero_salon}{" "}
        </Text>

        <View style={{ paddingVertical: 5, flexDirection: "row", width: "100%" }}>
          <Text style={styles.itemText}>
            <Text style={styles.titleBold}>Horas: </Text>
            {formatTimeTo12Hour(item.hora_inicio)} {" - "}{" "}
            {formatTimeTo12Hour(item.hora_fin)}
            <Text style={{ paddingHorizontal: 10, fontSize: 12 }}>
              {" ."} {formatDuration(item.hora_inicio, item.hora_fin)}
            </Text>
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 10 }}>
        <StatusCircle item={item.estado} />
      </View>
    </TouchableOpacity>
  );
});

RenderAgenItem.displayName = "RenderAgenItem";
export default RenderAgenItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    item: {
      flex: 1,
      borderRadius: 5,
      padding: 8,
      flexDirection:"row",
      marginHorizontal: 10,
      alignItems: "center",
      marginTop: 10,
      paddingBottom: 8,
    },
    titleBold: {
      fontWeight: "900",
      fontSize: 17,
    },
  
    itemText: {
      paddingTop: 1,
      color: "black",
      fontSize: 16,
    },
  });