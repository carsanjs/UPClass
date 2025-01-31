// import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
import { DashboardDocente } from "../../../components/ui/(DOCENTE)/home/Home";
import { RegistroClases } from "../../../components/ui/(DOCENTE)/clases/ScreenClases";
import { ScreenHorariosDocente } from "../../../components/ui/(DOCENTE)/horarios/screenHorarios";
import { ScreenComentarioDocente } from "../../../components/ui/(DOCENTE)/comentarios/screenComentarioDocente";
import { UseNavigationContainer } from "../../../components/share/navigations/Navigation.containe";

export default function HomeDocente (){
  const docenteScreens = [
    {
      name: "UPClass",
      component: DashboardDocente,
    },
    {
      name: "Clases",
      component: RegistroClases,
      options: {
        headerShown: false,
      },
    },
    {
      name: "Horarios",
      component: ScreenHorariosDocente,
      options: {
        headerShown: false,
      },
    },
    {
      name: "Comentarios",
      component: ScreenComentarioDocente,
      options: {
        headerShown: false,
      },
    },
  ];

  return <UseNavigationContainer screenContainer={docenteScreens}/>
};