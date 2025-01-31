import CustomStack from "../../Components/view/customStack";
import { IndexHorarioDocente } from "./components/horario";

export const ScreenHorariosDocente = () => {
  const screens = [
    {
      name: "HorariosDocente",
      component: IndexHorarioDocente,
      title: "Mis Horarios",
    },
  ];
  return <CustomStack initialRouteName="HorariosDocente" screens={screens} />;
};
