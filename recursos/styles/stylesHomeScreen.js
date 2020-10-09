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
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  textWelcome: {
    marginTop: 60,
    left: 30,
    fontSize: 16,
  },
  textName: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#1D96A3",
    padding: 6,
    color: "#fff",
    textTransform: "uppercase",
  },
  rowCard: {
    flexDirection: "row",
  },
  paddingCard: {
    padding: 10,
  },
  textCard: {
    textAlign: "center",
    padding: 6,
    fontSize: 16,
    color: "#C4C4C4",
  },
  textAgregar: {
    textAlign: "center",
    padding: 20,
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
  form: {},
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
  title1: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: 10,
  },
  iconBox: {
    marginLeft: 220,
  },
  button: {
    backgroundColor: "red",
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
});

export default styles;
