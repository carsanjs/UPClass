import { ListItemComentario } from "../../Components/customListComentario";
import { View } from "react-native";
import { PopupMenu } from "../../Components/popupMenu";
import { useState, useEffect } from "react";
import {
  getComentarioDocenteDocente,
  getComentarioSalonOne,
} from "../../../../src/services/fetchData/fetchComentario";
import { ListSelectItem } from "./components/listSelect";
import { useDocenteAll, useSalonAll } from "../../../../src/hooks/customHooks";
import { CustomSeachBar } from "../../Components/searchBar/seachBar";
import { ModalComponente } from "../../Components/Modals/customModal";
import { ChildFilterX } from "../../Components/filters/chidFilter";
import {
  IconClassRoom,
  IconUserCircle,
} from "../../../../assets/icons/IconsGlobal";

export const ListComentario = () => {
  const { salones } = useSalonAll();
  const docenteall = useDocenteAll();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);

  const [additionalData, setAdditionalData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);
    const Mapping = {
      docente: docenteall,
      salon: salones,
    };
    setList(Mapping[option] || []);
    setShowModal(true);
  };
  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "docente") {
      setList(
        docenteall.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.apellido.toString().indexOf(searchText.toLowerCase()) > -1
        )
      );
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

  const handleSearchBarClear = () => {
    setSearchText("");
    setShowSearchBar(false);
    setSelectedOption(null);
    setSelectedItem(null);
    setList([]);
    setShowModal(false);
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setList([]);
    setShowModal(false);
  };
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem) {
        try {
          let data;
          if (selectedOption === "docente") {
            data = await getComentarioDocenteDocente(selectedItem.cedula);
          } else if (selectedOption === "salon") {
            data = await getComentarioSalonOne(selectedItem.id);
          }
          setAdditionalData(data);
        } catch {
          setAdditionalData([]);
        }
      } else {
        setAdditionalData(null);
      }
    };
    fetchAdditionalData();
  }, [selectedItem, selectedOption]);

  const filDocenClass = [
    {
      title: "docente",
      icon: <IconUserCircle size={24} color="black" />,
      action: () => handleOptionSelect("docente"),
    },
    {
      title: "salon",
      icon: <IconClassRoom size={24} color="black" />,
      action: () => handleOptionSelect("salon"),
    },
  ];

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {selectedItem && (
          <>
            {selectedOption && additionalData && (
              <ChildFilterX
                title={selectedOption}
                selectedItem={selectedItem}
                action={handleSearchBarClear}
              />
            )}
          </>
        )}
        <PopupMenu rightM={10} topM={100} opcions={filDocenClass} />
      </View>

      {!selectedOption && <ListItemComentario modalTitle="Comentarios" />}

      {selectedItem && (
        <>
          {selectedOption && additionalData && (
            <ListItemComentario
              modalTitle="Comentarios"
              filterdata={
                additionalData === null
                  ? null
                  : additionalData.length === 0
                  ? []
                  : additionalData
              }
            />
          )}
        </>
      )}

      {showSearchBar && (
        <ModalComponente
          handleCloseModal={handleSearchBarClear}
          modalStyle={{ height: "90%" }}
          canCloseModal={true}
          title={`Seleccione un ${selectedOption}`}
          modalVisible={showModal}
          animationType="slide"
          transparent={false}
          childrenStatic={
            <CustomSeachBar
              handleSearchBarClear={handleSearchBarClear}
              searchText={searchText}
              selectedOption={selectedOption}
              setSearchText={setSearchText}
            />
          }
          data={list}
          renderItem={({ item }) => (
            <ListSelectItem
              key={item.id}
              onPress={() => handleItemPress(item)}
              data={item}
              selectedOption={selectedOption}
            />
          )}
        ></ModalComponente>
      )}
    </>
  );
};
