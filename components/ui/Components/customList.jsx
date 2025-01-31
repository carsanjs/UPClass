import { Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InfoDS } from "../(DIRECTOR)/components/info";
import { ViewDS } from "../(DIRECTOR)/components/view";
import { NotRegistration } from "./unregistered/noRegistration";
import { useSupervisorDefault } from "../../../src/hooks/customHooks";
import { ColorItem } from "../../styles/StylesGlobal";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { IconCheckboxMultipleCircle, IconCustomUser } from "../../../assets/icons/IconsGlobal";
import { ModalComponente } from "./Modals/customModal";
import CSnackbar from "./Snackbar";
import { updateSupervisorDefault } from "../../../src/services/fetchData/fetchSupervisor";
import { UseFlatList } from "./FlatList/customFlatList";

export const ListItemComponent = ({
  getDataAll,
  getDataOne,
  deleteData,
  modalTitle = "Info",
  isSupervisor = false,
}) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const supervisordefault = useSupervisorDefault();
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Estado para controlar la visibilidad del Snackbar
  const [selectedItemForSnackbar, setSelectedItemForSnackbar] = useState(null); // Estado para guardar el item que activó el Snackbar

  useEffect(() => {
    if (
      supervisordefault &&
      supervisordefault.data &&
      supervisordefault.data.length > 0
    ) {
      setSelectedItemId(supervisordefault.data[0].persona);
    }
  }, [supervisordefault]);

  const fetchItems = useCallback(async () => {
    const res = await getDataAll();
    setItems(res);
  }, [getDataAll]);

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [fetchItems])
  );

  const handleInfoPress = async (cedula) => {
    try {
      setModalVisible(true);
      const res = await getDataOne(cedula);
      const itemselected = res.find((value) => value.cedula === cedula);
      if (itemselected) {
        setSelectedItem(itemselected);
      } else {
        setSelectedItem(null);
      }
    } catch (error) {
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
              await deleteData(itemId);
              setItems(items.filter((item) => item.cedula !== itemId));
              Alert.alert(`${modalTitle} eliminado con éxito`);
            } catch (error) {
              const a = isSupervisor ? error.message : null;
              Alert.alert(
                `Error al eliminar el ${modalTitle.toLowerCase()}`,
                a
              );
            }
          },
        },
      ]
    );
  };
  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  const handleSelectItem = async () => {
    if (selectedItemForSnackbar) {
      try {
        await updateSupervisorDefault(selectedItemForSnackbar);
        setSelectedItemId(selectedItemForSnackbar);
        setSnackbarVisible(false);
      } catch (error) {
        console.error("Error al actualizar el supervisor por defecto:", error);
      }
    }
  };

  const handleLongPress = (itemId) => {
    if (selectedItemId === itemId) return;
    setSnackbarVisible(true);
    setSelectedItemForSnackbar(itemId);
  };

  // if (items.length === 0) {
  //   return <NotRegistration />;
  // }

  return (
    <>
    <UseFlatList
    // onRefresh={fetchItems}
          data={items}
          renderItem={({ item, index }) => (
            <ListSwipeable
              key={`unique${item.docente_id}-${index}`}
              item={item}
              typeid="cedula"
              handleDeletePress={handleDeletePress}
              handleInfoPress={handleInfoPress}
              icono={IconCustomUser}
              isdocente={
                isSupervisor &&
                selectedItemId === item.id && (
                  <IconCheckboxMultipleCircle
                  size={20}
                    color={ColorItem.DeepSkyBlue}
                  />
                )
              }
            >
              <TouchableOpacity
                onLongPress={() => {
                  if (isSupervisor) {
                    handleLongPress(item.id);
                  }
                }}
                style={{
                  flexDirection: "row",
                }}
                onPress={() =>
                  navigation.navigate(`FormScreen${modalTitle}`, {
                    cedula: item.cedula,
                  })
                }
              >
                <ViewDS item={item} />
              </TouchableOpacity>
            </ListSwipeable>
          )}
          ListEmptyComponent={<NotRegistration />}
        />


      {isSupervisor && snackbarVisible && (
        <CSnackbar
          handleSelectItem={handleSelectItem}
          handleSnackbarDismiss={handleSnackbarDismiss}
        />
      )}
      <ModalComponente
        modalStyle={{
          height: "70%",
        }}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        canCloseModal={true}
        title={`Datos del ${modalTitle}`}
      >
        {selectedItem ? (
          <InfoDS selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </>
  );
};