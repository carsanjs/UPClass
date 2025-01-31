import { View, Alert, TouchableOpacity, Text } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  detailHorarioRegister,
  EditingdetailHorarioRegister,
} from "../../../../../src/utils/schemas/horarioSchema";
import { CustomTimePicker } from "../../../../share/inputs/customDateTimePicker";
import { diasArray } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomFlatList } from "../../../../share/inputs/customFlatList";
import { CustomPiker } from "../../../../share/inputs/customPicker";
import {
  getDetailHorarioOne,
  registerDetailHorario,
  updateDetailHorario,
} from "../../../../../src/services/fetchData/fetchDetailHorario";
import {
  registerClase,
  updateClase,
} from "../../../../../src/services/fetchData/fetchClases";
import { useEffect, useState } from "react";
import {
  formatTime,
  generateClassDates,
} from "../../../../../src/utils/functiones/functions";
import Loading from "../../../../share/loading";
import { SubmitButton } from "../../../../share/button/submitButton";
import useToastMessage from "../../../../share/ToasNotification";
import {
  useClasesAll,
  useSalonAll,
  useSupervisorAll,
} from "../../../../../src/hooks/customHooks";
import { ColorItem } from "../../../../styles/StylesGlobal";
export const RegisterDetailHorario = ({
  navigation,
  idhorarioDetalle,
  route,
  idhorario,
  editing,
  handleCloseModal,
}) => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(
      editing ? EditingdetailHorarioRegister : detailHorarioRegister
    ),
  });
  const supervisors = useSupervisorAll();
  const [loading, setLoading] = useState(false);
  const [isFirstAssignment, setIsFirstAssignment] = useState(true);
  const [horainicio, setHoraInicio] = useState(new Date());
  const [horafin, setHoraFin] = useState(new Date());
  const { salones } = useSalonAll();
  const isDisabled = editing && !isDirty;
  const classes = useClasesAll();

  const saloness = salones.map((item) => ({
    id: item.id.toString(),
    label: `${item.numero_salon} ${item.nombre} `,
  }));

  const dias = diasArray.map((d) => ({
    id: d,
    label: d,
  }));

  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
    });
  }, [navigation]);

  const checkSupervisorsAvailable = () => {
    if (supervisors.length === 0) {
      Alert.alert(
        "No hay supervisores disponibles",
        "No puedes registrar el detalle de horario.",
        [
          {
            text: "Terminar",
            onPress: () => navigation.navigate("ListScreen"),
          },
          {
            text: "Ir a Registrar Supervisor",
            onPress: () =>
              navigation.reset({
                index: 0,  
                routes: [
                  { name: "StackBoard", params: { screen: "Home", params: { screen: "Supervisor" } } },
                ],
              })
          },
        ]
      );
      reset({
        salon: "",
        dia: "",
      });
      setHoraInicio(new Date());
      setHoraFin(new Date());
      return false;
    }
    return true;
  };

  const countClassesForSupervisors = () => {
    checkSupervisorsAvailable();
    const counts = {};
    supervisors.forEach((s) => {
      counts[s.supervisor_id] = 0;
    });
    try {
      if (classes.length === 0) {
        return counts;
      }
      classes.forEach((classItem) => {
        if (counts[classItem.supervisor_id] !== undefined) {
          counts[classItem.supervisor_id] += 1;
        }
      });
      return counts;
    } catch (error) {
      throw new Error("Error fetching classes:", error.message);
    }
  };

  const getRandomSupervisor = (supervisors) => {
    if (supervisors.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * supervisors.length);
    return supervisors[randomIndex].supervisor_id;
  };

  const assignSupervisors = async () => {
    const classCounts = countClassesForSupervisors();
    if (isFirstAssignment) {
      setIsFirstAssignment(false);
      return getRandomSupervisor(supervisors);
    }
    if (Object.keys(classCounts).length === 0) {
      return getRandomSupervisor(supervisors);
    }
    let minClasses = Infinity;
    let selectedSupervisor = null;

    supervisors.forEach((supervisor) => {
      if (classCounts[supervisor.supervisor_id] < minClasses) {
        minClasses = classCounts[supervisor.supervisor_id];
        selectedSupervisor = supervisor;
      }
    });
    return selectedSupervisor
      ? selectedSupervisor.supervisor_id
      : getRandomSupervisor(supervisors);
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      if (editing) {
        (async () => {
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.LOADING],
            type: "warning",
            id:"KEY_LOADING_EDITIN_DETAILS",
          });
          const response = await getDetailHorarioOne(route.params.id);
          const value = response.find((doc) => doc.horario === route.params.id);
          if (value) {
            reset({
              salon: value.salon,
              dia: value.dia,
              hora_inicio: formatTime(value.hora_inicio),
              hora_fin: formatTime(value.hora_fin),
            });
          } else {
            throw new Error("detalle del horario no encontrado.");
          }
        })();
      }
    }
  }, [route.params]);

  useEffect(() => {
    if (supervisors.length > 0) {
      const countClasses = () => {
        try {
          countClassesForSupervisors();
        } catch (error) {
          throw new Error("Error counting classes:", error);
        }
      };
      countClasses();
    }
  }, [supervisors]);

  const onsubmit = async (data) => {
    const { salon, dia, hora_inicio, hora_fin } = data;
    const ESTADO = "pendiente";
    const TOTAL_MESES = 4; // 4 meses
    const startDate = new Date(); // Fecha de inicio
    const endDate = new Date(startDate); // Fecha de final

    if (!checkSupervisorsAvailable()) {
      return;
    }
    const supervisorID = await assignSupervisors();
    if (!supervisorID) {
      alert("No se pudo asignar un supervisor. Vuelva a intentarlo");
      reset();
      return false;
    }
    try {
      if (!editing) {
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.REGISTERING],
          type: "success",
          id: APP_STATUS.REGISTERING,
        });
        await registerDetailHorario(idhorario, dia, hora_inicio, hora_fin);
        endDate.setMonth(endDate.getMonth() + TOTAL_MESES);
        const classesToRegister = await Promise.all(
          generateClassDates(dia, startDate, endDate).map(async (clase) => {
            return {
              horario: idhorario,
              salon,
              supervisor: supervisorID,
              estado: ESTADO,
              ...clase,
            };
          })
        );
        try {
          alert("Successfull", "Registro exitoso ✔︎ ✔︎");
          await Promise.all(
            classesToRegister.map((clase) =>
              registerClase(
                clase.horario,
                clase.salon,
                clase.supervisor,
                clase.estado,
                clase.fecha
              )
            )
          );
          reset();
          alert("Redirigiendo....");
          handleCloseModal();
          navigation.reset({
            index: 0,  
            routes: [
              { name: "StackBoard", params: { screen: "Home", params: { screen: "Horarios" } } },
            ],
          });
        } catch (error) {
          reset();
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.ERROR],
            type: "danger",
            id: "ERROR_INREDIREG_LISTRSCREEN",
          });
        }
      } else {
        // Si está en modo edición, actualizar el detalle de horario
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADING],
          type: "danger",
          id: APP_STATUS.LOADING,
        });

        const updateDetail = updateDetailHorario(idhorarioDetalle, {
          dia: dia,
          hora_inicio: hora_inicio,
          hora_fin: hora_fin,
        });

        const updateClasses = Promise.all(
          generateClassDates(dia, startDate, endDate)
            .map(async (clase) => {
              return {
                salon,
                ...clase,
              };
            })
            .map(async (clase) => {
              await updateClase(clase.salon);
            })
        );

        await Promise.all([updateDetail, updateClasses]);

        reset();
        alert("Successfull", "editado exitosamente ✔︎ ✔︎");
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.REDIRECTING],
          type: "warning",
          id: APP_STATUS.REDIRECTING,
          onClose: () => {
            handleCloseModal();
            navigation.reset({
              index: 0,  
              routes: [
                { name: "StackBoard", params: { screen: "Home", params: { screen: "Horarios" } } },
              ],
            });
          },
        });
      }
    } catch (error) {
      reset();
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: APP_STATUS.ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View
    >
      {!editing ? (
        <View
          style={{
            width: "100%",
          }}
        >
          <CustomPiker
            name="dia"
            control={control}
            placeholder="Seleccione dia"
            errors={errors.dia}
            data={dias}
          />

          <View
            style={{
              width: "95%",
              paddingTop: 20,
              backgroundColor: "red",
              alignSelf: "center",
              paddingBottom: 4,
            }}
          >
            <CustomFlatList
              name="salon"
              errors={errors.salon}
              control={control}
              placeholder="Seleccione Salon"
              data={saloness}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginVertical: 25,
            }}
          >
            <View
              style={{
                width: "50%",
                alignItems: "center",
              }}
            >
              <CustomTimePicker
                name="hora_inicio"
                control={control}
                errors={errors.hora_inicio}
                title="Hora ini..."
                initialValue={horainicio}
                testID="hora_inicio"
                is24Hour={true}
                onTimeSelected={(formattedTime) => {
                  setHoraInicio(formattedTime);
                }}
              />
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "center",
              }}
            >
              <CustomTimePicker
                name="hora_fin"
                control={control}
                errors={errors.hora_fin}
                title="Hora Fin"
                testID="hora_fin"
                initialValue={horafin}
                is24Hour={true}
                onTimeSelected={(formattedTime) => setHoraFin(formattedTime)}
              />
            </View>
          </View>
        </View>
      ) : (
        <>
          <CustomPiker
            name="dia"
            placeholder="Seleccione Dia"
            errors={errors.dia}
            control={control}
            data={dias}
          />

          <CustomFlatList
            name="salon"
            placeholder="Seleccione salon"
            errors={errors.salon}
            control={control}
            data={saloness}
          />

          <View style={{flexDirection:"row"}}>
          <CustomTimePicker
            errors={errors.hora_inicio}
            name="hora_inicio"
            editing={editing}
            control={control}
            testID="hora_inicio"
            initialValue={watch("hora_inicio")}
            is24Hour={true}
            onTimeSelected={(formattedTime) => {
              setHoraInicio(formattedTime);
            }}
          />

          <CustomTimePicker
            name="hora_fin"
            editing={editing}
            control={control}
            errors={errors.hora_fin}
            testID="hora_fin"
            initialValue={watch("hora_fin")}
            is24Hour={true}
            onTimeSelected={(formattedTime) => setHoraFin(formattedTime)}
          />
          </View>
        </>
      )}

      <View
        style={{
          paddingVertical:20,
          width: "100%",
          justifyContent: "center",
          flexDirection: "row-reverse",
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
          <View
            style={{
              width: "40%",
              paddingTop: 12,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "¿Deseas cancelar la actualizacion?",
                  "Dale 'SI' para cancelar la actualizacion",
                  [
                    {
                      text: "Cancelar",
                      style: "cancel",
                      onPress: () => {},
                    },
                    {
                      text: "Sí",
                      onPress: async () => {
                        navigation.reset({
                          index: 0,
                          routes: [
                            {
                              name: "StackBoard",
                              params: {
                                screen: "Home",
                                params: { screen: "Horarios" },
                              },
                            },
                          ],
                        });
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
              style={{
                alignSelf: "center",
                padding: 12,
                borderRadius: 8,
                backgroundColor: ColorItem.VividRed,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};


//   <CustomTimePicker
//     errors={errors.hora_inicio}
//     name="hora_inicio"
//     editing={editing}
//     control={control}
//     testID="hora_inicio"
//     initialValue={watch("hora_inicio")}
//     is24Hour={true}
//     onTimeSelected={(formattedTime) => {
//       setHoraInicio(formattedTime);
//     }}
//   />
// </View>

// <CustomTimePicker
//     name="hora_fin"
//     editing={editing}
//     control={control}
//     errors={errors.hora_fin}
//     testID="hora_fin"
//     initialValue={watch("hora_fin")}
//     is24Hour={true}
//     onTimeSelected={(formattedTime) => setHoraFin(formattedTime)}
//   />