// ************ status the all that custom hooks functionality ********
import { useEffect, useState, useCallback } from "react";
import {
  getSupervisor,
  getSupervisorCedula,
  getSupervisorDefault,
} from "../services/fetchData/fetchSupervisor";
import { getCategorySalon, getSalon } from "../services/fetchData/fetchSalon";
import {
  getHorarioAll,
  getHorarioDocenteCedula,
} from "../services/fetchData/fetchHorarios";
import { getDocenteAll } from "../services/fetchData/fetchDocente";
import { getNotificationCedulaEstado } from "../services/fetchData/fetchNotification";
import {
  getReportAll,
  getReportSupervisorID,
} from "../services/fetchData/fetchReporte";
import {
  getClasesAll,
  getClasesByDocentes,
  getClaseSupervisor,
} from "../services/fetchData/fetchClases";
import {
  getComentarioAll,
  getComentarioDocenteDocente,
  getComentarioDocenteSalon,
} from "../services/fetchData/fetchComentario";

//fetch Docente
export const useDocenteAll = () => {
  const [docenteAll, setDocenteAll] = useState([]);
  const fetchDocenteAll = useCallback(async () => {
    try {
      const res = await getDocenteAll();
      setDocenteAll(res);
    } catch {
      setDocenteAll([]);
    }
  }, []);

  useEffect(() => {
    fetchDocenteAll();
  }, [fetchDocenteAll]);

  return docenteAll;
}; //obtener todos los docente

// fetch supervisor
export const useSupervisorAll = () => {
  const [supervisors, setSupervisors] = useState([]);

  const fetchSupervisorAll = useCallback(async () => {
    try {
      const res = await getSupervisor();
      setSupervisors(res);
    } catch {
      setSupervisors([]);
    }
  }, []);

  useEffect(() => {
    fetchSupervisorAll();
  }, [fetchSupervisorAll]);

  return supervisors;
}; //obtener todos los supervisores

export const useSupervisorCedula = (CEDULA) => {
  const [supervisorCedula, setSupervisorCedula] = useState([]);

  const fetchSupervisorCedula = useCallback(async () => {
    try {
      const res = await getSupervisorCedula(CEDULA);
      setSupervisorCedula(res);
    } catch (error) {
      setSupervisorCedula([]);
    }
  }, []);

  useEffect(() => {
    fetchSupervisorCedula();
  }, [fetchSupervisorCedula]);

  return supervisorCedula;
}; //obtener todos los supervisores x cedula

export const useSupervisorDefault = () => {
  const [supervisordefault, setSupervisorDefault] = useState([]);

  const fetchSupervisorDefault = useCallback(async () => {
    try {
      const res = await getSupervisorDefault();
      setSupervisorDefault(res);
    } catch {
      setSupervisorDefault([]);
    }
  }, []);

  useEffect(() => {
    fetchSupervisorDefault();
  }, [fetchSupervisorDefault]);

  return supervisordefault;
}; //obtener el supervisor por defecto

// fetch Salones
export const useSalonAll = () => {
  const [salones, setSalonAll] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSalonAll = useCallback(async () => {
    try {
      const res = await getSalon();
      setLoading(false);
      setSalonAll(res);
    } catch {
      setLoading(true);
      setSalonAll([]);
    }
  }, []);

  useEffect(() => {
    fetchSalonAll();
  }, [fetchSalonAll]);

  return { salones, loading, fetchSalonAll };
};

//fetch Categorias
//categorias x salon
export const useCategoriaxSalon = () => {
  const [categoriaxSalon, setCategorySalon] = useState([]);

  const fetchCategoryxSalon = useCallback(async () => {
    try {
      const res = await getCategorySalon();
      setCategorySalon(res);
    } catch {
      setCategorySalon([]);
    }
  }, []);

  useEffect(() => {
    fetchCategoryxSalon();
  }, [fetchCategoryxSalon]);
  return categoriaxSalon;
}; // obtiene todas las categoria x salon

