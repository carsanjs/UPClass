import { ListSupervisor } from "./list";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";
import CustomStack from "../../Components/view/customStack";

export const IndexSupervisor = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListSupervisor,
      title: "Listado de Supervisores",
      headerRight: (navigation) => <Buttonright icon={IconAddCircle} 
      navigation={navigation}
      router="FormScreenSupervisor"
      />
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
