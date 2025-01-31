import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ColorItem } from "../../styles/StylesGlobal";
export const CustomPiker = ({ name, control, errors, placeholder, data }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
         <View style={[styles.pickerContainer,{
              borderWidth:1,
              borderColor: errors ? ColorItem.VividRed :ColorItem.TarnishedSilver,
            }]}>
         <Picker
         selectionColor={ColorItem.CianBlue}
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            <Picker.Item
              style={{ fontSize: 18 }}
              label={placeholder}
              value=""
            />
            {data.map((item) => (
              <Picker.Item
                style={{
                  fontSize: 16,
                }}
                key={item.id}
                value={item.id}
                label={item.label}
              />
            ))}
          </Picker>
         </View>

          {errors && (
            <Text style={{ color: "red", fontSize: 16, padding: 4 }}>
              {errors.message}
            </Text>
          )}
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 4,
    width: "100%",
  },
});