import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ColorItem } from "../../styles/StylesGlobal";

export const Buttonlogin = ({ onPress, title = "Iniciar Sesión", error }) => {
  return (
    <View style={[styles.container, { paddingTop: error ? 12 : 20 }]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    width: "91.66%",
    alignSelf: "center",
    backgroundColor: ColorItem.KellyGreen, 
    padding: 12,
    borderRadius: 20, 
    marginBottom: 8, 
  },
  buttonText: {
    color: "#fff", 
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
