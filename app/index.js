import { FormLogin } from "../components/ui/login/formLogin";
import { View, Text, ImageBackground } from "react-native";
import { PublicRoute } from "../src/hooks/PublicRoute";
import LogoUPCWhite from "../assets/svg/LogoUpcWhite";
import LogoSistemasUPC from "../assets/svg/LogoSistemas";
import { ColorItem, styles } from "../components/styles/StylesGlobal";
import { useSafeAreaInset } from "../src/utils/utils";

const Index = () => {
  const insert = useSafeAreaInset();
  return (
    <PublicRoute>
      <View
        style={{
          paddingTop: insert.top,
          paddingBottom: insert.bottom,
          flex: 1,
        }}
      >
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/webp/FondoIndex.webp")}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              marginVertical: 60,
              padding: 12,
            }}
          >
            <View  style={[styles.contentIcon,{
              backgroundColor:ColorItem.MediumGreen
            }]}>
              <LogoUPCWhite />
            </View>
            <View
              style={[
                styles.contentIcon,
                {
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "green",
                },
              ]}
            >
              <LogoSistemasUPC />
            </View>
          </View>
          <View
            style={[
              {
                backgroundColor:"#DFE3E3",
                bottom: 20,
                width: "100%",
                height: "62%",
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                paddingVertical: 15,
                shadowColor: "black",
              },
            ]}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Text style={[styles.titleWelcome, {
                color:ColorItem.DeepFir
              }]} >
                Bienvenido
              </Text>
            </View>
            <FormLogin />
          </View>
        </ImageBackground>
      </View>
    </PublicRoute>
  );
}

export default Index;