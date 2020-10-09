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
     centeredViews: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(212, 228, 231, 0.5)",
  }, 
  modalView: {
    margin: 20,
    width: 300,
    height: 350,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

   iconBox: {
    marginLeft: 220,
  },
     title1: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: 10,
  },
    button: {
      height: 40,
      width: "80%",
      marginHorizontal:"10%",
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
        marginHorizontal:"10%",
        flexDirection: "row",
        backgroundColor: "#05A4AC",
        justifyContent: "space-around",
        width: "80%",
        height: 36,
        borderRadius: 4,
        alignItems: "center",
  },
    
  boxWeight: {
        marginBottom: 20,
        marginHorizontal:"10%",
        flexDirection: "row",
        backgroundColor: "#05A4AC",
        justifyContent: "space-around",
        width: "80%",
        height: 36,
        borderRadius: 4,
        alignItems: "center",
        marginHorizontal:"10%",
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-around",
        width: "80%",
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
     buttonModal: {
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
});

export default styles;