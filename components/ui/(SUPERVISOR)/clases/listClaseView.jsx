import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "../../../styles/StylesGlobal";
import { getClaseSupervisorSalonHorarioDia } from "../../../../src/services/fetchData/fetchClases";
import {
  useDays,
  useHorarioAll,
  useSalonAll,
} from "../../../../src/hooks/customHooks";
import { userData } from "../../../../src/hooks/use/userData";
import { ScrollMultipleFilterClass } from "../../Components/filters/CarouselFilter";
import { UseFlatList } from "../../Components/FlatList/customFlatList";
import { ModalComponente } from "../../Components/Modals/customModal";
import { CustomSeachBar } from "../../Components/searchBar/seachBar";
import { BtnDeleteFilter } from "../../../share/button/Delete_Filter";
import { ListItemAccordion } from "../../Components/listItem.accordion/ListItemA";
import { ContentClasS } from "./components/context";
import { ExpandedClassS } from "./components/expanded";
import Loading from "../../../share/loading";
import UseListCheckbox from "../../../share/checkbox/checkbox";

export const ListClassView = () => {
  const { CEDULA } = userData();
  const [classbysupervisor, setClassBySupervisor] = useState([]); // Datos mostrados por defecto
  // Opciones de filtros
  const [filters, setFilters] = useState({ salon: 0, dia: 0, horario: 0 }); //filtros APICO
  const [reloading, setReloading] = useState(true);
  const [additionalData, setAdditionalData] = useState([]); // los datos que se additional de acuerdo al filtro
  const [modalSelect, setModalSelect] = useState(false); //modal
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]); //lists de las opciones

  // manejo de selecciones
  const [multipleSelectedOption, setMultipleSelectedOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multipleSelectedItem, setMultipleSelectedItem] = useState({});
  const [temporalSelectedItem, setTemporalSelectedItem] = useState({});

  const [opciones, setOpciones] = useState([
    {
      isSelected: false,
      id: "salones",
      title: "Salones",
      action: "salones",
    },
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
  const { salones } = useSalonAll(); 
  const diall = useDays();
  const { horarios } = useHorarioAll();
  const fetchFilteredClasses = async () => {
    const { salon, dia, horario } = filters;

    try {
      const response = await getClaseSupervisorSalonHorarioDia(
        CEDULA,
        salon,
        dia,
        horario
      );
      if (!salon && !dia && !horario) {
        setClassBySupervisor(response);
        setReloading(false);
      } else {
        setAdditionalData(response);
        setReloading(false);
      }
    } catch (error) {
      setReloading(true);
      console.error("Error fetching filtered classes:", error);
    }
  };
  useEffect(() => {
    fetchFilteredClasses();
  }, [filters]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setMultipleSelectedOption((prev) => {
      if (prev.includes(option) && multipleSelectedItem[option]) {
        return prev;
      } else {
        return [...prev, option];
      }
    });

    const optionMapping = {
      salones: salones,
      dia: diall,
      horarios: horarios,
    };
    setList(optionMapping[option] || []);
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
    } else if (selectedOption === "horarios") {
      setList(
        horarios.filter(
          (i) =>
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }else {
      setList(
        diall.filter(
          (i) =>
            i.Dia.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

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
        salon: updated.salones && updated.salones.id ? updated.salones.id : 0,
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
          : opt
      );

      const updatedFilters = {
        salon: temporalSelectedItem.salones
          ? temporalSelectedItem.salones.id
          : multipleSelectedItem.salones?.id || 0,
        dia: temporalSelectedItem.dia
          ? temporalSelectedItem.dia.id
          : multipleSelectedItem.dia?.id || 0,
        horario: temporalSelectedItem.horarios
          ? temporalSelectedItem.horarios.id
          : multipleSelectedItem.horarios?.id || 0,
      };

      setOpciones(updatedOpciones);
      setFilters(updatedFilters);
      fetchFilteredClasses();
      setModalSelect(false);
      setTemporalSelectedItem({});
    } else {
      alert("Debe seleccionar al menos un filtro antes de aplicar.");
    }
  };
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

  if (reloading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollMultipleFilterClass
          opciones={opciones}
          handleOptionSelect={handleOptionSelect}
        />
      </View>

      {/* Información mostrada por defecto */}
      {!Object.keys(multipleSelectedItem).length && (
        <UseFlatList
          data={classbysupervisor}
          renderItem={({ item }) => (
            <ListItemAccordion
              content={<ContentClasS data={item} />}
              expande={<ExpandedClassS data={item} />}
            />
          )}
        />
      )}

      {/* Lista desplegable según el filtro seleccionado */}
      <ModalComponente
        linearDiviider={true}
        handleCloseModal={closemodal}
        modalStyle={{ height: "75%" }}
        modalVisible={modalSelect}
        canCloseModal={true}
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
        renderItem={({ item }) => (
          <UseListCheckbox
            data={item}
            selectedOption={selectedOption}
            onPress={handleItemPress}
            key={item.id.toString()}
            temporalSelectedItem={temporalSelectedItem}
            multipleSelectedItems={multipleSelectedItem}
            renderText={
              selectedOption === "horarios"
                ? `${item.asignatura}`
                : selectedOption === "salones"
                ? `${item.numero_salon} - ${item.nombre}`
                : item.Dia
            }
          />
        )}
      />

      {/* Información filtrada */}
      {Object.keys(multipleSelectedItem).length > 0 && additionalData && (
        <UseFlatList
          data={additionalData}
          keyExtractor={(item) =>
            selectedOption === "salones"
              ? `${item.salon}-${item.id}`
              : selectedOption === "dia"
              ? `${item.id}-${item.dia}`
              : `${item.id}-H${item.horario}`
          }
          renderItem={({ item }) => (
            <ListItemAccordion
              content={<ContentClasS data={item} />}
              expande={<ExpandedClassS data={item} />}
            />
          )}
        />
      )}
    </View>
  );
};