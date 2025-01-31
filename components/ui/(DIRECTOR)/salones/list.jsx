import { getSalonOne
} from "../../../../src/services/fetchData/fetchSalon";
import { ListItemSalones } from "../../Components/customlistSalones";
export const ListSalones = () => {
  return (
    <ListItemSalones
      getDataOne={getSalonOne}
      modalTitle="Salones"
    />
  );
};
