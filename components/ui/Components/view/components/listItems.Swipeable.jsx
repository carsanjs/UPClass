import { ListItem, Button } from "@rneui/themed";
import { IconAndroid } from "../../../../../assets/icons/IconsGlobal";
import { ColorItem } from "../../../../styles/StylesGlobal";

export const ListSwipeable = ({
  item,
  icono: ComponetIcon = IconAndroid,
  showrightContent = true,
  isdocente = "",
  children,
  handleDeletePress,
  handleInfoPress,
  typeid = "id",
  isFiltered = false,
}) => {
  const idPress = typeid === "reporte_id" ? item.reporte_id : (typeid === "id" ? item.id : item.cedula);
  return (
    <ListItem.Swipeable
      key={item.id}
      containerStyle ={{
        backgroundColor: isFiltered ? ColorItem.OceanCrest :"#ffffff"
      }}
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={async () => {
            reset();
            await handleInfoPress(idPress);
          }}
          icon={{ name: "info", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
      )}
      rightContent={
        showrightContent
          ? (reset) => (
              <Button
                title="Eliminar"
                onPress={() => {
                  reset();
                  handleDeletePress(idPress);
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            )
          : null
      }
    >
      <ComponetIcon />
      <ListItem.Content>
        <ListItem.Title>{children}</ListItem.Title>
      </ListItem.Content>
      {isdocente}
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};
