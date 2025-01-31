import { updateNotificationId } from "../../../../src/services/fetchData/fetchNotification";
import { useNotificationCedulaEstado } from "../../../../src/hooks/customHooks";
import Loading from "../../../share/loading";
import { EmptyNotification } from "../unregistered/noRegistration";
import { UseFlatList } from "../FlatList/customFlatList";
import { NotificationView } from "./components/notificationView";
import { useEffect } from "react";
import { useSocket } from "../../../../src/hooks/use/useSocket";

const handleEditNotification = async (id, fetchNotificationsAll) => {
  const LEIDA = "leida";
  try {
    await updateNotificationId(id, LEIDA);
    await fetchNotificationsAll();
  } catch (error) {
    throw Error(error);
  }
};

export const ContentNofitications = ({ cedula, estado = "todas" }) => {
  const { isNotification } = useSocket();

  const { notificationCedulaEstado, fetchNotificationsAll, loading } =
    useNotificationCedulaEstado(cedula, estado);

  useEffect(() => {
    if (isNotification) {
      fetchNotificationsAll();
    }
  }, [isNotification]);

  const handleUpdateStatus = (item) => {
    const NOLEIDA = "no leida";
    if (item.estado === NOLEIDA) {
      handleEditNotification(item.id, fetchNotificationsAll);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <UseFlatList
      data={notificationCedulaEstado}
      onRefresh={fetchNotificationsAll}
      refreshing={loading}
      renderItem={({ item }) => (
        <NotificationView item={item} handleUpdateStatus={handleUpdateStatus} />
      )}
      keyExtractor={(item, index) => `notif-${item.id || index}`}
      ListEmptyComponent={<EmptyNotification />}
    />
  );
};
