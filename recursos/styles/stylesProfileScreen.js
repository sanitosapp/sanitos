import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F4F4'
    },
    input: {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30,
      marginTop:18,
      borderRadius: 4,
      height: 40,
      fontSize: 14,
      color: "#B0B0B0",
      padding: 10,
      backgroundColor:"#fff",
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        widht: -1,
        height: -1
      }
    },
    button: {
      backgroundColor: '#C13273',
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30,
      height: 40,
      borderRadius: 4,
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
        widht: 1,
        height: 1
      }
    },
    titleProfile: {
        marginTop: 40,
        textAlign: "center",
        color: "#B0B0B0",
        fontSize: 16,
    },
    titleProfilec: {
      textAlign: "center",
      color: "#B0B0B0",
      fontSize: 16,
  },
    marginContainer: { 
        marginTop: 32 
    },                                                                                                                                                                                                                                                                                                                                                                                              
    buttonText: { 
        color: "#fff", 
        fontSize: 14 
    },
    cardCuenta:{
      backgroundColor:"#fff",
      padding:8,
      flexDirection:"row",
      justifyContent:"space-between",
      alignContent:"center",
      marginHorizontal:30,
      paddingHorizontal:10,
      borderRadius:4,
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
        widht: 1,
        height: 1
      }
    }
  });
  
  export default styles;