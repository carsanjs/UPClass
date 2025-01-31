import SimpleDatePicker from "../../Components/customSimpleDatePicker";
import { InfoHorario } from "./component/info/infoHorario";
import { SearchView } from "./component/searchMore&viewValue";
import useToastMessage from "../../../share/ToasNotification";
import moment, { Today } from "../../../../src/utils/InstanceMoment";
import { NotRegistration } from "../../Components/unregistered/noRegistration";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

export const ScreenDetailHour = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const today = Today();
  const [value, setValue] = useState(today);
  const { showToast, APP_STATUS } = useToastMessage();
  const { selectedItem } = route.params;

  // Función para obtener fechas seleccionadas del mes actual
  const handleDateSelected = (selectedItem) =>
    selectedItem?.horarios
    ?.map((horario) => moment(horario.fecha))
      .filter((fecha) => fecha.month() === moment().month());

  const handleDateChange = (date) => {
    setValue(date);
  };

  const handleOpenSecondModal = () => {
    showToast({
      message: "Cargando datos... en espera...",
      type: "warning",
      id: APP_STATUS.LOADING,
      onClose: () =>
        navigation.navigate("SubInfoHours", {
          selectedDate: selectedItem,
        }),
    });
  };
   
  return selectedItem ? (
    <>
      <InfoHorario selectedItem={selectedItem} />
      <SearchView value={value} handleOpenSecondModal={handleOpenSecondModal} />
      <SimpleDatePicker
        onDateChange={handleDateChange}
        selectedDate={handleDateSelected(selectedItem)}
        viewSelectDate={selectedItem?.horarios.find((horario) =>
          moment(horario.fecha).isSame(value, "day")
        )}
      />
    </>
  ) : (
    <NotRegistration />
  );
};