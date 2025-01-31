import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function HeaderLeft({ icon, onPress }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPress}>{icon }</TouchableOpacity>
    </View>
  );
}

  const styles = StyleSheet.create({
    headerContainer: {
      paddingLeft: 5,
      paddingBottom: 0,
      paddingTop: 5,
    },
  });
