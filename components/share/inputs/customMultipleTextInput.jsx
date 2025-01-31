import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { TextInput } from "@react-native-material/core";
import { ColorItem } from "../../styles/StylesGlobal";

export const MultilineTextInput = ({
  numberOfLines = 10,
  placeholder,
  control,
  name,
  errors,
  editable = true,
}) => {
  const [charCount, setCharCount] = useState(0);
  const maxLength = 250;

  useEffect(() => {
    const count = placeholder.length;
    if (
      placeholder === "Escribir reporte..." ||
      placeholder === "Escribe tu comentario aqui..."
    )
      return setCharCount(0);
    else {
      setCharCount(count);
    }
  }, []);

  const handleTextChange = (text) => {
    setCharCount(text.length); // Contamos los caracteres del texto
    return text;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View
          style={{
            flex: 1,
          }}
        >
          <TextInput
            style={{
              
              borderRadius: 6,
              borderColor: !editable ? "blue" : null,
              borderWidth: !editable ? 1 : null,
            }}
            autoCorrect={false}
            autoCapitalize="none"
            color={`${error ? "red" : ColorItem.GreenSymphony}`}
            variant="outlined"
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={ColorItem.DeepFir}
            autoComplete="off"
            multiline
            onChangeText={(text) => {
              if (text.length <= maxLength) {
                handleTextChange(text); // Actualizamos el conteo de caracteres
                onChange(text); // Pasamos el texto actualizado al formulario
              }
            }}
            onBlur={onBlur}
            value={value}
            numberOfLines={numberOfLines}
            inputContainerStyle={{
              borderBottomColor: error ? "red" : null,
              borderBottomWidth: error ? 2 : null,
            }}
          />
          {errors && (
            <Text style={{ color: "red", fontSize: 16, paddingTop: 5 }}>
              {errors.message}
            </Text>
          )}
          {/* Contador de caracteres */}
          <View 
          style={{
            flexDirection:"row",
            justifyContent:"flex-end",
            paddingVertical:16
          }}
          >
            <Text style={{ color: "black", fontSize: 14 }}>
              {charCount} / {maxLength} caracteres
            </Text>
          </View>
        </View>
      )}
    />
  );
};
