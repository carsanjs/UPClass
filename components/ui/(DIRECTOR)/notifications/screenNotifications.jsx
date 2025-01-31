import CustomStack from "../../Components/view/customStack";
import Notification from "../../Components/notifications/contentTabView";
const NotificationStackScreen = ({ navigation }) => {
  const screen = [
    {
      name: "NotificationScreen",
      component: Notification,
      title: "Notificaciones",
    }
  ];
  return <CustomStack initialRouteName="NotificationScreen" screens={screen} />;
};

export default NotificationStackScreen;
