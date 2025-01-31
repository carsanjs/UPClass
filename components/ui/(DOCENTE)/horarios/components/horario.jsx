import { Alert } from "react-native";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { userData } from "../../../../../src/hooks/use/userData";
import { ScrollMultipleFilterClass } from "../../../Components/filters/CarouselFilter";
import {
  getDetailHorario2,
  getDetailHorarioDia,
} from "../../../../../src/services/fetchData/fetchDetailHorario";
import {
  useDays,
  useHorarioDocenteCedula,
} from "../../../../../src/hooks/customHooks";
import { UseFlatList } from "../../../Components/FlatList/customFlatList";
import { ModalComponente } from "../../../Components/Modals/customModal";
import { CustomSeachBar } from "../../../Components/searchBar/seachBar";
import { BtnDeleteFilter } from "../../../../share/button/Delete_Filter";
import { ContentHorarioD } from "./context";
import { ExpandedHorarioD } from "./expanded";
import { NotRegistration } from "../../../Components/unregistered/noRegistration";
import { ListItemAccordion } from "../../../Components/listItem.accordion/ListItemA";
import UseListCheckbox from "../../../../share/checkbox/checkbox";

export const IndexHorarioDocente = () => {
  const { CEDULA } = userData();
  const horarioxdocente = useHorarioDocenteCedula(CEDULA);
  const diall = useDays();
  const [filters, setFilters] = useState({ dia: 0, horario: 0 }); //filtros API
  const [additionalData, setAdditionalData] = useState([]); // los datos que se additional de acuerdo al filtro
  const [modalSelect, setModalSelect] = useState(false); //modal
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);
  // manejo de selecciones
  const [multipleSelectedOption, setMultipleSelectedOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multipleSelectedItem, setMultipleSelectedItem] = useState({});
  const [temporalSelectedItem, setTemporalSelectedItem] = useState({});

  const [opciones, setOpciones] = useState([
    {
      isSelected: false,
      id: "horarios",
      title: "Horarios",
      action: "horarios",
    },
    {
      isSelected: false,
      id: "dia",
      title: "Días",
      action: "dia",
    },
  ]);

  const fetchHorario = async () => {
    const { dia, horario } = filters;
    try {
      if (horario && !dia) {
        const response = await getDetailHorario2(horario);
        setAdditionalData(response);
      } else if (dia && !horario) {
        const response = await getDetailHorarioDia(CEDULA, dia);
        setAdditionalData(response);
      }
    } catch (error) {
      console.log(error);
      setAdditionalData([]);
    }
  };

  useEffect(() => {
    fetchHorario();
  }, [filters]);

  const handleOptionSelect = (option) => {
    setSearchText("");

    // Verifica si el usuario intenta seleccionar 'día' cuando el filtro 'horarios' ya está seleccionado
    if (option === "dia" && multipleSelectedItem.horarios) {
      return Alert.alert(
        "Desea borrar el filtro?",
        "Para filtrar por día, debes borrar el filtro del HORARIO establecido.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              setMultipleSelectedOption((prev) =>
                prev.filter((f) => f !== "horarios")
              );
              removeFilter("horarios");
              OptionSelect(option);
            },
          },
        ]
      );
    }

    // Verifica si el usuario intenta seleccionar 'horarios' cuando el filtro 'día' ya está seleccionado
    if (option === "horarios" && multipleSelectedItem.dia) {
      return Alert.alert(
        "Desea borrar el filtro?",
        "Para filtrar por horario, debes borrar el filtro del DÍA establecido.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              setMultipleSelectedOption((prev) =>
                prev.filter((f) => f !== "dia")
              );
              removeFilter("dia");
              OptionSelect(option);
            },
          },
        ]
      );
    }

    OptionSelect(option); // Si no hay conflicto con filtros previos, selecciona el nuevo filtro
  };

  const OptionSelect = (option) => {
    setSelectedOption(option);

    setMultipleSelectedOption((prev) => {
      if (prev.includes(option) && multipleSelectedItem[option]) {
        return prev;
      } else {
        return [...prev, option];
      }
    });

    const optionMapping = {
      dia: diall,
      horarios: horarioxdocente,
    };

    setList(optionMapping[option] || []);
    setModalSelect(true);
  };

  const handleItemPress = (item, isSelected) => {
    setTemporalSelectedItem((prev) => ({
      ...prev,
      [selectedOption]: isSelected ? item : null,
    }));
  };

  const removeFilter = (Idkey) => {
    const updatedOpciones = opciones.map((opt) =>
      opt.id === Idkey ? { ...opt, isSelected: false } : opt
    );
    setMultipleSelectedItem((prev) => {
      const updated = { ...prev };

      if (updated[Idkey]) {
        delete updated[Idkey];
      }
      const updatedFilters = {
        dia: updated.dia && updated.dia.id ? updated.dia.id : 0,
        horario:
          updated.horarios && updated.horarios.id ? updated.horarios.id : 0,
      };
      setFilters(updatedFilters);
      setOpciones(updatedOpciones);
      return updated;
    });
  };
  const applyFilter = () => {
    const hasTemporarySelection = Object.keys(temporalSelectedItem).length > 0;

    if (hasTemporarySelection || Object.keys(multipleSelectedItem).length > 0) {
      setMultipleSelectedItem((prev) => ({
        ...prev,
        ...temporalSelectedItem,
      }));

      const updatedOpciones = opciones.map((opt) =>
        multipleSelectedOption.includes(opt.id)
          ? { ...opt, isSelected: true }
          : { ...opt, isSelected: false }
      );

      const updatedFilters = {
        dia: temporalSelectedItem.dia
          ? temporalSelectedItem.dia.id
          : multipleSelectedItem.dia?.id || 0,
        horario: temporalSelectedItem.horarios
          ? temporalSelectedItem.horarios.id
          : multipleSelectedItem.horarios?.id || 0,
      };

      setOpciones(updatedOpciones);
      setFilters(updatedFilters);
      setModalSelect(false);
      setTemporalSelectedItem({});
    } else {
      alert("Debe seleccionar al menos un filtro antes de aplicar.");
    }
  };
  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "horarios") {
      setList(
        horarioxdocente.filter(
          (i) =>
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "dia") {
      setList(
        diall.filter(
          (i) => i.Dia.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const handleFilter = () => {
    const hasTemporalSelection = temporalSelectedItem[selectedOption]
      ? Object.keys(temporalSelectedItem[selectedOption]).length > 0
      : false;

    const hasExistingSelection = multipleSelectedItem[selectedOption]
      ? Object.keys(multipleSelectedItem[selectedOption]).length > 0
      : false;

    if (!hasTemporalSelection && !hasExistingSelection) {
      Alert.alert(
        "Selección requerida",
        "Para filtrar debe tener un item seleccionado"
      );
    } else {
      applyFilter();
    }
  };

  const closemodal = () => {
    if (!multipleSelectedItem[selectedOption]) {
      setMultipleSelectedOption((prev) =>
        prev.filter((option) => option !== selectedOption)
      );
    }
    setModalSelect(false);
  };

  return (
    <View>
      <ScrollMultipleFilterClass
        opciones={opciones}
        handleOptionSelect={handleOptionSelect}
        removeFilter={removeFilter}
      />

      {/* // la lista que se mostrara por default */}
      {!Object.keys(multipleSelectedItem).length && (
         <UseFlatList
            data={horarioxdocente}
            renderItem={({item}) => (
              <ListItemAccordion
              content={<ContentHorarioD item={item}/>}
              expande={<ExpandedHorarioD item={item}/>}
              />
            )}
            keyExtractor={(item) =>item.id}
            ListEmptyComponent={<NotRegistration/>}
            />
      )}

      {/* // la lista que se muestra cuando se selecciona un filtro */}
      <ModalComponente
        modalStyle={{ height: "75%" }}
        modalVisible={modalSelect}
        handleCloseModal={closemodal}
        title={`Seleccione ${selectedOption}`}
        childrenStatic={
          <CustomSeachBar
            searchText={searchText}
            setSearchText={setSearchText}
            selectedOption={selectedOption}
          />
        }
        bottomStatic={
          <BtnDeleteFilter
            handleFilter={handleFilter}
            removeFilter={removeFilter}
            multipleSelectedItem={multipleSelectedItem}
            selectedOption={selectedOption}
          />
        }
        data={list}
        renderItem={({ item, index }) => (
          <UseListCheckbox
          data={item}
          key={
            selectedOption === "horario"
              ? `${item.id_class}_${item.fecha}_${index}`
              : `${item.Dia}_${index}`
          }
          selectedOption={selectedOption}
          onPress={handleItemPress}
          temporalSelectedItem={temporalSelectedItem}
          multipleSelectedItems={multipleSelectedItem}
          renderText={selectedOption === "horarios" ? (
            `${item.numero_salon} - ${item.asignatura}`
          ) : (
            item.Dia
          )}
          />
        )}
      />

      {/* Información filtrada */}
      {Object.keys(multipleSelectedItem).length > 0 && additionalData && (
        <UseFlatList
          data={additionalData}
          renderItem={({item}) => (
            <ListItemAccordion
            content={<ContentHorarioD type={selectedOption} item={item}/>}
            expande={<ExpandedHorarioD item={item}/>}
            />
          )}
          keyExtractor={(item, index) =>
            selectedOption === "horarios"
              ? `${item.id_class}_${item.fecha}_${index}`
              : `${item.Dia}_${index}`
          }
        />
      )}
    </View>
  );
};