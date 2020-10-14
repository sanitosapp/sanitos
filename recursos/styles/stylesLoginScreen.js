import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FBFBFB",
  },
  textTitle: {
    marginTop: 84,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: "#B0B0B0",
  },
  errorMessage: {
    marginTop:10,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#E9446A",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    borderRadius: 4,
    height: 40,
    width:"85%",
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
  input1:{
    marginTop:76,
  },
  input2:{
    marginTop:18,
  },
  button: {
    backgroundColor: '#C13273',
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    height: 40,
    borderRadius: 4,
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    
  },
  buttonFb: {
    backgroundColor: "#3C609F",
    width: "85%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 30,
    height: 40,
    borderRadius: 4,
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    flexDirection:'row',
  },
  buttonGo: {
    backgroundColor: "#fff",
    width: "85%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 30,
    height: 40,
    borderRadius: 4,
    elevation: 16,
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      widht: 1,
      height: 1
    },
    flexDirection:'row',
  },
  button1:{
    marginTop:18,
  },
  button2:{
    marginTop:18,
  },
  button3:{
    marginTop:18,
  },
  textForgotPass: {
    marginTop: 12,
    color: "#1D96A3",
    fontSize: 12,
    textAlign: "right",
    marginHorizontal: 30,
  },
  textbutton: {
    fontSize: 14,
    color: "#fff",
  },
  textbutton1: {
    fontSize: 14,
    color: "#ABABAB",
  },
  containerTextRegister: { 
    alignSelf: "center", 
    marginTop: 48, 
  },
});

export default styles;
