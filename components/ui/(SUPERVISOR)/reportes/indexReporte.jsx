import CustomStack from "../../Components/view/customStack";
import { ViewReportSup } from "./reportView";

export const IndexReportesSupervisor = () => {
  const screens = [
    {
      name: "ListReportScreen",
      component: ViewReportSup,
      title: "Reportes de Clases",
    },
  ];
  return <CustomStack initialRouteName="ListReportScreen" screens={screens} />;
};
