import { TabsHome } from "../../../components/share/navigations/tabsHome";
import { IndexReportesSupervisor } from "../../../components/ui/(SUPERVISOR)/reportes/indexReporte";
import { IndexClases } from "../../../components/ui/(SUPERVISOR)/clases/indexClases";
import {
  IconClassRoom,
  IconHome,
  IconNotification,
  IconReport,
} from "../../../assets/icons/IconsGlobal";
import { UseNavigationContainer } from "../../../components/share/navigations/Navigation.containe";
import { RegisterReporte } from "../../../components/ui/(SUPERVISOR)/components/registerReporte";
import NotificationStackScreenSu from "../../../components/ui/(SUPERVISOR)/notifications/screenNotifications";
import { useSocket } from "../../../src/hooks/use/useSocket";
import { ColorItem } from "../../../components/styles/StylesGlobal";
import { useAuth } from "../../../src/hooks/use/useAuth";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CarListDocentes } from "../../../components/ui/(SUPERVISOR)/components/cars/CarsListDocente";
import { handleLogout } from "../../../components/ui/Components/logout/logout";
import { NotificacionView } from "../../../components/ui/Components/notifications/notificationMoreView";

export default function HomeSupervisor() {
  const screen = [
    {
      name: "StackBoard",
      component: TabSupervisor,
      options: {
        headerShown: false,
      },
    },
    {
      name: "RegistrarReporte",
      component: RegisterReporte,
      options: {
        title: "Registro de Reporte.",
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

export const TabSupervisor = (props) => {
  const { totalUnreadNotification } = useSocket();
  const EmptyComponent = () => null;
  const { logout } = useAuth();
  const SIZE = 26;
  const tabsSupervisor = [
    {
      name: "UPClass",
      component: CarListDocentes,
      options: {
        tabBarIcon: ({ color }) => <IconHome color={color} />,
      },
    },
    {
      name: "Reportes",
      component: IndexReportesSupervisor,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <IconReport size={SIZE} color={color} />,
      },
    },
    {
      name: "NotificationStack",
      component: NotificationStackScreenSu,
      options: {
        tabBarIcon: ({ color }) => (
          <IconNotification size={SIZE} color={color} />
        ),
        headerShown: false,
        tabBarBadge: totalUnreadNotification ? totalUnreadNotification : 0,
        tabBarBadgeStyle: {
          backgroundColor: ColorItem.DeepSkyBlue,
        },
      },
    },
    {
      name: "Clases",
      component: IndexClases,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <IconClassRoom color={color} />,
      },
    },
    {
      name: "Logout",
      component: EmptyComponent,
      options: {
        tabBarButton: (props) => (
          <AntDesign
            name="logout"
            size={SIZE}
            color={props.color}
            style={{
              paddingTop: 7,
              alignItems: "center",
              alignSelf: "center",
            }}
            onPress={() => handleLogout(logout)}
          />
        ),
      },
    },
  ];
  return <TabsHome tabsConfig={tabsSupervisor} initialRouteName="UPClass" />;
};
