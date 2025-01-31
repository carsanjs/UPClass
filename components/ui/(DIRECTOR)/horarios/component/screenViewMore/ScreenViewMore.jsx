import { obtenerLimitesFechas } from "../../../../../../src/utils/functiones/functions.js";
import { useMemo } from "react";
import AgendaCalendar from "../../../../Components/agenda/agenda.jsx";
import { transformData } from "../../../../Components/agenda/data/tranformaData.js";
import { useRoute } from "@react-navigation/native";
import { itemDateHour } from "../../../../Components/agenda/data/usedDates.js";
import RenderAgenItem from "./renderAgendaItem.jsx";
import { getmarkedDates } from "../../../../Components/agenda/data/markesData.js";
import { View } from "react-native";
function ScreenViewMore() {
  const router = useRoute();
  const { selectedDate } = router.params;
  const fechasHorarios = itemDateHour(selectedDate);
  const [startDate, endDate] = useMemo(
    () => obtenerLimitesFechas(fechasHorarios),
    [fechasHorarios]
  );
  // const ITEMS = transformData(selectedDate);
  const ITEMS = transformData(selectedDate);

  const markedDatesM = useMemo(() => {
    return getmarkedDates(ITEMS);
  }, [ITEMS]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AgendaCalendar
        markedDates={markedDatesM}
        minDate={startDate}
        maxDate={endDate}
        items={ITEMS}
        render={(item) => <RenderAgenItem item={item} />}
      />
    </View>
  );
}

export default ScreenViewMore;
