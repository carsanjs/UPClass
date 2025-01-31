import { Alert } from "react-native";
import { useState } from "react";
import Loading from "../../share/loading";
import { NotRegistration } from "./unregistered/noRegistration";
import { DeleteComentarioOne, getComentarioOne } from "../../../src/services/fetchData/fetchComentario";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { Iconcommenting } from "../../../assets/icons/IconsGlobal";
import { ModalComponente } from "./Modals/customModal";
import { CComentario } from "../(DIRECTOR)/comentario/components/listComentario";
import { BtnViewSelect } from "../(DIRECTOR)/comentario/components/btnViewSelect";
import { useComentarioAll } from "../../../src/hooks/customHooks";
import { UseFlatList } from "./FlatList/customFlatList";

export const ListItemComentario = ({
  modalTitle = "Info",
  filterdata = null,
}) => {
  const { comentarioAll, reload, fetchComentarioAll } = useComentarioAll();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleInfoPress = async (id) => {
    try {
      setModalVisible(true);
      const res = await getComentarioOne(id);
      const itemselected = res.find((value) => value.id === id);
      if (itemselected) {
        setSelectedItem(itemselected);
      } else {
        setSelectedItem(null);
        setModalVisible(false);
        throw new Error("Comentario no encontrado");
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
  const handleDeletePress = (itemId) => {
    Alert.alert(
      `Eliminar ${modalTitle}`,
      `¿Estás seguro de que deseas eliminar este ${modalTitle.toLowerCase()}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await DeleteComentarioOne(itemId);
              Alert.alert(`${modalTitle} eliminado con éxito`);
              fetchComentarioAll();
            } catch (error) {
              Alert.alert(`Error al eliminar el ${modalTitle.toLowerCase()}`);
            }
          },
        },
      ]
    );
  };

  const dataComentario = filterdata !== null && filterdata !== undefined ? filterdata:comentarioAll;
 
  if (reload) {
    return <Loading />;
  }

  return (
     <>
      <UseFlatList
      ListEmptyComponent={<NotRegistration/>}
      onRefresh={fetchComentarioAll}
      refreshing={reload}
      data={dataComentario}
      renderItem={({item, index}) =>(
        <ListSwipeable
        item={item}
        index={index}
        key={`key25${item.id}-${index}`}
        handleDeletePress={handleDeletePress}
        handleInfoPress={handleInfoPress}
        icono={Iconcommenting}
        isFiltered={Boolean(filterdata)}
      >
        <BtnViewSelect item={item} />
      </ListSwipeable>
      )}
      />
     

      <ModalComponente
        modalStyle={{ height: "80%" }}
        modalVisible={modalVisible}
        title="Datos del Comentario"
        handleCloseModal={handleCloseModal}
      >
        {reload ? (
          <Loading />
        ) : selectedItem ? (
          <CComentario selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
     </>
  );
};