//fetch notifications
export const useNotificationCedulaEstado = (cedula, estado) => {
  const [notificationCedulaEstado, setNotificationCedulaEstado] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotificationsAll = useCallback(async () => {
    if (!cedula || !estado) return;
    setLoading(true);

    try {
      const [res1, res2] = await Promise.all([
        getNotificationCedulaEstado(cedula, estado),
      ]);

      const res = [...(res1 || []), ...(res2 || [])];
      setNotificationCedulaEstado(res);
      setLoading(false);
    } catch {
      setLoading(true);
      setNotificationCedulaEstado([]);
    }
  }, [cedula, estado]);

  useEffect(() => {
    fetchNotificationsAll();
  }, [fetchNotificationsAll]);

  return { notificationCedulaEstado, fetchNotificationsAll, loading };
}; // obtiene todas las notificaciones x cedula y estado

//fetch Horarios
export const useHorarioDocenteCedula = (CEDULA) => {
  const [horarioDocenteCedula, setHorarioDocenteCedula] = useState([]);

  const fetchHorarioDocenteCedula = useCallback(async () => {
    try {
      const res = await getHorarioDocenteCedula(CEDULA);
      setHorarioDocenteCedula(res);
    } catch (error) {
      throw Error("Error a fetching comentario", error);
    }
  }, [CEDULA]);

  useEffect(() => {
    fetchHorarioDocenteCedula();
  }, [fetchHorarioDocenteCedula]);
  return horarioDocenteCedula;
}; // obtiene todas horarios por la cedula del docente

export const useHorarioAll = () => {
  const [horarios, setHorarioAll] = useState([]);
  const [reload, setReload] = useState(true);
  const fetchHorarioAll = useCallback(async () => {
    try {
      const res = await getHorarioAll();
      setReload(false);
      setHorarioAll(res);
    } catch {
      setReload(true);
      setHorarioAll([]);
    }
  }, []);

  useEffect(() => {
    fetchHorarioAll();
  }, [fetchHorarioAll]);

  return { horarios, fetchHorarioAll, reload };
}; // obtiene todos los Horarios

//fetch Comentarios
// obtiene todos los comentarios por salones del docente
export const useComentarioDocenteSalon = (cedula, salon) => {
  const [comentarioDocenteSalon, setComentarioDocenteSalon] = useState([]);
  const fetchComentarioDocenteSalon = useCallback(async () => {
    try {
      const res = await getComentarioDocenteSalon(cedula, salon);
      setComentarioDocenteSalon(res);
    } catch {
      setComentarioDocenteSalon([]);
    }
  }, [salon]);

  useEffect(() => {
    fetchComentarioDocenteSalon();
  }, [fetchComentarioDocenteSalon]);

  return comentarioDocenteSalon;
};
// obtiene todos los comentarios por la cedula del docente
export const useComentarioDocenteCedula = (cedula) => {
  const [comentarioDocenteCedula, setComentarioDocenteCedula] = useState([]);
  const fetchComentarioDocenteCedula = useCallback(async () => {
    try {
      const res = await getComentarioDocenteDocente(cedula);
      setComentarioDocenteCedula(res);
    } catch {
      setComentarioDocenteCedula([]);
    }
  }, [cedula]);

  useEffect(() => {
    fetchComentarioDocenteCedula();
  }, [fetchComentarioDocenteCedula]);

  return comentarioDocenteCedula;
};
export const useComentarioAll = () => {
  const [comentarioAll, setComentarioAll] = useState([]);
  const [reload, setReload] = useState(true);
  const fetchComentarioAll = useCallback(async () => {
    try {
      const res = await getComentarioAll();
      setReload(false);
      setComentarioAll(res);
    } catch {
      setReload(true);
      setComentarioAll([]);
    }
  }, []);

  useEffect(() => {
    fetchComentarioAll();
  }, [fetchComentarioAll]);

  return { comentarioAll, reload, fetchComentarioAll };
}; // obtiene todos los comentarios

