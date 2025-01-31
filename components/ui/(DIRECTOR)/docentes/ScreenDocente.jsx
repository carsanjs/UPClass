import { ListDocente } from "./listDocente";
import CustomStack from "../../Components/view/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";

export const IndexDocente = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListDocente,
      title: "Listado de Docentes",
      headerRight: (navigation) => (
        <Buttonright
          icon={IconAddCircle}
          navigation={navigation}
          router="FormScreenDocente"
        />
      ),
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};