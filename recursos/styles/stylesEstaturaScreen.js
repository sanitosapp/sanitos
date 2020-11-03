import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#05A4AC",
    borderRadius: 4,
    width: 300,
    left: 30,
  },
  inputBirthday: {
    marginTop:10,
    marginHorizontal: 30,
    borderRadius: 4,
    height: 40,
    fontSize: 16,
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
  textAgregar1: {
    fontSize: 16,
    color: "#C4C4C4",
  },
  boxTitle: {
    marginTop: 40,
    marginHorizontal: 30,
    flexDirection: "row",
    backgroundColor: '#C13273',
    justifyContent: "space-around",
    height: 36,
    borderRadius: 4,
    alignItems: "center",
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
  },

  boxHeight: {
    marginBottom: 20,
    marginHorizontal: 30,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    height: 36,
    borderRadius: 4,
    alignItems: "center",
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
  },
  title1: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  modalView: {
    width: "85%",
    height: "48%",
    backgroundColor: "white",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 16,
  },
  iconBox: {
    marginHorizontal:20,
    marginVertical:15,
    textAlign:'right',
    color:"#B0B0B0"
  },
  titleModal: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 30,
    color:"#B0B0B0",
  },
  input1:{
    marginTop:20,
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
  },
  marginBottom:20,
},
buttonModal: {
  backgroundColor: '#C13273',
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 30,
  marginTop: 30,
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
  input: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    borderRadius: 4,
    height: 40,
    fontSize: 16,
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
  cardTitle: {
    padding: 10,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breadcrumb: {
    marginTop: 40,
    textAlign: "left",
    color: "#424242",
    fontSize: 16,
    left: 30,
  },
  containerFeEs: {
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
  textWhite: {
    color: "#fff"
  },
  textButton: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff"
  },
  modalBox: {
    height: "80%",
    width: "80%",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 4,
  },
  boxModal: {
    height: "80%",
    width: "80%",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 4,
  },
  textAgregar: {
    color: "#ffffff",
    fontWeight: "500"
  },
  estatura: {
    borderRightWidth: 1,
    borderRightColor: "#1C94A4",
    width: 113,
    height: 40,
    textAlign: "center",
  },

});


export default styles;