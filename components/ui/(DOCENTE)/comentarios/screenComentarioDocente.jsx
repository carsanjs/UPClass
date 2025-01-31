import CustomStack from "../../Components/view/customStack";
import { IndexComentarioDocente } from "./components/comentarios";

export const ScreenComentarioDocente = () => {
  const screens = [
    {
      name: "ComentariosDocente",
      component: IndexComentarioDocente,
      title: "Mis Comentarios",
    },
  ];
  return <CustomStack initialRouteName="ComentariosDocente" screens={screens} />;
};
