import { truncateText } from "../../../../../../src/utils/functiones/functions";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const ReportClases = ({ item , buttonPressed}) => {

  return (
    <View style={styles.item}>
      <View
        style={{
          width: "45%",
        }}
      >
        <Text style={styles.itemHourText}>Salon:{item.room}</Text>
        <Text style={styles.itemHourText}>{item.hours}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>

      <View
        style={{
          width: "55%",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            padding: 5,
          }}
        >
          <Text style={styles.itemTitleText}>
            {truncateText(item.subject, 7)}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "lightblue",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={buttonPressed}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Comentar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 150,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 5,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
});
