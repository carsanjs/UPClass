import { Text } from "react-native";
import { Controller } from "react-hook-form";
import DropdownModal from "../../share/dropDown/dropDownModal";
import { ColorItem } from "../../styles/StylesGlobal";

export const CustomFlatList = ({
  name,
  control,
  errors,
  placeholder,
  data,
  toLowerCase,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <DropdownModal
          toLowercase={toLowerCase}
           name={name}
            error={errors}
            value={value}
            data={data}
            placeholder={placeholder}
            onChange={onChange}
          />
            {errors && (
              <Text
                style={{
                  color:ColorItem.VividRed,
                  fontSize: 16,
                  paddingTop: 10,
                  paddingLeft: 4,
                }}
              >
                {errors.message}
              </Text>
            )}
        </>
      )}
    />
  );
};
