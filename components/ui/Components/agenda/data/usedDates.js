import { DatesYYYYMMDD, obtenerLimitesFechas } from "../../../../../src/utils/functiones/functions";
import moment from "../../../../../src/utils/InstanceMoment";


export const itemDateHour = (data) =>{
return data.horarios.map(h => h.fecha)
}

export function getAllRelevantDates(data) {
  const fechas = new Set(); 
  const fechasHorarios = itemDateHour(data)
  const [startDate, endDate] = obtenerLimitesFechas(fechasHorarios);
  let currentDate = moment(startDate);
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    fechas.add(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'days'); 
  }
  data.horarios.forEach((horario) => {
    const fecha =DatesYYYYMMDD(horario.fecha);
    fechas.add(fecha);
  });
  return Array.from(fechas); 
}

// const fecha = moment(horario.fecha).format('YYYY-MM-DD');

export function getAllRelevantDatesD(data) {
  const fechas = new Set(); 
  const fechasListadas = data.map(i => i.fecha); 
  const [startDate, endDate] = obtenerLimitesFechas(fechasListadas);
  let currentDate = moment(startDate);
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    fechas.add(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'days'); 
  }
  fechasListadas.forEach((horario) => {
    const fecha = DatesYYYYMMDD(horario.fecha);
    fechas.add(fecha);
  });
  return Array.from(fechas); 
}

  // for (let i = 0; i < data.horarios.length; i++) {
  //   const fecha = moment(data.horarios[i].fecha).format('YYYY-MM-DD');
  //   if (!fechas.includes(fecha)) {
  //     fechas.push(fecha);
  //   }
  // }
  // return fechas;