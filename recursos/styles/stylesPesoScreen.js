import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    button: {
      height: 40,
      width: 300,
      left: 30,
      backgroundColor: "#E9446A",
      borderRadius: 4,
  
      alignItems: "center",
      justifyContent: "center",
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
    breadCrumb:{
        marginTop: 40,
        textAlign: "left",
        color: "#424242",
        fontSize: 16,
        left: 30,
    },
    boxTitle:{
        marginTop: 40,
        left: 28,
        flexDirection: "row",
        backgroundColor: "#05A4AC",
        justifyContent: "space-around",
        width: 304,
        height: 36,
        borderRadius: 4,
        alignItems: "center",
    },
    textWhite:{ 
        color: "#fff" 
    },
    textButton:{ 
        textAlign: "center", 
    fontSize: 16, 
    color: "#fff" 
    },
    boxModal:{
        height: "80%",
        width: "80%",
        backgroundColor: "grey",
        padding: 10,
        borderRadius: 4,
    }, 
});

export default styles;