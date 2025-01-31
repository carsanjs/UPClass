import { View, StyleSheet } from "react-native";
import {
  CustomInput,
  CustomInputCheckBox,
} from "../../share/inputs/customInput";
import { loging } from "../../../src/utils/schemas/login&registerSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import useToastMessage from "../../share/ToasNotification";
import { useEffect } from "react";
import { Buttonlogin } from "../../share/button/buttonLogin";
import { ColorItem } from "../../styles/StylesGlobal";
import { useAuth } from "../../../src/hooks/use/useAuth";
import {
  IconPassword,
  IconUserCircle,
} from "../../../assets/icons/IconsGlobal";

export const FormLogin = () => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loging),
  });

  const onsubmit = async (data) => {
    const { correo, contrasena, rol } = data;

    if (!correo || !contrasena || !rol) {
      return showToast({
        message: "Por favor complete todos los campos.",
        type: "danger",
        id: "ERROR_CAMPOSIMCOMPLETOS",
      });
    }

    try {
      await login(correo, contrasena, rol);
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.LOADED_SUCCESSFULLY],
        type: "success",
        id: "INICIO_STATUS_LOADED_SUCCESSFULL",
      });

      if (user) {
        router.push("/home");
      }
      reset();
    } catch (error) {
      reset();
      showToast({
        message: error.message,
        type: "danger",
        id: "PERMISSIONS_ERROR_DENIED",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/home");
    }
  }, [isAuthenticated, user]);

  return (
    <View className={styles.container}>
      <CustomInput
        error={errors.correo}
        icon={
          <IconUserCircle
            size={24}
            color={`${errors.correo ? "red" : ColorItem.DeepFir}`}
          />
        }
        label="Correo Electronico"
        control={control}
        name="correo"
        placeholder="Example@example.com"
        keyBoardType="email-address"
      />
      <CustomInput
        error={errors.contrasena}
        label="password"
        icon={
          <IconPassword
            size={24}
            color={`${errors.contrasena ? "red" : ColorItem.DeepFir}`}
          />
        }
        control={control}
        name="contrasena"
        placeholder="********"
        secureTextEntry={true}
      />
      {/*checkbox*/}
      <CustomInputCheckBox
        control={control}
        name="rol"
        title="Soy un"
        error={errors.rol}
      />
      <Buttonlogin error={errors} onPress={handleSubmit(onsubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
