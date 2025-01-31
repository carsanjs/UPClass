import { useCallback, useMemo, useState } from "react";
import { userData } from "../../../../../../src/hooks/use/userData";
import AgendaItem from "../AgendaItem";
import AgendaCalendar from "../../../../Components/agenda/agenda";
import { loadCalendarItems } from "../../../../Components/agenda/data/tranformaData";
import { useClaseDocentes } from "../../../../../../src/hooks/customHooks";
import { getmarkedDates } from "../../../../Components/agenda/data/markesData";
import { View } from "react-native";
import { ModalComponente } from "../../../../Components/Modals/customModal";
import { PostReportClass } from "./post.reportClass";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { _registerComentario } from "../../../../../../src/utils/schemas/comentarioSchema";
import moment from "../../../../../../src/utils/InstanceMoment";
import { registerComentario } from "../../../../../../src/services/fetchData/fetchComentario";
import { registerNotification } from "../../../../../../src/services/fetchData/fetchNotification";
import { obtenerLimitesFechas } from "../../../../../../src/utils/functiones/functions";
export const Clasesregistro = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const { CEDULA, ID, DIRECTORID } = userData();
  const data = useClaseDocentes(CEDULA);
  const fechas = [];
   for (let i = 0; i < data.length; i++) {
  fechas.push(data[i].fecha);
  }
  const [start, end] = useMemo(()=>obtenerLimitesFechas(fechas), [fechas]);
  const ITEMS = loadCalendarItems(data);
  const markedDates = getmarkedDates(ITEMS);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(_registerComentario),
  });

  const onSubmitRegisterComentario = async (data) => {
    const { comentario } = data;
    try {
      const docente = modalItem.docente;
      const salon = modalItem.salon;
      const clase = modalItem.clase;
      const fecha = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
      await registerComentario(comentario, docente, salon, fecha, clase);
      alert("comentario registrado correctamente");
      reset();
      try {
        const COMENTARIO = "comentario";
        await registerNotification(COMENTARIO, ID, DIRECTORID, clase);
        handleOnclosed();
      } catch (error) {
        throw Error("Error al registrar registerNotification", error);
      }
    } catch (error) {
      throw Error("Error al registrar registerComentario", error);
    }
  };

  const handleOnclosed = () => {
    setShowModal(false);
    setModalItem(null);
  };

  const _renderItem = useCallback(item => {
      return (
        <AgendaItem
          item={item}
          setShowModal={setShowModal}
          setModalItem={setModalItem}
        />
      );
    },
    []
  );

  return (
    <View
      style={{
        pointerEvents: showModal ? "none" : "auto",
        flex: 1,
      }}
    >
      <AgendaCalendar
        minDate={start}
        maxDate={end}
         markedDates={markedDates}
        items={ITEMS}
        render={_renderItem}
      />

      {showModal && modalItem && (
        <ModalComponente
          modalStyle={{
            height: "70%",
          }}
          title={modalItem.commenting ? "Ya has dejado un comentario en esta clase.":`Deja tu comentario sobre la clase:${modalItem.room}`}
          canCloseModal={false}
          transparent={false}
          modalVisible={showModal}
        >
           <PostReportClass
           items={modalItem}
            control={control}
            errors={errors}
            handleOnclosed={handleOnclosed}
            handleSubmit={handleSubmit(onSubmitRegisterComentario)}
          />
        </ModalComponente>
      )}
    </View>
  );
};
