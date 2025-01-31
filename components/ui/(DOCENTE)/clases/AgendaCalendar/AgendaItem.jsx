import { memo } from "react";
import { ReportClases } from "./components/reportClass";

const AgendaItem = ({item, setShowModal,setModalItem }) => {
  const buttonPressed = () => {
    setShowModal(true);
    setModalItem(item);
  };
  return (
     <ReportClases buttonPressed={buttonPressed} item={item} />
  );
};

export default memo(AgendaItem);


