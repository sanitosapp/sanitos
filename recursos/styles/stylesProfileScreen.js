import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      marginBottom: 18,
      left: 30,
      borderColor: "#C4C4C4",
      borderWidth: 1,
      borderRadius: 4,
      height: 40,
      width: 300,
      fontSize: 16,
      color: "#C4C4C4",
      padding: 10,
    },
    button: {
      position: "absolute",
      top: 522,
      left: 30,
      backgroundColor: "#E9446A",
      borderRadius: 4,
      height: 40,
      width: 300,
      alignItems: "center",
      justifyContent: "center",
    },
    button2: {
      position: "absolute",
      top: 464,
      left: 30,
      backgroundColor: "#E9446A",
      borderRadius: 4,
      height: 40,
      width: 300,
      alignItems: "center",
      justifyContent: "center",
    },
    titleProfile: {
        marginTop: 60,
        textAlign: "center",
        color: "#424242",
        fontSize: 16,
        textTransform:'uppercase'
    },
    marginContainer: { 
        marginTop: 32 
    },
    buttonText: { 
        color: "#fff", 
        fontSize: 16 
    }
  });
  
  export default styles;