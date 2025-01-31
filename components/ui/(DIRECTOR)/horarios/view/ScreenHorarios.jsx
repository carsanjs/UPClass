import { ListHorario } from "../list";
import CustomStack from "../../../Components/view/customStack";
import Buttonright from "../../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../../assets/icons/IconsGlobal";

export const IndexHorario = () => {
  const screens = [
    {
      name: "listScreenH",
      component: ListHorario,
      title: "Horarios de Clases",
      options: {
        headerShow: true,
      },
      headerRight: (navigation) => {
        return (
          <Buttonright
            icon={IconAddCircle}
            navigation={navigation}
            router="FormScreenHorario"
          />
        );
      },
    },
  ];

  return <CustomStack initialRouteName="listScreenH" screens={screens} />;
};
