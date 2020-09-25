import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  greeting: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    color: "#424242",
  },
  errorMessage: {
    color: "#E9446A",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#C4C4C4",
    height: 40,
    fontSize: 16,
    color: "#161F3D",
    padding: 10,
  },
  buttonL: {
    position: "absolute",
    top: 482,
    left: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonR: {
    position: "absolute",
    top: 540,
    left: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 205,
    height: 205,
    marginTop: 40,
    alignSelf: "center",
  },
  textButtonL: { color: "#ffffff", fontWeight: "500", fontSize: 16 },
  textButtonR: { color: "#ffffff", fontWeight: "500", fontSize: 16 },
});

export default styles;
