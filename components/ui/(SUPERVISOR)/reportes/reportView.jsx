import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { getReportSupervisorCedulaSalon } from "../../../../src/services/fetchData/fetchReporte";
import {
  useReportSupervisorID,
  useSalonAll,
} from "../../../../src/hooks/customHooks";
import { userData } from "../../../../src/hooks/use/userData";
import { ChildFilter } from "../components/chid/chidFilter";
import { ModalComponente } from "../../Components/Modals/customModal";
import { CustomSeachBar } from "../../Components/searchBar/seachBar";
import { UseFlatList } from "../../Components/FlatList/customFlatList";
import { NotRegistration } from "../../Components/unregistered/noRegistration";
import { BtnDeleteFilterReporte } from "../../../share/button/Delete_Filter";
import { ListItemAccordion } from "../../Components/listItem.accordion/ListItemA";
import { ContentReportS } from "./components/content";
import { ExpandedReportS } from "./components/expanded";
import Loading from "../../../share/loading";
import UseListCheckbox from "../../../share/checkbox/checkbox";

export const ViewReportSup = () => {
  const { CEDULA } = userData();
  const { salones } = useSalonAll(); //
  const { ReportSupervisor, fetchReportSupervisorID, reload } = useReportSupervisorID(CEDULA);
  const [list, setList] = useState([]); // lista de los datos filtrados
  const [selectedOption, setSelectedOption] = useState(null); //
  const [searchText, setSearchText] = useState(""); // para buscar en searchBar
  const [selectedItem, setSelectedItem] = useState(null); // item de la lista  seleccionado

  const [additionalData, setAdditionalData] = useState([]);
  const [modalSelect, setModalSelect] = useState(false); // estado del modal
  const [temporarySelection, setTemporarySelection] = useState(null); // obtiene el item temporal mientras se le aplica en el boton de filtrar

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    const Maping = { salones: salones };
    setList(Maping[option] || []);
    setModalSelect(true);
  };

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "salones") {
      setList(
        salones.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.numero_salon.toString().indexOf(searchText) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const handleItemPress = (item, isSelected) => {
    if (isSelected) {
      setTemporarySelection(item);
    } else {
      setTemporarySelection(null);
    }
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem && selectedOption) {
        try {
          let data;
          if (selectedOption === "salones") {
            data = await getReportSupervisorCedulaSalon(
              CEDULA,
              selectedItem.id
            );
          }
          setAdditionalData(data);
        } catch {
          setAdditionalData([]);
        }
      }
    };
    fetchAdditionalData();
  }, [selectedItem, selectedOption]);

  const handleCloseSelectOption = async () => {
    setModalSelect(false);
    setSearchText("");
    setSelectedOption(null);
    setSelectedItem(null);
    setTemporarySelection(null)
    setList([]);
  };

  const applyFilter = () => {
    if (temporarySelection) {
      setSelectedItem(temporarySelection);
      setModalSelect(false);
    }
  };

  if (reload) {
    return <Loading />;
  }

  return (
    <>
      <SafeAreaView>
        <ChildFilter
          selectedItem={selectedItem}
          title="Salones "
          action={() => handleOptionSelect("salones")}
        />

        {/* //informacion que se mostrara por default */}
        {!selectedOption && (
          <UseFlatList
            onRefresh={fetchReportSupervisorID }
            refreshing={reload}
            data={ReportSupervisor}
            renderItem={({ item }) => (
              <ListItemAccordion
                content={<ContentReportS data={item} />}
                expande={<ExpandedReportS data={item} />}
              />
            )}
            keyExtractor={(item) =>
              `${item.reporte_id.toString()}-${item.clase_id.toString()}`
            }
            ListEmptyComponent={<NotRegistration />}
          />
        )}

        {/* //informacion que se mostrara segun el filtro seleccionado */}
        {selectedItem && (
          <>
            {selectedOption === "salones" && additionalData && (
              <UseFlatList
                data={additionalData}
                renderItem={({ item }) => (
                  <ListItemAccordion
                    content={<ContentReportS data={item} />}
                    expande={<ExpandedReportS data={item} />}
                  />
                )}
                keyExtractor={(item) =>
                  `${item.clase.toString()}-${item.docente_id}`
                }
              />
            )}
          </>
        )}
      </SafeAreaView>

      <ModalComponente
        modalStyle={{ height: "75%" }}
        handleCloseModal={handleCloseSelectOption}
        modalVisible={modalSelect}
        title={`Seleccione ${selectedOption}`}
        canCloseModal={true}
        childrenStatic={
          <CustomSeachBar
            searchText={searchText}
            setSearchText={setSearchText}
            selectedOption={selectedOption}
          />
        }
        bottomStatic={
          <BtnDeleteFilterReporte
            applyFilter={applyFilter}
            handleCloseSelectOption={handleCloseSelectOption}
            selectedItem={selectedItem}
          />
        }
        linearDiviider={true}
        data={list}
        renderItem={({ item }) => (
          <UseListCheckbox
          data={item}
          key={item.id.toString()}
          selectedOption={selectedOption}
          temporalSelectedItem={temporarySelection}
          onPress={handleItemPress}
          renderText={`${item.nombre} - ${item.numero_salon}` }
          />
        )}
      />
    </>
  );
};