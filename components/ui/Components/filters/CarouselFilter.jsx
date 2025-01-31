import { View } from "react-native";
import { Chip } from "@rneui/themed";
import { ColorItem } from "../../../styles/StylesGlobal";
import { UseFlatList } from "../FlatList/customFlatList";
import { NotRegistration } from "../unregistered/noRegistration";

export const ScrollMultipleFilterClass = ({ opciones, handleOptionSelect }) => {
  const _renderItemFilter = ({ item, index }) => (
    <View key={item.id} style={{ marginHorizontal: 5 }}>
      <View
        style={{
          width: 130,
          marginHorizontal: 10,
        }}
      >
        <Chip
          size="md"
          key={`seletedset-${index}`}
          title={item.title}
          onPress={() => handleOptionSelect(item.action)}
          titleStyle={{
            fontSize: 16,
            fontWeight: "bold",
            color: item.isSelected ? "white" : ColorItem.TarnishedSilver,
          }}
          iconRight
          containerStyle={{ marginVertical: 10 }}
          color={item.isSelected ? "primary" : "lightgray"}
        />
      </View>
    </View>
  );

  return (
    <UseFlatList
      data={opciones}
      ListEmptyComponent={<NotRegistration />}
      renderItem={_renderItemFilter}
      horizontal={true}
    />
  );
};
