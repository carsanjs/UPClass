import CustomStack from "../../Components/view/customStack";
import { Clasesregistro } from "./AgendaCalendar/components/indexClasesRegistro";

export const RegistroClases = () => {
  const screens = [
    {
      name: "ClasesRegistro",
      component: Clasesregistro,
      title: "Clases Programadas",
    },
  ];
  return <CustomStack initialRouteName="ClasesRegistro" screens={screens} />;
};
