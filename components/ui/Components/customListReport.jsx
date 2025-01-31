import { useState } from "react";
import Loading from "../../share/loading";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import {IconReport } from "../../../assets/icons/IconsGlobal";
import { ModalComponente } from "./Modals/customModal";
import { useReporteAll } from "../../../src/hooks/customHooks";
import { UseFlatList } from "./FlatList/customFlatList";
import { ListReport } from "../(DIRECTOR)/reportes/components/listFilterR";
import { NotRegistration } from "./unregistered/noRegistration";
import {getReportId } from "../../../src/services/fetchData/fetchReporte";
import { ItemReporteId } from "../(DIRECTOR)/reportes/components/listRepor";

export const ListItemReport = ({
  filterdata = null,
}) => {
  const { reporteALL, reload, fetchReporteAll } = useReporteAll();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleInfoPress = async (id) => {
    try {
      if (!id) {
        throw new Error("Reporte ID no encontrado");
      }
      setModalVisible(true);
      const res = await getReportId(id);
      const itemselected = res.find((value) => value.reporte_id === id);
      if (itemselected) {
        setSelectedItem(itemselected);
      } else {
        setSelectedItem(null);
        setModalVisible(false);
        throw new Error("Horario no encontrado");
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

  const dataReporte =
    filterdata !== undefined && filterdata !== null ? filterdata : reporteALL;

  if (reload) {
    return <Loading />;
  }
  return (
    <>
      <UseFlatList
       refreshing={reload}
       onRefresh={fetchReporteAll}
        data={dataReporte}
        renderItem={({ item, index }) =>(
          <ListSwipeable
          typeid="reporte_id"
          handleInfoPress={handleInfoPress}
          showrightContent={false}
          key={`unique${index}-${item.reporte_id}`}
          item={item}
          icono={IconReport}
          isFiltered={Boolean(filterdata)}
        >
          <ListReport data={item} />
        </ListSwipeable>
        )}
        ListEmptyComponent={<NotRegistration />}
      />
      <ModalComponente
        modalStyle={{ height: "80%" }}
        modalVisible={modalVisible}
        title="Datos del Reporte"
        handleCloseModal={handleCloseModal}
      >
        {reload ? (
          <Loading />
        ) : selectedItem ? (
          <ItemReporteId selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </>
  );
};