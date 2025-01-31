import { Text, View, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";;
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import { formatDate } from "../../../../../src/utils/functiones/functions";
import { useState } from "react";

export const SearchView = ({ value, handleOpenSecondModal }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePress = () => {
    if (isButtonDisabled) {
      return; 
    }
    handleOpenSecondModal()
    setIsButtonDisabled(true);
  };
  return (
    <View style={[styles.viewmore]}>
      <Text style={styles.subtitle}>{formatDate(value)}</Text>
      <Button
title="Ver mas"
        disabled={isButtonDisabled} 
        onPress={handlePress}
        
      />
    </View>
  );
};

        {/* <Text
          style={{ color: ColorItem.DeepFir, fontSize: 16, marginBottom: 4 }}
        >
          Ver mas
        </Text>
        <MaterialIcons name="expand-more" size={24} color={ColorItem.DeepFir} /> */}// buttonStyle={{ width: 100 }}
        // radius="sm"
        // type="clear"