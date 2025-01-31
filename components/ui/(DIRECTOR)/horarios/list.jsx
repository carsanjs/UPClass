import { useEffect, useState } from "react";
import {
  getDetailHorario2,
  getDetailHorarioDia,
  getDetailHorarioDocente,
} from "../../../../src/services/fetchData/fetchDetailHorario";
import { ListItemComponentHorario } from "../../Components/customListHorario";
import { Alert, View } from "react-native";
import { CustomSeachBar } from "../../Components/searchBar/seachBar";
import { ModalComponente } from "../../Components/Modals/customModal";
import { BtnDeleteFilter } from "../../../share/button/Delete_Filter";
import {
  useDays,
  useDocenteAll,
  useHorarioAll,
} from "../../../../src/hooks/customHooks";
import {
  capitalizeFirstLetter,
  FilterDuplicate,
  truncateText,
} from "../../../../src/utils/functiones/functions";
import { ScrollMultipleFilterClass } from "../../Components/filters/CarouselFilter";
import UseListCheckbox from "../../../share/checkbox/checkbox";
import Loading from "../../../share/loading";
export const ListHorario = () => {
  let { horarios, reload } = useHorarioAll();
  horarios = FilterDuplicate(horarios, "asignatura");
  const dias = useDays();
  const docenteall = useDocenteAll();
  const [searchText, setSearchText] = useState("");
  // Opciones de filtros
  const [filters, setFilters] = useState({ docente: 0, dia: 0, horario: 0 });
  const [modalSelect, setModalSelect] = useState(false);
  const [list, setList] = useState([]);
  // manejo de selecciones
  const [selectedOption, setSelectedOption] = useState(null);
  const [additionalData, setAdditionalData] = useState([]);
  const [multipleSelectedOption, setMultipleSelectedOption] = useState([]);
  const [multipleSelectedItem, setMultipleSelectedItem] = useState({});
  const [temporalSelectedItem, setTemporalSelectedItem] = useState({});

  const [opciones, setOpciones] = useState([
    {
      id: "docente",
      isSelected: false,
      title: "Docente",
      // icon: <IconUserCircle size={24} color="black" />,
      action: "docente",
    },
    {
      id: "horario",
      isSelected: false,
      title: "Horario",
      // icon: <IconTimeTable />,
      action: "horario",
    },
    {
      id: "dia",
      isSelected: false,
      title: "Dia",
      // icon: <IconCalendar size={24} color="black" />,
      action: "dia",
    },
  ]);

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "horario") {
      setList(
        horarios.filter(
          (i) =>
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "dia") {
      setList(
        dias.filter(
          (i) => i.Dia.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "docente") {
      setList(
        docenteall.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.apellido.toString().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const handleOptionSelect = (option) => {
    const showAlertAndRemoveFilters = (message, filtersToRemove) => {
      Alert.alert("Desea borrar el filtro?", message, [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setMultipleSelectedOption((prev) =>
              prev.filter((f) => !filtersToRemove.includes(f))
            );
            filtersToRemove.forEach((filter) => removeFilter(filter));
            OptionSelect(option);
          },
        },
      ]);
    };

    if (option === "dia" && !multipleSelectedItem.docente) {
      return Alert.alert(
        "Falta filtro docente",
        "Para filtrar por Días, debes seleccionar primero un docente."
      );
    }

    if (option === "docente" && multipleSelectedItem.horario) {
      return showAlertAndRemoveFilters(
        "Para filtrar por docente, debes borrar el filtro del HORARIO establecido.",
        ["horario"]
      );
    }

    if (
      option === "horario" &&
      multipleSelectedItem.docente &&
      multipleSelectedItem.dia
    ) {
      return showAlertAndRemoveFilters(
        "Para filtrar por horario, se deben borrar el filtro del DIA Y DOCENTE establecido.",
        ["dia", "docente"]
      );
    }
    if (option === "horario" && multipleSelectedItem.docente) {
      return showAlertAndRemoveFilters(
        "Para filtrar por horario, debes borrar el filtro del DOCENTE establecido.",
        ["docente"]
      );
    }
    OptionSelect(option);
  };

  const OptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setMultipleSelectedOption((prev) => {
      if (prev.includes(option)) {
        return prev;
      } else {
        return [...prev, option];
      }
    });
    const optionMapping = {
      docente: docenteall,
      horario: horarios,
      dia: dias,
    };
    setList(optionMapping[option] || []);
    setModalSelect(true);
  };


  useEffect(() => {
    const fetchAdditionalData = async () => {
      const { docente, dia, horario } = filters;

      if (docente === 0 && horario === 0 && dia === 0) {
        setAdditionalData(null); 
        return; 
      }
  
      try {
        let filteredData;
         if (docente && docente !== 0 && dia && dia !== 0) {
          filteredData = await getDetailHorarioDia(docente, dia);
        } 
        else if (docente && docente !== 0) {
          filteredData = await getDetailHorarioDocente(docente);
        } 
        else if (horario && horario !== 0) {
          filteredData = await getDetailHorario2(horario);
        } 
        setAdditionalData(filteredData);
      } catch{
        setAdditionalData([]);
      }
    };
  
    fetchAdditionalData();
  }, [filters]);

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
        docente:
          updated.docente && updated.docente.cedula
            ? updated.docente.cedula
            : 0,
        dia: updated.dia && updated.dia.id ? updated.dia.id : 0,
        horario: updated.horario && updated.horario.id ? updated.horario.id : 0,
      };
      setFilters(updatedFilters);
      setOpciones(updatedOpciones);
      return updated;
    });
  };

  const applyFilter = () => {
    const hasSelectedFilters =
      Object.keys(temporalSelectedItem).length > 0 ||
      Object.keys(multipleSelectedItem).length > 0;

    if (hasSelectedFilters) {
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
        docente: temporalSelectedItem.docente
          ? temporalSelectedItem.docente.cedula
          : multipleSelectedItem.docente?.cedula || 0,
        dia: temporalSelectedItem.dia
          ? temporalSelectedItem.dia.id
          : multipleSelectedItem.dia?.id || 0,
        horario: temporalSelectedItem.horario
          ? temporalSelectedItem.horario.id
          : multipleSelectedItem.horario?.id || 0,
      };
      setOpciones(updatedOpciones);
      setFilters(updatedFilters);
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

  if (reload) {
    return <Loading />;
  }


  return (
    <>
      <View
        style={{
          flexDirection: "row-reverse",
        }}
      >
        <ScrollMultipleFilterClass
          opciones={opciones}
          handleOptionSelect={handleOptionSelect}
        />
        {/* {Object.keys(multipleSelectedItem).length > 0 && additionalData && (
          
        )} */}
      </View>

      {!Object.keys(multipleSelectedItem).length && (
        <ListItemComponentHorario modalTitle="Horario" />
      )}

      <ModalComponente
        modalStyle={{
          height: "80%",
        }}
        title={`Seleccione ${selectedOption}`}
        modalVisible={modalSelect}
        canCloseModal={true}
        handleCloseModal={closemodal}
        childrenStatic={
          <CustomSeachBar
            searchText={searchText}
            selectedOption={selectedOption}
            setSearchText={setSearchText}
          />
        }
        linearDiviider={true}
        bottomStatic={
          <BtnDeleteFilter
            handleFilter={handleFilter}
            multipleSelectedItem={multipleSelectedItem}
            removeFilter={removeFilter}
            selectedOption={selectedOption}
          />
        }
        data={list}
        renderItem={({ item }) => (
          <UseListCheckbox
            data={item}
            selectedOption={selectedOption}
            multipleSelectedItems={multipleSelectedItem}
            onPress={handleItemPress}
            temporalSelectedItem={temporalSelectedItem}
            key={
              selectedOption === "dia"
                ? `${item.id}_${item.Dia}`
                : selectedOption === "docente"
                ? `${item.docente_id}-${item.cedula}`
                : selectedOption === "horario"
                ? `${item.id}-${item.cedula}`
                : undefined
            }
            renderText={
              selectedOption === "horario"
                ? truncateText(item.asignatura, 16)
                : selectedOption === "docente"
                ? `${capitalizeFirstLetter(
                    item.nombre
                  )} - ${capitalizeFirstLetter(item.apellido)}`
                : item.Dia
            }
          />
        )}
      />
      {Object.keys(multipleSelectedItem).length > 0  && additionalData && (
        <ListItemComponentHorario
          additionalData={additionalData}
          modalTitle="Horario"
        />
      )}
    </>
  );
};

{
  /* <PopupMenu
          topM={105}
          rightM={20}
          opcions={opciones}
          handleOptionSelect={handleOptionSelect}
        /> */
}