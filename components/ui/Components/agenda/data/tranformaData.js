import { getAllRelevantDates, getAllRelevantDatesD } from "./usedDates";
import {
  formatDuration,
  formatTimeTo12Hour,
} from "../../../../../src/utils/functiones/functions";

// uso para admin
export function transformData(selectedDate) {
  const items = {};
  const allDates = getAllRelevantDates(selectedDate);
  const fechas = new Set(allDates)
  selectedDate.horarios.forEach((horario) => {
    const datekey = horario.fecha;
    if (fechas.has(datekey)) {
      if (!items[datekey]) {
        items[datekey] = [];
      }
      items[datekey].push({
        keyunica: datekey,
        numero_salon: horario.numero_salon,
        dia: horario.dia,
        hora_fin: horario.hora_fin,
        hora_inicio: horario.hora_inicio,
        estado: horario.estado,
      });
    }
  });
  allDates.forEach((date) => {
    if (!items[date]) {
      items[date] = [];
    }
  });
  return items;
}

// uso para docente
export function loadCalendarItems(data) {
  const allDates = getAllRelevantDatesD(data);
  const fechas = new Set(allDates); // Usar Set para evitar duplicados
  const aux = {};

  data.forEach((item) => {
    const dateFixed = item.fecha;
    if (fechas.has(dateFixed)) {
      if (!aux[dateFixed]) {
        aux[dateFixed] = [];
      }
      aux[dateFixed].push({
        subject: item.asignatura,
        hours: `${formatTimeTo12Hour(item.hora_inicio)} - ${formatTimeTo12Hour(item.hora_fin)}`,
        duration: formatDuration(item.hora_inicio, item.hora_fin),
        room: item.numero_salon,
        salon: item.salon_id,
        date:item.comentario_fecha,
        commenting: item.comentario,
        docente: item.id_docente,
        clase: item.clase_id,
      });
    }
  });
  allDates.forEach((date) => {
    if (!aux[date]) {
      aux[date] = [];
    }
  });
  return aux;
}