import { useState } from "react";
import Loading from "../../share/loading";
import { InfoSalones } from "../(DIRECTOR)/salones/components/InfoSalones";
import { ViewSalones } from "../(DIRECTOR)/salones/components/viewSalones";
import { NotRegistration } from "./unregistered/noRegistration";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { IconClassRoom } from "../../../assets/icons/IconsGlobal";
import CustomTouchableOpacity from "../../share/button/customTouchableOpacity";
import { ModalComponente } from "./Modals/customModal";
import { useSalonAll } from "../../../src/hooks/customHooks";
import { UseFlatList } from "./FlatList/customFlatList";

export const ListItemSalones = ({ getDataOne }) => {
  const { salones, fetchSalonAll, loading } = useSalonAll();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleInfoPress = async (id) => {
    try {
      setModalVisible(true);
      const res = await getDataOne(id);
      const itemselected = res.find((value) => value.id === id);
      if (itemselected) {
        setSelectedItem(itemselected);
      } else {
        setSelectedItem(null);
      }
    } catch (error) {
      setModalVisible(false);
      throw new Error("Error fetching item:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <UseFlatList
        data={salones}
        refreshing={loading}
        onRefresh={fetchSalonAll}
        ListEmptyComponent={<NotRegistration />}
        renderItem={({ item }) => (
          <ListSwipeable
            key={`key-2${item.id}`}
            item={item}
            showrightContent={false}
            handleInfoPress={handleInfoPress}
            icono={IconClassRoom}
          >
            <CustomTouchableOpacity
              screenName="FormScreenUpdateClassRoom"
              paramKey="id"
              paramValue={item.id}
            >
              <ViewSalones item={item} />
            </CustomTouchableOpacity>
          </ListSwipeable>
        )}
      />
      {/* Modal para mostrar información del salón  */}
      <ModalComponente
        modalStyle={{ height: "60%" }}
        modalVisible={modalVisible}
        title="Datos del salon"
        handleCloseModal={handleCloseModal}
      >
        {selectedItem ? (
          <InfoSalones selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </>
  );
};
