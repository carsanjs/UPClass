import CustomStack from "../../Components/view/customStack";
import { ListClassView } from "./listClaseView";

export const IndexClases = () => {
  const screens = [
    {
      name: "ListClasscreen",
      component: ListClassView,
      title: "Tu Calendario de Clases",
    },
  ];
  return <CustomStack initialRouteName="ListClasscreen" screens={screens} />;
};
