import { ListItem } from "@rneui/themed";
import { useState } from "react";
import { ColorItem } from "../../../styles/StylesGlobal";
export const ListItemAccordion = ({
  content,
  expande,
  borderLeftColor = ColorItem.TarnishedSilver,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem.Accordion
      content={<ListItem.Content>{content}</ListItem.Content>}
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      <ListItem
        bottomDivider
        style={{
          borderLeftColor: borderLeftColor,
          marginHorizontal: 1,
          borderLeftWidth: 6,
        }}
      >
        <ListItem.Content>{expande}</ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Accordion>
  );
};