import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
import { IndexSupervisor } from "../../../components/ui/(DIRECTOR)/supervisor/ScreenSupervisor";
import { IndexComentario } from "../../../components/ui/(DIRECTOR)/comentario/ScreenComentario";
import { TabsHome } from "../../../components/share/navigations/tabsHome";
import { IndexDocente } from "../../../components/ui/(DIRECTOR)/docentes/ScreenDocente";
import { IndexSalones } from "../../../components/ui/(DIRECTOR)/salones/ScreenSalones";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NotificationStackScreen from "../../../components/ui/(DIRECTOR)/notifications/screenNotifications";
import { ColorItem } from "../../../components/styles/StylesGlobal";
import { UseNavigationContainer } from "../../../components/share/navigations/Navigation.containe";
import { useSocket } from "../../../src/hooks/use/useSocket";
import { IndexHorario } from "../../../components/ui/(DIRECTOR)/horarios/view/ScreenHorarios";
import { ScreenDetailHour } from "../../../components/ui/(DIRECTOR)/horarios/screenDetailhorario";
import { EstadisticasReportes } from "../../../components/ui/(DIRECTOR)/reportes/reportChart";
import { ReportView_Filter } from "../../../components/ui/(DIRECTOR)/reportes/list";
import { RegisterHorario } from "../../../components/ui/(DIRECTOR)/horarios/register";
import { RegistrarDocente } from "../../../components/ui/(DIRECTOR)/docentes/register";
import { RegistrarSupervisor } from "../../../components/ui/(DIRECTOR)/supervisor/register";
import ScreenViewMore from "../../../components/ui/(DIRECTOR)/horarios/component/screenViewMore/ScreenViewMore";
import {
  IconCalendar,
  IconClassRoom,
  Iconcommenting,
  IconHome,
  IconNotification,
  IconReport,
} from "../../../assets/icons/IconsGlobal";
import { UpdateSalon } from "../../../components/ui/(DIRECTOR)/salones/update";
import { NotificacionView } from "../../../components/ui/Components/notifications/notificationMoreView";

const DrawerScreen = () => {
  const SIZE = 26;
  const directorDrawerScreens = [
    {
      name: "Home",
      component: TabHome,
      options: {
        drawerIcon: ({ color }) => <IconHome color={color} />,
      },
    },
    {
      name: "Docente",
      component: IndexDocente,
      options: {
        drawerIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="human-male-board"
            size={30}
            color={color}
          />
        ),
      },
    },
    {
      name: "Supervisor",
      component: IndexSupervisor,
      options: {
        drawerIcon: ({ color }) => (
          <MaterialIcons
            name="supervised-user-circle"
            size={SIZE}
            color={color}
          />
        ),
      },
    },
    {
      name: "Reporte",
      component: ReportView_Filter,
      options: {
        drawerIcon: ({ color }) => <IconReport color={color} />,
      },
    },
  ];
  return (
    <DrawerHome drawerScreens={directorDrawerScreens} initialRouteName="Home" />
  );
};


const TabHome = () => {
  const { totalUnreadNotification } = useSocket();
  const tabsDirector = [
    {
      name: "UPClass",
      component: EstadisticasReportes,
      options: {
        tabBarIcon: ({ color }) => <IconHome color={color} />,
      },
    },
    {
      name: "Horarios",
      component: IndexHorario,
      options: {
        tabBarIcon: ({ color }) => <IconCalendar color={color} />,
        headerShown: false,
      },
    },
    {
      name: "NotificationStack",
      component: NotificationStackScreen,
      options: {
        tabBarIcon: ({ color }) => <IconNotification color={color} />,
        headerShown: false,
        tabBarBadge: totalUnreadNotification ? totalUnreadNotification : 0,
        tabBarBadgeStyle: {
          backgroundColor: ColorItem.DeepSkyBlue,
        },
      },
    },
    {
      name: "Salones",
      component: IndexSalones,
      options: {
        tabBarIcon: ({ color }) => <IconClassRoom color={color} />,
        headerShown: false,
      },
    },

    {
      name: "Comentarios",
      component: IndexComentario,
      options: {
        tabBarIcon: ({ color }) => <Iconcommenting color={color} />,
        headerShown: false,
      },
    },
  ];
  return <TabsHome tabsConfig={tabsDirector} initialRouteName="UPClass" />;
};
const HomeDirector = () =>{
  const screen = [
    {
      name: "StackBoard",
      component: DrawerScreen,
      options: {
        headerShown: false,
        showProgress: true,
      },
    },
    {
      name: "InfoHours",
      component: ScreenDetailHour,
      options: {
        title: "Detalle del horario",
      },
    },
    {
      name: "SubInfoHours",
      component: ScreenViewMore,
      options: {
        title: "Mas detalle del horario",
      },
    },
    {
      name: "FormScreenHorario",
      component: RegisterHorario,
      options: {
        title: "Registro de Horario",
      },
    },
    {
      name: "FormScreenDocente",
      component: RegistrarDocente,
      options: {
        title: "Registro de Docente",
      },
    },
    {
      name: "FormScreenSupervisor",
      component: RegistrarSupervisor,
      options: {
        title: "Registro de Supervisor",
      },
    },
    {
      name: "FormScreenUpdateClassRoom",
      component: UpdateSalon,
      options: {
        title: "Actualizar salon",
      },
    },
    {
      name: "NotificationView",
      component: NotificacionView,
      options: {
        title: "Detalles de la Notificación",
      },

      headerStyle: {
        backgroundColor: ColorItem.MediumGreen,
      },
      headerTitleStyle: {
        color: "#fff",
      },
    },
  ];

  return <UseNavigationContainer screenContainer={screen} />;
}

export default HomeDirector;
