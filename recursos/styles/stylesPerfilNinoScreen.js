import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    infoCard: {
      marginBottom: 24,
      borderWidth: 1,
      borderColor: "#05A4AC",
      borderRadius: 4,
      width: 300,
      left: 30,
    },
    containerCards: {
      marginTop: 30,
    },
    containerIconos: {
      backgroundColor: "#fff",
      borderColor: "#05A4AC",
      borderWidth: 2,
      borderRadius: 4,
      width: 106,
      height: 106,
      alignContent: "center",
      justifyContent: "center",
    },
    boxIconos:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 22,
    },
    iconCenter:{ 
        width: 50, 
        height: 50, 
        alignSelf: "center" 
    },
    textIcon:{
        display: "flex",
        alignItems: "flex-start",
        textAlign: "center",
        marginTop: 10,
        color: "#1D96A3",
    },
    containerIcon2:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 22,
    },


  });
  

export default styles;