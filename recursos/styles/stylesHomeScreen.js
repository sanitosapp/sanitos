import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  infoCard:{
    width:"85%",
  },
  infoCard1: {
    flexDirection: "column",
    marginTop:4,
    backgroundColor: "#fff",
    marginBottom: 24,
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    borderRadius: 4,
    width: "85%",
  },
  containerCards: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#E9446A",
    borderRadius: 4,

    alignItems: "center",
    justifyContent: "center",
  },
  buttonModal: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    fontSize: 14,
    textAlign: "center",
    padding: 6,
    color: "#fff",
    textTransform: "uppercase",
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    borderRadius: 4,
    height:40,
  },
  textWelcome: {
    marginTop: 30,
    marginHorizontal: 30,
    fontSize: 15,
    color: '#838383',
  },
  textName: {
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "#1D96A3",
    padding: 6,
    color: "#fff",
    textTransform: "uppercase",
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    borderRadius: 4,
  },
  rowCard: {
    flexDirection: "column",
    marginTop:4,
    backgroundColor: "#fff",
    marginBottom: 24,
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    borderRadius: 4,
  },
  paddingCard: {
    paddingHorizontal: 18,
    justifyContent:"center",
    alignContent:"center"
  },
  textCardChild:{
    color:"#838383",
  },
  textCardChildName:{
    color:"#838383",
    textTransform: "capitalize",
  },
  textCard: {
    textAlign: "center",
    padding: 6,
    fontSize: 14,
    color: "#C4C4C4",
  },
  textAgregar: {
    textAlign: "center",
    padding: 20,
    fontSize: 14,
    color: "#C4C4C4",
  },
  textAgregar1: {
    fontSize: 16,
    color: "#C4C4C4",
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "80%",
    width: "80%",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 4,
  },
  centeredViews: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(212, 228, 231, 0.5)",
  },
  modalView: {
    width: "85%",
    height: "65%",
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
  titleModal: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 30,
    color:"#B0B0B0",
  },
  iconBox: {
    marginHorizontal:20,
    marginVertical:15,
    textAlign:'right',
    color:"#B0B0B0"
  },
  button: {
    backgroundColor: "red",
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
  input1:{
    marginTop:20,
  },
  pickerBox:{
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop:10,
    borderRadius: 4,
    height: 40,
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
  picker:{
    color:"#B0B0B0",
    fontSize:14,
    padding: 10,
  }
});

export default styles;
