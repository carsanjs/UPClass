import { useState, useMemo, useEffect } from "react";
import { View } from "react-native";
import { styles } from "../../styles/StylesGlobal";
import moment, { Today } from "../../../src/utils/InstanceMoment";
import { ViewDatePicker } from "../(DIRECTOR)/horarios/component/viewDatePicker";
import { NotRegistrationDate } from "./unregistered/noRegistration";
import { UseFlatList } from "./FlatList/customFlatList";
import { RenderDatePicker } from "../(DIRECTOR)/horarios/component/SimpleDatePicker/contentDatePicker";
import { DatesYYYYMMDD } from "../../../src/utils/functiones/functions";

export default function SimpleDatePicker({
  selectedDate,
  onDateChange,
  viewSelectDate,
}) {
  const today = Today();
  const [value, setValue] = useState(null);
  const formattedSelectedDates = useMemo(() => {
    return selectedDate.map((date) => moment(date));
  }, [selectedDate]);

  //comparamos si today se encuentra en la lista
  const isTodayInSelectedDates = useMemo(() => {
    return formattedSelectedDates.some((formattedDate) =>
      today.isSame(formattedDate, "day")
    );
  }, [formattedSelectedDates, today]);

  useEffect(() => {
    if (isTodayInSelectedDates) {
      if (!today.isSame(value, "day")) {
        setValue(today);
      }
    } else {
      setValue(today);
    }
  }, [isTodayInSelectedDates]);

  const weeks = useMemo(() => {
    if (!formattedSelectedDates || formattedSelectedDates.length === 0)
      return []; // Verificar que haya fechas
    const sortedDates = [...formattedSelectedDates].sort((a, b) =>
      moment.utc(a).diff(moment.utc(b))
    );
    const daysMonth = sortedDates.map((dateStr) => {
      const date = moment.utc(dateStr); // Convertir cada string a un objeto moment en UTC
      return {
        dia: date.format("ddd"), // Día de la semana en abreviatura
        fecha: DatesYYYYMMDD(date), // Fecha en formato Date
      };
    });
    return daysMonth;
  }, [formattedSelectedDates]);

  const handleDateChange = (newDate) => {
    setValue(moment(newDate));
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <UseFlatList
          data={weeks}
          horizontal={true}
          renderItem={({ item, index }) => (
            <RenderDatePicker
              key={`key-${index}`}
              item={item}
              value={value}
              handleDateChange={handleDateChange}
            />
          )}
        />
      </View>

      {viewSelectDate ? (
        <ViewDatePicker viewSelectDate={viewSelectDate} />
      ) : (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <NotRegistrationDate />
        </View>
      )}
    </View>
  );
}
