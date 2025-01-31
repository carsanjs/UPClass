import { View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { SubmitButton } from "../../../share/button/submitButton";
import {
  getSalonOne,
  updateSalon,
} from "../../../../src/services/fetchData/fetchSalon";
import useToastMessage from "../../../share/ToasNotification";
import { updateSalonSchema } from "../../../../src/utils/schemas/SalonSchema";
import { CustomInput } from "../../../share/inputs/customInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";
import { CustomPiker } from "../../../share/inputs/customPicker";
import { CustomSwitch } from "../../../share/inputs/customSwitchSN";
import Loading from "../../../share/loading";
import { useCategoriaxSalon } from "../../../../src/hooks/customHooks";
import LayoutScroolView from "../../Components/Layout/UseScroollView";

export const UpdateSalon = ({ navigation, route }) => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const [initialValues, setInitialValues] = useState({});
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateSalonSchema),
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const category = useCategoriaxSalon();
  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      (async () => {
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADING],
          type: "warning",
          id: APP_STATUS.LOADING,
        });
        const response = await getSalonOne(route.params.id);
        const value = response.find((doc) => doc.id === route.params.id);
        if (value) {
          setInitialValues({
            categoria_salon: value.categoria_salon,
            nombre: value.nombre,
            numero_salon: value.numero_salon?.toString(),
            capacidad: value.capacidad?.toString(),
            INTernet: value.INTernet || "",
            tv: value.tv || "",
          });
          reset({
            categoria_salon: value.categoria_salon,
            nombre: value.nombre,
            numero_salon: value.numero_salon?.toString(),
            capacidad: value.capacidad?.toString(),
            INTernet: value.INTernet || "",
            tv: value.tv || "",
          });
        } else {
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.ERROR],
            type: "danger",
            id: "ERROR_GET_UPDATE_FAILED",
          });
          throw new Error("Salon no encontrada");
        }
      })();
    }
  }, [route.params]);


  const isDisabled = editing && !isDirty;

  const upsubmit = async (data) => {
    setLoading(true);
    try {
      if (editing) {
        await updateSalon(route.params.id, data);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.UPDATING],
          type: "success",
          id: APP_STATUS.UPDATING,
          onClose: () => {
            reset();
          },
        });
        navigation.reset({
          index: 0,  
          routes: [
            { name: "StackBoard", params: { screen: "Home", params: { screen: "Salones" } } },
          ],
        });
        setLoading(false);
      } else {
        reset();
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.ERROR],
          type: "danger",
          id: "APP_STATUS_ERROR_ELSENOT",
        });
      }
    } catch (error) {
      reset();
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: "APP_STATUS_ERROR_EDITING",
      });
    }
  };

  const handleUpdatePress = () => {
    Alert.alert(
      "Confirmar actualización",
      "¿Seguro que deseas actualizar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: handleSubmit(upsubmit) },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <LayoutScroolView>
      {editing && (
        <
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                width: "50%",
                paddingBottom: 4,
                paddingTop: 20,
              }}
            >
              <CustomInput
                variant="outlined"
                label="Nombre del salon"
                name="nombre"
                control={control}
                error={errors.nombre}
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                width: "50%",
                paddingBottom: 4,
                paddingTop: 20,
              }}
            >
              <CustomInput
                variant="outlined"
                label="Numero del salon"
                name="numero_salon"
                control={control}
                keyBoardType="numeric"
                error={errors.numero_salon}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
     

            <View
                style={{
                  alignSelf: "center",
                  width: "50%",
                  paddingTop: 14,
                paddingHorizontal:10,
                  alignItems:"center",
                }}
              >
                  <CustomPiker
                  placeholder="Seleccione"
                  name="categoria_salon"
                  control={control}
                  errors={errors.categoria_salon}
                  data={category.map((status) => ({
                    id: status.id,
                    label: capitalizeFirstLetter(status.categoria),
                    value: status.id,
                  }))}
                />    
              </View>

            <View
              style={{
                alignSelf: "center",
                width: "50%",
                paddingBottom: 4,
                paddingTop: 20,
              }}
            >
              <CustomInput
                keyBoardType="numeric"
                variant="outlined"
                label="Capacidad"
                name="capacidad"
                control={control}
                error={errors.capacidad}
              />
            </View>
          </View>
        </>
      )}
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "50%",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <CustomSwitch name="INTernet" control={control} label="Internet" />
        </View>

        <View
          style={{
            alignItems: "center",
            width: "50%",
            paddingVertical: 10,
            marginLeft: 4,
          }}
        >
          <CustomSwitch name="tv" control={control} label="TV" />
        </View>
      </View>
      
      
      <SubmitButton
        editing={editing}
        onPress={handleUpdatePress}
        isDisabled={isDisabled}
      />
    </LayoutScroolView>
  );
};
