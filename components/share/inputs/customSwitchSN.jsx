import { Text, View, Switch } from "react-native";
import { Controller } from "react-hook-form";
import { ColorItem } from "../../styles/StylesGlobal";
export const CustomSwitch = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return(
          <View 
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            borderWidth:1,
            borderColor:ColorItem.ChromeAluminum,
            alignItems:"center",
            backgroundColor:"#fff",
            borderRadius:50,
            width:"85%",
          }}>
          <Text  style={{paddingHorizontal:20}}>{label}</Text>
          <View 
          style={{
            flexDirection:"row",
            alignItems:"center",
            paddingHorizontal:10
          }}
          >
            <Text style={{
              fontWeight:"semibold"
            }}>{value === "si" ? "Si" : "No"}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#C0C0C0" }}
              thumbColor={value === "si" ? ColorItem.CianBlue : ColorItem.VividRed}
              value={value === "si" }
              onValueChange={(newValue) => onChange(newValue ? "si" : "no")}
            />
          </View>
        </View>
        )
      }}
    />
  );
};
