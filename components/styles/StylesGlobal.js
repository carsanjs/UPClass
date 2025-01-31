import { StyleSheet } from "react-native";
export const ColorItem = {
  Luigi:"#43B21E",
  GreenSymphony: "#67A623",
  KellyGreen:"#3C9B61",
  MediumGreen:"#388253",
  DeepFir:"#193824" ,
  TarnishedSilver:"#797A7E" ,
  Zircon:"#88C273" ,
  ChromeAluminum:"#AAABAE" ,
  OceanCrest:"#D6DEDE",
  GoldOre:"#EBC115",
  DeepSkyBlue:"#0D6EFD",
  CianBlue:"#009ae5",
  VividRed:"#E71717"
}

export const styles = StyleSheet.create({
  searchArea: {
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal:15,
  },
  
  Title11: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: ColorItem.KellyGreen,
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
  },

  text1: {
    textAlign: "center",
    padding: 8,
    fontSize: 16,
    fontWeight: "medium",
  },

  Title1: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: ColorItem.KellyGreen,
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 6,
  },
  text: {
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "medium",
   
  },
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  asignatura: {
    fontSize: 16,
    fontWeight: "medium",
    padding: 5,
    marginBottom: 5,
  }, 
  comentario: {
    fontSize: 18,
    fontWeight: "medium",

  },
  viewmore: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop:20
  },
  subtitle: {
    paddingVertical: 7,
    fontSize: 17,
    fontWeight: "bold",
    color: "#999999",
  }, 
  container: {
    width: "100%",
    height: "100%",
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    width: 80,
    height: 60,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    // paddingHorizontal: 12,
    overflow: "hidden",
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  /** Placeholder */
  placeholder: {
    height: "100%",
    marginTop: 0,
    padding: 0,
  },
  placeholderInset: {
    borderWidth: 3,
    borderColor: "#ffffff",
    borderRadius: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  titleWelcome: {
    width: "100%",
    height: "auto",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  contentIcon: {
    width: "35%",
    margin: 4,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#fff", // Color de fondo de la barra de pestañas
  },
  indicator: {
    elevation: 5,
    backgroundColor: ColorItem.KellyGreen, // Color del indicador de pestaña activa
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },

  //checkebox filter
  contenCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemInfo: {
    width:"100%",
    padding:6,
  },
  textinfo: {
    fontSize: 16,
    color: "black",
  },
  optionItem: {
    padding: 8,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    borderRadius: 4,
    justifyContent: "center",
    borderBottomColor: ColorItem.TarnishedSilver,
    borderBottomWidth: 1,
  },
});
