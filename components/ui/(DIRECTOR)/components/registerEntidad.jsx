import { CustomInput } from "../../../share/inputs/customInput";
import { View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  register,
  update,
} from "../../../../src/utils/schemas/login&registerSchema";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SubmitButton } from "../../../share/button/submitButton";
import useToastMessage from "../../../share/ToasNotification";
export const RegistrarEntidad = ({
  navigation,
  route,
  tipoEntidad,
  getEntidadOne,
  registerEntidad,
  updateEntidad
}) => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const [editing, setEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({}); 
  
  const { handleSubmit, control, reset, formState:{
    errors, isDirty
  } } = useForm({
    resolver: yupResolver(editing ? update : register),
  });

  const isDisabled = editing && !isDirty;

  useEffect(() => {
    if (route.params && route.params.cedula) {
      setEditing(true);
      navigation.setOptions({ headerTitle: `Actualizar ${tipoEntidad}` });
      (async () => {
        const response = await getEntidadOne(route.params.cedula);
        const entidad = response.find(
          (ent) => ent.cedula === route.params.cedula
        );
        if (entidad) {
          setInitialValues({
            nombre: entidad.nombre,
            apellido: entidad.apellido,
            correo: entidad.correo,
          });
          reset({
            nombre: entidad.nombre,
            apellido: entidad.apellido,
            correo: entidad.correo,
              });
        } else {
          throw new Error(`${tipoEntidad} no encontrado.`);
        }
      })();
    }
  }, [route.params]);

  const onsubmit = async (data) => {
    const { nombre, apellido, correo, cedula, contrasena } = data;
    try {
      if (!editing) {
        await registerEntidad(nombre, apellido, cedula, correo, contrasena);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.SUCCESS],
          type: "success",
          id: `success_type${tipoEntidad}`,
        });
        reset();
      } else {
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.UPDATING],
          type: "success",
          id: `update_type${tipoEntidad}`,
        });
        await updateEntidad(route.params.cedula, data);
        reset();
      }
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.REDIRECTING],
        type: "warning",
        id:`redirect_type${tipoEntidad}`,
        onClose: () => {
          navigation.reset({
            index: 0,  
            routes: [
              { name: "StackBoard", params: { screen: tipoEntidad, params: { screen: "ListScreen" } } },
            ],
          });

        },
      });
    } catch (error) {
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: `danger_type${tipoEntidad}+${error}`,
      });
      reset();
    }
  };


  return (
    <>
       <View 
        style={{
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          marginLeft: 16, 
          marginRight: 16, 
          paddingTop:20,
          height: '100%',
        }}
        >
          {!editing ? (
            <>
              <View style={{
                width: '100%',
              }}>
                <CustomInput
                  error={errors.cedula}
                  name="cedula"
                  control={control}
                  placeholder="123456789"
                  className="text-buttonColor"
                  keyboardType="numeric"
                  label="Cedula"
                  icon={
                    <FontAwesome6 name="id-badge" size={24} color="black" />
                  }
                />
              </View>
              <View 
              style={{
                flexDirection: 'row',
                justifyContent: 'stretch', 
              }}
              >
                <View 
               style={{
                width: '50%',
                alignSelf: 'flex-start',
              }}
                >
                  <CustomInput
                    control={control}
                    error={errors.nombre}
                    placeholder="example"
                    label="Nombre"
                    icon={
                      <FontAwesome6
                        name="user-circle"
                        size={24}
                        color="black"
                      />
                    }
                    name="nombre"
                  />
                </View>

                <View
                 style={{
                  width: '50%',
                  alignSelf: 'flex-end',
                }}
                >
                  <CustomInput
                  error={errors.apellido}
                    name="apellido"
                    control={control}
                    placeholder="example"
                    label="Apellido"
                  />
                </View>
              </View>

              <View style={{
                width: '100%',
              }}>
                <CustomInput
                  name="correo"
                  error={errors.correo}
                  control={control}
                  placeholder="example@example.com"
                  keyboardType="email-address"
                  label="Correo Electronico"
                  icon={
                    <MaterialIcons
                      name="alternate-email"
                      size={24}
                      color="black"
                    />
                  }
                />
              </View>
              <View style={{
                width: '100%',
              }}>
                <CustomInput
                 error={errors.contrasena}
                  name="contrasena"
                  control={control}
                  label="Contraseña"
                  placeholder="password"
                  secureTextEntry={true}
                  icon={
                    <MaterialIcons name="password" size={24} color="black" />
                  }
                />
              </View>
            </>
          ) : (
            <>
              <View 
             style={{
              flexDirection: 'row',
              justifyContent: 'stretch', 
            }}
              >
                <View 
               style={{
                width: '50%',
                alignSelf: 'flex-start',
              }}
              
                >
                  <CustomInput
                    control={control}
                    label="Nombre"
                    icon={
                      <FontAwesome6
                        name="user-circle"
                        size={24}
                        color="black"
                      />
                    }
                    name="nombre"
                  />
                </View>

                <View 
               style={{
                width: '50%',
                alignSelf: 'flex-end',
              }}
                >
                  <CustomInput
                    name="apellido"
                    control={control}
                    label="Apellido"
                  />
                </View>
              </View>

              <View style={{
                width:"100%"
              }}>
                <CustomInput
                  name="correo"
                  control={control}
                  keyboardType="email-address"
                  label="Correo Electronico"
                  icon={
                    <MaterialIcons
                      name="alternate-email"
                      size={24}
                      color="black"
                    />
                  }
                />
              </View>
            </>
          )
          
          }
          <SubmitButton onPress={handleSubmit(onsubmit)} editing={editing}  isDisabled={isDisabled} />
        </View>
    </>
  );
};
