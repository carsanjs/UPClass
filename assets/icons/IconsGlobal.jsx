import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ColorItem } from "../../components/styles/StylesGlobal";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Octicons,
  SimpleLineIcons,
  FontAwesome6,
} from "@expo/vector-icons";

const sizeDefault = 28;

export const IconNotification = ({
  color = ColorItem.MediumGreen,
  size = sizeDefault,
}) => {
  return <Ionicons name="notifications-sharp" size={size} color={color} />;
};

//icono de chat
export const Iconchat = ({
  color = ColorItem.MediumGreen,
  size = sizeDefault,
}) => {
  return (
    <MaterialCommunityIcons
      name="chat-processing-outline"
      size={size}
      color={color}
    />
  );
};

//icono de reporte
export const IconReport = ({
  color = ColorItem.MediumGreen,
  size = sizeDefault,
}) => {
  return <Octicons name="report" size={size} color={color} />;
};

// icono de home
export const IconHome = ({ size = 30,  color = ColorItem.MediumGreen }) => {
  return <MaterialIcons name="home" size={size} color={color} />;
};

// icono registrar
export const IconAddCircle = () => {
  return (
    <MaterialIcons
      name="add-circle"
      size={sizeDefault}
      color={ColorItem.MediumGreen}
    />
  );
};

// icono comentario
export const Iconcommenting = ({ size =sizeDefault, color = ColorItem.MediumGreen }) => {
  return <FontAwesome name="commenting" size={size} color={color} />;
};

// icono de usuario
export const IconCustomUser = () => {
  return (
    <MaterialCommunityIcons
      name="account-circle"
      size={sizeDefault}
      color={ColorItem.MediumGreen}
    />
  );
};

// icono de default o null
export const IconAndroid = () => {
  return (
    <AntDesign
      name="android1"
      size={sizeDefault}
      color={ColorItem.MediumGreen}
    />
  );
};

export const IconClassRoom = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return (
    <MaterialCommunityIcons name="google-classroom" size={size} color={color} />
  );
};

export const IconCalendar = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return <Ionicons name="calendar" size={size} color={color} />;
};

export const IconLogout = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return <SimpleLineIcons name="logout" size={size} color={color} />;
};

export const IconCheckboxMultipleCircle = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return (
    <MaterialCommunityIcons
      name="checkbox-multiple-marked-circle-outline"
      size={size}
      color={color}
    />
  );
};

export const IconPassword = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return <MaterialIcons name="password" size={size} color={color} />;
};

export const IconUserCircle = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return <FontAwesome6 name="user-circle" size={size} color={color} />;
};

export const IconSlider = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return <FontAwesome name="sliders" size={size} color={color} />;
};

export const IconCheckDone = () => {
  return (
    <Ionicons name="checkmark-done" size={25} color={ColorItem.CianBlue} />
  );
};

export const IcontvOn = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return <Ionicons name="tv-sharp" size={size} color={color} />;
};

export const IcontvOff = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen,
}) => {
  return <MaterialIcons name="tv-off" size={size} color={color} />;
};

export const IconWifi = ({
  size = sizeDefault,
  color = ColorItem.MediumGreen, type
}) => {
  return <MaterialIcons name={type} size={size} color={color} />;
};

export const IconTimeTable = () => {
  return <MaterialCommunityIcons name="timetable" size={24} color="black" />
};

