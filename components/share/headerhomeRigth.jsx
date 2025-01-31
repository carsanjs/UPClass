import { Text, View, StyleSheet } from "react-native";

export default function HeaderRight({ rol, navigation }) {
  return (
    <View
      style={[
        styles.headerContainer,
        rol === "Director" || rol === "Supervisor" && { width: "50%" },
      ]}
    >
      <View style={styles.rightContainer}>
        <Text style={styles.rol}>{rol}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginRight: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  rol: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  rightContainer: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
