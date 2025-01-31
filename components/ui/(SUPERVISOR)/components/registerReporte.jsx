import {  View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterReportSchema } from "../../../../src/utils/schemas/reportSchema";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ColorItem } from "../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter,
} from "../../../../src/utils/functiones/functions";
import { registerReporte } from "../../../../src/services/fetchData/fetchReporte";
import useToastMessage from "../../../share/ToasNotification";
import { CustomFlatList } from "../../../share/inputs/customFlatList";
import { MultilineTextInput } from "../../../share/inputs/customMultipleTextInput";
import { status } from "../../../../src/utils/functiones/status";
import { ListItemAccordion } from "../../Components/listItem.accordion/ListItemA";
import { ContentReport } from "./reporte/content";
import { ExpadedReport } from "./reporte/expande";
import { BtnCancel_Report } from "../../../share/button/cancel_report";
import { registerNotification } from "../../../../src/services/fetchData/fetchNotification";
import { userData } from "../../../../src/hooks/use/userData";

export const RegisterReporte = () => {
  const { ID, DIRECTORID } = userData();
  const estado = status.map((item) => ({
    id: item,
    label: item,
  }));

  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const navigation = useNavigation();
  const router = useRoute();
  const { data } = router.params;
  const CLASE_ID = data.id;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterReportSchema),
  });
  const onSubmitRegisterReport = async (data) => {
    const { comentario, estado } = data;
    try {
      await registerReporte(CLASE_ID, comentario, estado);
     try {
       const REPORTE = "reporte enviado"
      await registerNotification(REPORTE, ID, DIRECTORID, CLASE_ID);
     } catch (error) {
      console.log(" ERROR NOTIFICATION SEND SUPERVISOR", error)
      console.error(error);
     }
      reset();
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.LOADED_SUCCESSFULLY],
        type: "warning",
        id: APP_STATUS.LOADED_SUCCESSFULLY,
        onClose: () => {
          navigation.navigate("StackBoard", {
            screen: "UPClass",
          });
        },
      });
    } catch (error) {
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: APP_STATUS.ERROR,
      });
      throw Error("Error al registrar el reporte al docente", error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const isComentario = data.comentario && data.comentario.length > 0;

  const isStateLocked =
    data.estado === "completada" || data.estado === "perdida";

  const colorborderLeft =
    isStateLocked && data.estado === "completada"
      ? ColorItem.GreenSymphony
      : data.estado === "perdida"
      ? ColorItem.VividRed
      : ColorItem.GoldOre;


  return (
    <>
      <ListItemAccordion
        borderLeftColor={colorborderLeft}
        content={<ContentReport data={data} isStateLocked={isStateLocked} />}
        expande={<ExpadedReport data={data} isComentario={isComentario} />}
        key={data.id}
      />

      {!isStateLocked && (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}
        >
          <CustomFlatList
           toLowerCase={true}
            name="estado"
            control={control}
            data={estado}
            placeholder={
              data.estado !== "pendiente"
                ? capitalizeFirstLetter(data.estado)
                : `Seleccione (por default ${data.estado})`
            }
            errors={errors.estado}
          />
        </View>
      )}
      {!isComentario && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <MultilineTextInput
            errors={data.comentario?.length > 0 ? undefined : errors.comentario}
            maxLength={10}
            numberOfLines={12}
            name="comentario"
            editable={data.comentario?.length > 0 ? false : true}
            variant="outlined"
            control={control}
            placeholder={
              data.comentario?.length > 0
                ? data.comentario
                : "Escribir reporte..."
            }
          />
        </View>
      )}
      {!isComentario && (
      <BtnCancel_Report
      handleCancel={handleCancel}
      handleSubmit={handleSubmit(onSubmitRegisterReport)}
      />
      )}
    </>
  );
};