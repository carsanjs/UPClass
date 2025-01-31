import { ListSalones } from "./list";
import CustomStack from "../../Components/view/customStack";

export const IndexSalones = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListSalones,
      title: "Salones de la Facultad de Sistemas",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
