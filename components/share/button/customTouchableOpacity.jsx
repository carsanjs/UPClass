import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomTouchableOpacity = ({
  screenName,
  paramKey ,
  paramValue,
  children,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
  navigation.navigate(screenName, { [paramKey]: paramValue });
  };

  return (
    <TouchableOpacity style={{
      flexDirection:"row"
    }} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomTouchableOpacity;