export const useDocenteComentario = (cedula) => {
  const [comentarioAll, setComentarioAll] = useState([]);
  const fetchComentarioAll = useCallback(async () => {
    try {
      const res = await getComentarioDocenteDocente(cedula);
      setComentarioAll(res);
    } catch {
      setComentarioAll([]);
    }
  }, []);

  useEffect(() => {
    fetchComentarioAll();
  }, [fetchComentarioAll]);

  return comentarioAll;
}; // obtiene todos los comentarios

//fetch Clases
export const useClasesAll = () => {
  const [clasesAll, setClassAll] = useState([]);
  const fetchClassAll = useCallback(async () => {
    try {
      const res = await getClasesAll();
      setClassAll(res);
    } catch {
      setClassAll([]);
    }
  }, []);

  useEffect(() => {
    fetchClassAll();
  }, [fetchClassAll]);

  return clasesAll;
}; // obtiene todos las Clases

export const useClaseSupervisor = (cedula) => {
  const [claseSupervisor, setClaseSupervisor] = useState([]);
  const [reload, setReload] = useState(true);
  const fetchClaseSupervisor = useCallback(async () => {
    setReload(true);
    try {
      const res = await getClaseSupervisor(cedula);
      setClaseSupervisor(res);
    } catch {
      setClaseSupervisor([]);
      setReload(true);
    } finally {
      setReload(false);
    }
  }, [cedula]);

  useEffect(() => {
    fetchClaseSupervisor();
  }, [fetchClaseSupervisor]);

  return { claseSupervisor, fetchClaseSupervisor, reload };
}; // obtiene todos las clases x supervisor

export const useReportSupervisorID = (cedula) => {
  const [ReportSupervisor, setReportSupervisor] = useState([]);
  const [reload, setReload] = useState(true);
  const fetchReportSupervisorID = useCallback(async () => {
    setReload(true);
    try {
      const res = await getSupervisorCedula(cedula);
      const supervisorID = res[0]?.supervisor_id;
      if (supervisorID) {
        const report = await getReportSupervisorID(supervisorID);
        setReportSupervisor(report);
        setReload(false);
      }
    } catch {
      setReportSupervisor([]);
      setReload(true);
    } finally {
      setReload(false);
    }
  }, [cedula]);

  useEffect(() => {
    fetchReportSupervisorID();
  }, [fetchReportSupervisorID]);

  return { ReportSupervisor, fetchReportSupervisorID, reload };
}; // obtiene todos los reporte del supervisor x id

//fetch Reporte
export const useReporteAll = () => {
  const [reporteALL, setReporteoAll] = useState([]);
  const [reload, setReload] = useState(true);

  const fetchReporteAll = useCallback(async () => {
    try {
      const res = await getReportAll();
      setReporteoAll(res);
      setReload(false);
    } catch {
      setReload(true)
      setReporteoAll([]);
    }
  }, []);

  useEffect(() => {
    fetchReporteAll();
  }, [fetchReporteAll]);

  return {reporteALL, reload, fetchReporteAll};
}; // obtiene todos los Reportes

// ************ status the los hooks what no`Dont, but they are used globally ********

//fetch Dias de la semanas
//fetch Reporte
export const useDays = () => {
  const Days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  const [days, setDiaAll] = useState([]);
  const fetchDia = useCallback(async () => {
    try {
      const res = Days.map((item, i) => ({ Dia: item, id: item }));
      setDiaAll(res);
    } catch (error) {
      throw Error("Failted to get days", error);
    }
  }, []);

  useEffect(() => {
    fetchDia();
  }, [fetchDia]);

  return days;
}; // obtiene todos dias de la semana

export const useClaseDocentes = (cedula) => {
  const [clasesAll, setClaseAll] = useState([]);
  const fetchClaseAll = useCallback(async () => {
    try {
      const res = await getClasesByDocentes(cedula);
      setClaseAll(res);
    } catch {
      setClaseAll([]);
    }
  }, []);

  useEffect(() => {
    fetchClaseAll();
  }, [fetchClaseAll]);

  return clasesAll;
}; // obtiene todos los Reportes
