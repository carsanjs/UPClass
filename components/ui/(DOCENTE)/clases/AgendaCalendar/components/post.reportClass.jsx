import { Pressable, View, Text, StyleSheet } from "react-native";
import { MultilineTextInput } from "../../../../../share/inputs/customMultipleTextInput";
import { ColorItem } from "../../../../../styles/StylesGlobal";
import { BoxView } from "../../../../(DIRECTOR)/components/customBoxView";
import { capitalizeFirstLetter } from "../../../../../../src/utils/functiones/functions";

export const PostReportClass = ({
  handleOnclosed,
  handleSubmit,
  errors,
  control,
  items,
}) => {
  return (
    <>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}
      >
        {items.commenting ? (
          <BoxView>
            <View style={{
              padding:10,
              marginVertical:10
            }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "black",
            }}>{capitalizeFirstLetter(items.commenting)}</Text>
            <Text  style={{
              fontSize: 12,
              color: "grey",
            }}>{items.date}</Text>
              </View>
          </BoxView>
        ) : (
          <MultilineTextInput
            control={control}
            name="comentario"
            variant="outlined"
            errors={errors.comentario}
            placeholder="Escribe tu comentario aqui..."
          />
        )}
      </View>

      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={[styles.button, styles.buttonClose,{
            marginTop:items.commenting ? 30:0
          }]}
          onPress={() => handleOnclosed()}
        >
          <Text style={styles.textStyle}>Cerrar Ventana</Text>
        </Pressable>
        {!items.commenting && (
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: ColorItem.Luigi,
              },
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.textStyle}>Comentar</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 10,
    marginHorizontal: 15,
  },
  buttonClose: {
    backgroundColor: ColorItem.VividRed,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
// onPress={handleSubmit(onSubmitRegisterComentario)}
