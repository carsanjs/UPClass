import { Audio } from "expo-av";
import moment from "../../../src/utils/InstanceMoment";
import { ColorItem } from "../../../components/styles/StylesGlobal";

export const getColorStatus = (value, placeholder) => {
  const valueToCheck = value.toLowerCase();
  const placeholderToCheck = placeholder.toLowerCase();
  if (valueToCheck === "completada" || placeholderToCheck === "completada") {
    return ColorItem.Luigi;
  } else if (valueToCheck === "perdida" || placeholderToCheck === "perdida") {
    return ColorItem.VividRed;
  } else {
    return ColorItem.GoldOre;
  }
};

// orde la lista de fechas  ["2025-05-12", "2025-05-10", "2024-12-01", "2024-12-05", "2025-01-01", "2025-04-03"] // // ["2024-12-01", "2025-05-12"]

export function obtenerLimitesFechas(arregloFechas) {
  let estaOrdenado = true;
  for (let i = 1; i < arregloFechas.length; i++) {
    if (moment(arregloFechas[i]).isBefore(moment(arregloFechas[i - 1]))) {
      estaOrdenado = false;
      break; 
    }
  }

  if (!estaOrdenado) {
    arregloFechas.sort((a, b) => (moment(a).isBefore(moment(b)) ? -1 : 1));
  }

  return [arregloFechas[0], arregloFechas[arregloFechas.length - 1]];
}

// transforma de 12:10:00 a 12:10
export const formatTime = (time) => {
  return moment(time, "HH:mm:ss").format("HH:mm");
};


// YYYY-MM-DD (2024-12-31)

export const DatesYYYYMMDD = (fecha) => {
  return moment(fecha).format("YYYY-MM-DD");
};

// Función para reproducir el sonido de notificación
export default async function playNotificationSound(setSound) {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/mp3/Sweet.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  } catch {
    return false;
  }
}

export function FilterDuplicate(data, duplicate) {
  const seen = {};
  return data.filter((item) => {
    if (!seen[item[duplicate]]) {
      seen[item[duplicate]] = true;
      return true;
    }
    return false;
  });
}
export const generateClassDates = (dia, startDate, endDate) => {
  const daysOfWeek = {
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sabado: 6,
  };

  const targetDay = daysOfWeek[dia];
  if (targetDay === undefined) {
    throw new Error("Día no válido");
  }

  const classesToRegister = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === targetDay) {
      const formattedDate = moment(d).format("YYYY-MM-DD");
      classesToRegister.push({
        fecha: formattedDate, // Fecha formateada
      });
    }
  }
  return classesToRegister;
};

// Función para obtener la duración entre la horainicio y la horafin 8:00 a 10:00 duration 2h
export const formatDuration = (horainicio, horafin) => {
  const start = moment(horainicio, "HH:mm");
  const end = moment(horafin, "HH:mm");
  const duration = moment.duration(end.diff(start)).asMinutes();
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const hourFormat = `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
  return hourFormat;
};

export const formatHourHHMMAMPM = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours, minutes);
  const formattedHours = date.getHours() % 12 || 12;
  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() < 12 ? "AM" : "PM";
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

// devuelve el string pero con la primera letra de un string en mayuscula {"docente" ---> "Docente"}
export const capitalizeFirstLetter = (name) => {
  if (name != undefined) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
};

// devuelve la primera letra de un string en mayuscula {"Pendiente" ---> "P"}
export function getFirstLetter(word) {
  if (word && word.length > 0) {
    return word.charAt(0).toUpperCase();
  }
  return "";
}

// pasamos un objeto Date si deseas obtener la hora en formato de 12 horas con AM/PM
export const formatHourHHMMTime = (currentTime) => {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours.toString().padStart(2, "0") % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
};

export const formatHourHHMM = (currentTime) => {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const truncateText = (text, maxLegth = 7) => {
  if (text.length > 15) {
    return text.substring(0, maxLegth) + "...";
  }
  return text;
};

// esta función toma una hora en formato HH:MM:SS (24 horas) y la convierte a HH:MM AM/PM (12 horas).
export const formatTimeTo12Hour = (time24) => {
  const [hour, minute] = time24.split(":");
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? "PM" : "AM";
  const hour12 = hourInt % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
};

export const timeHHMM = (fecha, hour) => {
  const time = new Date(`${fecha.split("T")[0]}T${hour}`).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  return time;
};

// salida: jueves 12 diciembre, 2024
export const formatDate = (fecha) => {
  return moment(fecha).format("ddd D MMM YYYY");
};
