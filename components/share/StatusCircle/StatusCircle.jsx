import { Badge } from "@rneui/themed";
import { getFirstLetter } from "../../../src/utils/functiones/functions";
const P = "pendiente";
const C = "completada";
const PD = "perdida";
export const StatusCircle = ({ item }) => {
  const getStatus = (status) => {
    switch (status) {
      case P:
        return "warning";
      case C:
        return "success";
      case PD:
        return "error";
      default:
        return null;
    }
  };
  const status = getStatus(item);
  if (!status) return null;
  return (
    <Badge
      badgeStyle={{
        width: 30,
        height: 30,
        borderRadius: 30,
      }}
      value={getFirstLetter(item)}
      status={status}
    />
  );
};
