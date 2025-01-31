import { useEffect, useState } from "react";
import {SafeAreaView } from "react-native";
import {
  useComentarioDocenteCedula,
  useComentarioDocenteSalon,
  useSalonAll,
} from "../../../../../src/hooks/customHooks";
import { userData } from "../../../../../src/hooks/use/userData";
import { ChildFilter } from "../../../(SUPERVISOR)/components/chid/chidFilter";
import { NotRegistration } from "../../../Components/unregistered/noRegistration";
import { ModalComponente } from "../../../Components/Modals/customModal";
import { CustomSeachBar } from "../../../Components/searchBar/seachBar";
import { UseFlatList } from "../../../Components/FlatList/customFlatList";
import { BtnDeleteFilterReporte } from "../../../../share/button/Delete_Filter";
import { ContentComentarioD } from "./content";
import { ListItemAccordion } from "../../../Components/listItem.accordion/ListItemA";
import { ExpandedComentD } from "./expanded";
import UseListCheckbox from "../../../../share/checkbox/checkbox";

export const IndexComentarioDocente = () => {
  const { CEDULA } = userData();
  const {salones} = useSalonAll();
  const reportdefault = useComentarioDocenteCedula(CEDULA); // lista que se muestra por defecto

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
    const Maping = { salon: salones };
    setList(Maping[option] || []);
    setModalSelect(true);
  };

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "salon") {
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

  const comentarioDocenteSalon = useComentarioDocenteSalon(
    CEDULA,
    selectedItem ? selectedItem.id : 0
  );
  useEffect(() => {
    if (selectedItem && selectedOption === "salon") {
      setAdditionalData(comentarioDocenteSalon);
    }
  }, [selectedItem, selectedOption, comentarioDocenteSalon]);

  const handleCloseSelectOption = async () => {
    setModalSelect(false);
    setSearchText("");
    setSelectedOption(null);
    setSelectedItem(null);
    setTemporarySelection(null);
    setList([]);
  };

  const applyFilter = () => {
    if (temporarySelection) {
      setSelectedItem(temporarySelection);
      setModalSelect(false);
    }
  };

  return (
    <>
      <SafeAreaView>
        <ChildFilter
          selectedItem={selectedItem}
          title="Salones "
          action={() => handleOptionSelect("salon")}
        />

        {/* //informacion que se mostrara por default */}
        {!selectedOption && (
          <UseFlatList
            data={reportdefault}
            renderItem={({ item }) => (
              <ListItemAccordion
              expande={<ExpandedComentD data={item}/>}
              content={<ContentComentarioD data={item}/>}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<NotRegistration />}
          />
        )}

        {/* //informacion que se mostrara segun el filtro seleccionado */}
        {selectedItem && (
          <>
            {selectedOption === "salon" && additionalData && (
              <UseFlatList
                data={additionalData}
                renderItem={({ item }) => 
                  <ListItemAccordion
                expande={<ExpandedComentD data={item}/>}
                content={<ContentComentarioD data={item}/>}
                />
                }
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </>
        )}
      </SafeAreaView>

      {/* //lista desplegable segun el filtro seleccionado*/}
      <ModalComponente
        modalStyle={{ height: "75%" }}
        handleCloseModal={handleCloseSelectOption}
        modalVisible={modalSelect}
        title={`Seleccione ${selectedOption}`}
        canCloseModal={true}
        linearDiviider={true}
        bottomStatic={
          <BtnDeleteFilterReporte
            selectedItem={selectedItem}
            applyFilter={applyFilter}
            handleCloseSelectOption={handleCloseSelectOption}
          />
        }
        childrenStatic={
          <CustomSeachBar
            searchText={searchText}
            setSearchText={setSearchText}
            selectedOption={selectedOption}
          />
        }
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <UseListCheckbox
        data={item}
        renderText={`${item.nombre} - ${item.numero_salon}` }
        temporalSelectedItem={temporarySelection}
        key={item.id.toString()}
        selectedOption={selectedOption}
        onPress={handleItemPress}
        />
        )}
      />
    </>
  );
};
