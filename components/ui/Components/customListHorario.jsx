import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  DeleteDetailHorarioOne,
  getDetailHorarioByHorarioID,
} from "../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteClasesOne,
  getClassesByHorarioID,
} from "../../../src/services/fetchData/fetchClases";
import { ViewHorario } from "../(DIRECTOR)/horarios/component/viewHorario";
import { NotRegistration } from "./unregistered/noRegistration";
import { useHorarioAll } from "../../../src/hooks/customHooks";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { IconCalendar } from "../../../assets/icons/IconsGlobal";
import {
  DeleteHorarioOne,
  getHorarioOne,
} from "../../../src/services/fetchData/fetchHorarios";
import { UseFlatList } from "./FlatList/customFlatList";
import Loading from "../../share/loading";

export const ListItemComponentHorario = ({
  additionalData = null,
  modalTitle = "Info",
}) => {
  const navigation = useNavigation();
  const { horarios, fetchHorarioAll, reload } = useHorarioAll();

  const handleInfoPress = async (id) => {
    try {
      const res = await getHorarioOne(id);
      const itemSelected = res.find((value) => value.id === id);
      if (itemSelected) {
        navigation.navigate("InfoHours", {
          selectedItem: itemSelected,
        });
      } else {
        throw new Error("Horario no encontrado");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
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
              const detailHorarioD = await getDetailHorarioByHorarioID(itemId);
              await Promise.all(
                detailHorarioD.map(async (detailHorario) =>
                  DeleteDetailHorarioOne(detailHorario.id)
                )
              );
              const claseD = await getClassesByHorarioID(itemId);
              await Promise.all(
                claseD.map((clase) => DeleteClasesOne(clase.id))
              );
              await DeleteHorarioOne(itemId);
              Alert.alert(`${modalTitle} eliminado con éxito`);
              fetchHorarioAll();
            } catch{
              Alert.alert(`Error al eliminar el ${modalTitle.toLowerCase()}`);
            }
          },
        },
      ]
    );
  };

  const dataHorario =
    additionalData !== null && additionalData !== undefined
      ? additionalData
      : horarios;

  if (reload) {
    return <Loading />;
  }

  return (
    <UseFlatList
      data={dataHorario}
      refreshing={reload}
      onRefresh={fetchHorarioAll}
      ListEmptyComponent={<NotRegistration />}
      keyExtractor={(item, index) => `unique${item.id}-${index}`}
      renderItem={({ item }) => (
        <ListSwipeable
          item={item}
          handleDeletePress={handleDeletePress}
          handleInfoPress={handleInfoPress}
          icono={IconCalendar}
          isFiltered={Boolean(additionalData)}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("FormScreenHorario", { id: item.id })
            }
          >
            <ViewHorario item={item} />
          </TouchableOpacity>
        </ListSwipeable>
      )}
    />
  );
};
