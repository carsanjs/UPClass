import { Controller } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { TextInput } from "@react-native-material/core";
import { ColorItem } from "../../styles/StylesGlobal";

export const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  keyBoardType,
  label,
  icon,
  variant,
  error,
  enable = true,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <View style={styles.inputContainer}>
            <TextInput
            inputContainerStyle={{
              backgroundColor:"#ffffff",
              borderBottomColor: error ? ColorItem.VividRed : null, // Borde inferior rojo si hay error
              borderBottomWidth: error ? 1 : null,
            }}
              style={[
                styles.input,
                error ? styles.inputError : styles.inputDefault,
              ],{
              }}
              color={`${error ? ColorItem.VividRed : "#3C9B61"}`}
              label={label}
              inputStyle={{
                fontSize:16,
                paddingTop:10
              }}
              variant="outlined"
              leading={icon}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#676767"
              keyboardType={keyBoardType}
              autoComplete="off"
              secureTextEntry={secureTextEntry}
              editable={enable}
            />
          </View>
          {error && (
            <Text style={styles.errorText}>
              {typeof error.message === "string"
                ? error.message
                : error.message?.message || "Error inesperado"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const CheckBox = ({ label, value, rfv, onChange, error, selectedOption }) => {
  const isSelected = selectedOption === value;
  const borderColor = error && !selectedOption ? "red" : isSelected ? "black" : "#929292";
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        style={[
          styles.checkbox,
          { borderColor },
        ]}
        value={rfv === value}
        onValueChange={() => onChange(value)}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

export const CustomInputCheckBox = ({ control, name, title, error }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleCheckboxChange = (onChange, value) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.checkboxGroupContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.checkboxRow}>
            <CheckBox
              error={error}
              onChange={() => handleCheckboxChange(onChange, "supervisor")}
              rfv={value}
              label="Supervisor"
              value="supervisor"
              selectedOption={selectedOption}
            />
            <CheckBox
              error={error}
              onChange={() => handleCheckboxChange(onChange, "director")}
              rfv={value}
              label="Director"
              value="director"
              selectedOption={selectedOption}
            />
            <CheckBox
              error={error}
              onChange={() => handleCheckboxChange(onChange, "docente")}
              rfv={value}
              label="Docente"
              value="docente"
              selectedOption={selectedOption}
            />
          </View>
          {error && (
            <Text style={[styles.errorText]}>
              {error.message || "Error"}
            </Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical:10,
  },
  input: {
    borderRadius: 10,
    width: "100%",
  },
  inputDefault: {
    borderColor: "#B0B0B0",
  },
  inputError: {
    borderColor: ColorItem.VividRed,
    borderWidth: 2,
  },
  errorText: {
    width:"100%",
    color: ColorItem.VividRed,
    paddingLeft: 16,
    fontSize:15
  },
  checkboxContainer: {
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 12.5,
    borderWidth: 2,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 16,
  },
  checkboxGroupContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    paddingVertical:13, 
    paddingHorizontal:16,
    fontWeight: "700",
    fontSize: 16,
    textAlign:"left",
    width:"100%"
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
