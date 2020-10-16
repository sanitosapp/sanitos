import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCards: {
    marginTop: 50,
  },
  textCard:{
    textTransform:"capitalize",
    color: '#838383',
    paddingTop:6,
  },
  textCard1:{
    textTransform:"capitalize",
    color: '#838383',
    paddingTop:6,
    paddingBottom:6,
  },
  containerIconos: {
    backgroundColor: "#fff",
    borderRadius: 4,
    width: 106,
    height: 106,
    alignContent: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 0,
      height: 1
    },
  },
  boxIconos: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 22,
  },
  iconCenter: {
    alignSelf: "center"
  },
  textIcon: {
    display: "flex",
    alignItems: "flex-start",
    textAlign: "center",
    marginTop: 10,
    color: "#1D96A3",
  },
  containerIcon2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 22,
  },
  infoCard: {
    marginBottom: 20,
    marginHorizontal:30,
    backgroundColor:"#fff",
    borderRadius: 4,
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    justifyContent:"center",
    alignContent:"center"
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
    justifyContent:"space-around",
  },
  paddingCard: {
    paddingVertical: 10
  },

});


export default styles;