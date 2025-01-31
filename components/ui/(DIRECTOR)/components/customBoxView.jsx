import { View, StyleSheet } from "react-native";

export const BoxView = ({ children, style }) => {
  return <View style={[styles.boxview, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  boxview: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fafbfd",
    shadowColor: "#d6deee",
    shadowOffset: { width: -2, height: 4 },
  },
});
