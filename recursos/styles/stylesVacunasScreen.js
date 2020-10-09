import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    alignItems: "center",
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: '28%',
  
  },
  buttonModal: {
    marginTop: 18,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  title: {
    fontSize: 12,
    paddingHorizontal:10,
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    marginLeft: 10,
  },
  listTab: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
  },
  btnTab: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#E6838D",
  },
  infoCard: {
    flexDirection: "row",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#05A4AC",
    borderRadius: 4,
    width: "90%",
    height: 50,
    marginHorizontal:'5%',
    backgroundColor:'white'
  },
  pickerComponent: {
    height: 40,
    width: 270,
    fontSize: 16,
    color: "#C4C4C4",
  },
  dateComponent: {
    borderRadius: 4,
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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  breadCrumb: {
    marginTop: 40,
    textAlign: "left",
    color: "#424242",
    fontSize: 16,
    left: 30,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  col1: {
    borderRightWidth: 1,
    borderRightColor: "#1C94A4",
    width: '30%',
    height: 49,
    justifyContent: 'center',
    alignItems:'center'
  },
  col2: {
    borderRightWidth: 1,
    borderRightColor: "#1C94A4",
    width: '55%',
    height: 49,
     justifyContent: 'center',
    alignItems:'center'
  },
  col3: {
    width: '15%',
    height: 49,
     justifyContent: 'center',
    alignItems:'center'
  },
  formBox: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    width: 270,
    height: 40,
    borderRadius: 4,
    padding: 0,
    color: "#C4C4C4",
  },
  cumpleaños: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    width: 270,
    height: 40,
    borderRadius: 4,
    padding: 10,
    color: "#C4C4C4",
  },
  textCumpleaños: {
    textAlign: "left",
    color: "#C4C4C4",
    fontSize: 16,
  },
  textAgregar: {
    color: "#ffffff",
    fontWeight: "500",
  },
  text: {
    fontSize: 12,
    textAlign:'center'
  }
});

export default styles;
