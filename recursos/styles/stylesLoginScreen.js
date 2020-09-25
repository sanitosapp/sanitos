import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  greeting: {
    marginTop: 84,
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
  button: {
    marginTop: 18,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFb: {
    marginTop: 18,
    backgroundColor: "#3C609F",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginTop: 100,
  },

  textRecoverpassword: {
    marginTop: 12,
    color: "#05A4AC",
    fontSize: 14,
    textAlign: "right",
  },
  textbutton: { color: "#ffffff", fontWeight: "500" },
  buttonRegister: { alignSelf: "center", position: "absolute", top: 564 },
});

export default styles;
