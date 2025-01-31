import { Authenticated } from "../../src/hooks/Authenticated";
import { useAuth } from "../../src/hooks/use/useAuth";
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { Redirect } from "expo-router";
import HomeDirector from "./director";
import HomeSupervisor from "./supervisor";
import HomeDocente from "./docente";

export default function IndexDirector() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/" />;

  let ComponentToRender;

  switch (user.rol) {
    case "director":
      ComponentToRender = HomeDirector ;
      break;
    case "supervisor":
      ComponentToRender = HomeSupervisor;
      break;
    case "docente":
      ComponentToRender = HomeDocente;
      break;
    default:
      return <Redirect href="/" />;
  }
  return (
    <Authenticated>
      <GestureHandlerRootView> 
        <ComponentToRender />
       </GestureHandlerRootView> 
    </Authenticated>
  );
}
