import { ModalComponente } from "../../ui/Components/Modals/customModal";
import { ItemBtnDropdown } from "./components/ItemBtnDropdown";
import { useCallback, useEffect, useState } from "react";
import { _RenderItemDropDown } from "./components/_renderItemDrop";

export default function DropdownModal({
  name = "",
  value,
  data,
  onChange,
  placeholder,
  error,
  toLowercase
}) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  const [valuee, setValue] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      const selected = data.find((item) => item.id === value.toString());
      if (selected) {
        setValue(selected.label);
      } else {
        setValue(value);
      }
    }
  }, [value, data]);

  const onSelect = useCallback(
    (item) => {
      onChange(item.id);
      setValue(item.label);
      setExpanded(false);
    },
    [onChange]
  );
  return (
    <>
      <ItemBtnDropdown
        error={error}
        Onpress={toggleExpanded}
        expanded={expanded}
        placeholder={placeholder}
        valuee={valuee}
        toLowercase={toLowercase}
      />

      {expanded ? (
        <ModalComponente
          title={`Seleccione ${name}`}
          modalStyle={{
            height: "90%",
          }}
          modalVisible={expanded}
          handleCloseModal={toggleExpanded}
          canCloseModal={true}
          data={data}
          renderItem={({ item }) => (
            <_RenderItemDropDown item={item} onSelect={onSelect} />
          )}
        ></ModalComponente>
      ) : null}
    </>
  );
}