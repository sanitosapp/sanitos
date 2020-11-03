import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
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
    }
  },
  textButton: {
    fontSize: 14,
    color: "#fff",
  },
  icon: {
    width: 134,
    height: 113,
    marginTop: 132,
    alignSelf: "center",
  },
  containerButton1:{
    marginTop:237,
  },
  containerButton2:{
    marginTop:18,
  },
});

export default styles;
