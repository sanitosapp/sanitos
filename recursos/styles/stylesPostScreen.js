import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    title1: {
      textAlign: "center",
      fontSize: 15,
      color: "#8A8F9E",
      marginBottom: 20,
      marginTop: 20,
      textTransform: "uppercase",
    },
    greeting: {
      marginTop: 32,
      fontSize: 18,
      fontWeight: "400",
      textAlign: "center",
      color: "#FFF",
    },
    errorMessage: {
      color: "#E9446A",
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30,
    },
    error: {
      color: "#E9446A",
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center",
    },
  
    inputTitle: {
      color: "#8A8F9E",
      fontSize: 10,
      textTransform: "uppercase",
    },
    input: {
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 4,
      height: 40,
      fontSize: 15,
      color: "#161F3D",
      padding: 10,
    },
    button: {
      position: "absolute",
      top: 480,
      backgroundColor: "#E9446A",
      borderRadius: 4,
      height: 40,
      width: 300,
      alignItems: "center",
      justifyContent: "center",
    },
    back: {
      position: "absolute",
      top: 48,
      left: 32,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "rgba(211, 22, 48, 0.1)",
      alignItems: "center",
      justifyContent: "center",
    },
  
    pickerComponent: {
      color: "#C4C4C4",
      width: 300,
      height: 40,
    },
    dateComponent: {
      width: "auto",
      marginTop: 20,
      borderRadius: 4,
    },
    pickerBox: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        width: 300,
        height: 40,
        borderRadius: 4,
        color: "#C4C4C4",
    },
    marginInput:{ 
        marginTop: 20 
    },
    textButton:{ 
        color: "#ffffff", 
        fontWeight: "500" 
    }
  });
  

export default styles;