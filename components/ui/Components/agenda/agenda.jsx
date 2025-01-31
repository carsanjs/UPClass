import { Agenda, LocaleConfig } from "react-native-calendars";
import {
  NotRegistration,
  RenderEmptyDate,
} from "../unregistered/noRegistration";
import testIDs from "../../../../src/utils/config/testIDs";
import { ColorItem } from "../../../styles/StylesGlobal";
import { PureComponent } from "react";
import { Today } from "../../../../src/utils/InstanceMoment";
import { DatesYYYYMMDD } from "../../../../src/utils/functiones/functions";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
};
LocaleConfig.defaultLocale = "es";

class AgendaCalendar extends PureComponent {
  render() {
    {
      const { items, render, minDate, maxDate, markedDates } = this.props;
      // const [isOpen, setIsOpen] = useState(false);
      const today = Today();
      const daySelected = DatesYYYYMMDD(today);

      if (!items || Object.keys(items).length === 0) {
        return <NotRegistration />;
      }

      return (
        <Agenda
          {...this.props}
          scrollEnabled={true}
          windowSize={5}
          maxToRenderPerBatch={10}
          markedDates={markedDates}
          markingType="dot"
          items={items}
          theme={{
            agendaKnobColor: ColorItem.DeepSkyBlue,
            textSectionTitleColor: "#000",
            todayTextColor: "#ffffff",
            selectedDayTextColor: "white",
            todayBackgroundColor: ColorItem.Luigi,
            dayTextColor: {
              gray: "gray",
            },
          }}
          keyExtractor={(item, index) => `ID-${item.keyunica}-DATA-${index}`}
          renderEmptyDate={RenderEmptyDate}
          testID={testIDs.agenda.CONTAINER}
          selected={daySelected}
          renderItem={render}
          minDate={minDate}
          maxDate={maxDate}
          initialNumToRender={4}
        />
      );
    }
  }
}

export default AgendaCalendar;
