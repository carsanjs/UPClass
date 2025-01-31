import { userData } from "../../../../../src/hooks/use/userData";
import { useClaseSupervisor } from "../../../../../src/hooks/customHooks";
import Loading from "../../../../share/loading";
import { UseFlatList } from "../../../Components/FlatList/customFlatList";
import { CarItemList } from "./car";
import { NotRegistration } from "../../../Components/unregistered/noRegistration";

export const CarListDocentes = () => {
  const { CEDULA } = userData();
  const { claseSupervisor, fetchClaseSupervisor, reload } =
    useClaseSupervisor(CEDULA);
    
  if (reload) {
    return <Loading />;
  }

  return (
    <UseFlatList
      onRefresh={fetchClaseSupervisor}
      refreshing={reload}
      ListEmptyComponent={<NotRegistration />}
      data={claseSupervisor}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CarItemList item={item} />}
    />
  );
};
