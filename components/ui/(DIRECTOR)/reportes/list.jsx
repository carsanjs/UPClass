import { useState, useEffect } from "react";
import { View } from "react-native";
import ListItem from "./listaitem";
import { PopupMenu } from "../../Components/popupMenu";
import {
  getReportClase2,
  getReportSalon2,
} from "../../../../src/services/fetchData/fetchReporte";
import { useClasesAll, useSalonAll } from "../../../../src/hooks/customHooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ModalComponente } from "../../Components/Modals/customModal";
import { ChildFilterX } from "../../Components/filters/chidFilter";
import { CustomSeachBar } from "../../Components/searchBar/seachBar";
import {
  IconClassRoom,
} from "../../../../assets/icons/IconsGlobal";
import { ListItemReport } from "../../Components/customListReport";

export const ReportView_Filter = () => {
  const classAll = useClasesAll();
  const { salones } = useSalonAll();
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [list, setList] = useState([]); // list con la información de los datos filtrados
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);
    const maping = {
      salones: salones,
      clases: classAll,
    };
    setList(maping[option] || []);
    setShowModal(true);
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
    } else if (selectedOption === "clases") {
      setList(
        classAll.filter(
          (i) =>
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.numero_salon.toString().indexOf(searchText) > -1 ||
            i.docente_nombre.toLowerCase().indexOf(searchText.toLowerCase()) >
              -1 ||
            i.docente_apellido.toLowerCase().indexOf(searchText.toLowerCase()) >
              -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const handleSearchBarClear = () => {
    setSearchText("");
    setShowSearchBar(false);
    setSelectedOption(null);
    setAdditionalData(null);
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
          if (selectedOption === "salones") {
            data = await getReportSalon2(selectedItem.id);
          } else if (selectedOption === "clases") {
            data = await getReportClase2(selectedItem.id);
          }
          setAdditionalData(data);
        } catch {
          setAdditionalData([]);
        }
      }
    };

    fetchAdditionalData();
  }, [selectedItem, selectedOption]);

  const filClassRoom = [
    {
      id: "clases",
      title: "clases",
      icon: <IconClassRoom color="black" size={24} />,
      action: () => handleOptionSelect("clases"),
    },
    {
      id: "salones",
      title: "salones",
      icon: (
        <MaterialCommunityIcons name="home-modern" size={24} color="black" />
      ),
      action: () => handleOptionSelect("salones"),
    },
  ];

  return (
    <>
      <View
        style={{
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        {showSearchBar ? "" : <PopupMenu topM={110} opcions={filClassRoom} />}
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
      </View>

      {showSearchBar && (
        <ModalComponente
          modalStyle={{
            height: "80%",
          }}
          modalVisible={showmodal}
          canCloseModal={true}
          title={`Seleccione ${selectedOption}`}
          handleCloseModal={handleSearchBarClear}
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
            <ListItem
              key={item.id}
              onPress={() => handleItemPress(item)}
              data={item}
              selectedOption={selectedOption}
            />
          )}
        ></ModalComponente>
      )}

      {!selectedOption && <ListItemReport />}

      {selectedItem && (
        <>
          {selectedOption && additionalData && (
            <ListItemReport
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
    </>
  );
};