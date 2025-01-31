import { FlatList, StyleSheet } from "react-native";
import { NofilterSelected } from "../unregistered/noRegistration";

export const UseFlatList = ({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  refreshing,
  horizontal = false,
  ListEmptyComponent = <NofilterSelected />,
  ...props
}) => {
  return (
    <FlatList
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={data?.length === 0 && styles.emptyList}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
