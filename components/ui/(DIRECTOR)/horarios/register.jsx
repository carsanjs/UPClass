import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  getHorarioOne,
  registerHorario,
  updateHorario,
} from "../../../../src/services/fetchData/fetchHorarios";
import { useEffect, useState } from "react";
import {
  horarioSchema,
  horarioEditSchema,
} from "../../../../src/utils/schemas/horarioSchema";
import asignaturajson from "./json/asignaturas.json";
import { RegisterDetailHorario } from "./detalleHorario/register";
import { CustomFlatList } from "../../../share/inputs/customFlatList";
import { SubmitButton } from "../../../share/button/submitButton";
import useToastMessage from "../../../share/ToasNotification";
import { useDocenteAll } from "../../../../src/hooks/customHooks";
import { ModalComponente } from "../../Components/Modals/customModal";

export const RegisterHorario = ({ navigation, route }) => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const mapDocente = useDocenteAll();

  const docente = mapDocente.map((item) => ({
    id: item.docente_id.toString(),
    label: `${item.nombre} ${item.apellido}`,
  }));

  const asignatura = asignaturajson.map((item) => ({
    id: item.asignatura,
    label: item.asignatura,
  }));

  const [horarioId, setHorarioId] = useState(null);
  const [idhorarioDetalle, setIdhorarioDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(editing ? horarioEditSchema : horarioSchema),
  });
  const SubmithandleCloseModal = () => {
    setShowModal(false);
    setHorarioId(null);
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.LOADING],
        type: "warning",
        id: APP_STATUS.LOADING,
      });
      navigation.setOptions({ headerTitle: "Actualizar horario" });
      (async () => {
        const response = await getHorarioOne(route.params.id);
        setIdhorarioDetalle(response[0].horarios[0].id_detallehorario);
        const value = response.find((doc) => doc.id === route.params.id);
        if (value) {
          setInitialValues({
            docente: value.docente_id,
            asignatura: value.asignatura,
          });
          reset({
            docente: value.docente_id,
            asignatura: value.asignatura,
          });
        } else {
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.ERROR],
            type: "danger",
            id: APP_STATUS.ERROR,
          });
        }
      })();
    }
  }, [route.params]);

  const onsubmit = async (data) => {
    const { docente, asignatura } = data;

    try {
      if (!editing) {
        const result = await registerHorario(docente, asignatura);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.SUCCESS],
          type: "success",
          id: APP_STATUS.SUCCESS,
        });
        const { id } = result.data;
        setHorarioId(id);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.REDIRECTING],
          type: "warning",
          id: APP_STATUS.REDIRECTING,
          onClose: () => {
            setLoading(false);
            reset();
            setShowModal(true);
          },
        });
      } else {
        await updateHorario(route.params.id, data);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.UPDATING],
          type: "success",
          id: APP_STATUS.UPDATING,
          onClose: () => {
            Alert.alert(
              "¿Deseas actualizar detalles del horario?",
              "Dale 'SI' para actualizar detalles del horario",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                  onPress: () => navigation.reset({
                    index: 0,  
                    routes: [
                      { name: "StackBoard", params: { screen: "Home", params: { screen: "Horarios" } } },
                    ],
                  })
                },
                { text: "Sí", onPress: () => setShowModal(true) },
              ],
              { cancelable: false }
            );
            reset();
          },
        });
      }
    } catch (error) {
      setLoading(true);
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: APP_STATUS.ERROR,
      });
      reset();
    }
  };

  const isDisabled = editing && !isDirty;

  return (
    <>
      {
        <>
          {!editing ? (
            <View style={{
              paddingHorizontal:10
            }}>
              <CustomFlatList
                name="docente"
                control={control}
                errors={errors.docente}
                data={docente}
                placeholder="Seleccione un docente"
              />

              <CustomFlatList
                name="asignatura"
                placeholder="Seleccione una asignatura"
                control={control}
                errors={errors.asignatura}
                data={asignatura}
              />
            </View>
          ) : (
            <View style={{
              paddingHorizontal:10
            }}>
              <CustomFlatList name="docente" control={control} data={docente} />

              <CustomFlatList
                name="asignatura"
                control={control}
                data={asignaturajson.map((a) => ({
                  id: a.asignatura,
                  label: a.asignatura,
                }))}
              />
            </View>
          )}

          <View
            style={{
              marginTop: 30,
              justifyContent: "center",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: editing ? "40%" : "85%",
              }}
            >
              <SubmitButton
                onPress={handleSubmit(onsubmit)}
                editing={editing}
                isDisabled={isDisabled}
              />
            </View>

            {editing && (
              <View style={styles.container2}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "¿Deseas editar los detalles de este horario?",
                      "Dale 'SI' para ir a mas detalle del horario",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                          onPress: () => {},
                        },
                        {
                          text: "Sí",
                          onPress: async () => {
                            setShowModal(true);
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  style={styles.container1}
                >
                  <Text style={styles.textStyle}>Ir a detalle</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      }

      <ModalComponente
        modalStyle={{ height: "90%" }}
        modalVisible={showModal}
        transparent={false}
        handleCloseModal={SubmithandleCloseModal}
        canCloseModal={false}
      >
        <RegisterDetailHorario
          route={route}
          idhorarioDetalle={idhorarioDetalle}
          handleCloseModal={SubmithandleCloseModal}
          idhorario={horarioId}
          editing={editing}
          navigation={navigation}
        />
      </ModalComponente>
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    width: "91.666%",
    alignSelf: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },
  textStyle: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  container2: {
    width: "40%",
    paddingTop: 12,
    alignSelf: "center",
  },
  container4: {
    width: "85%",
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 32,
  },
  container5: {
    backgroundColor: "red",
    width: "85%",
    alignSelf: "center",
    paddingVertical: 20,
  },
});
