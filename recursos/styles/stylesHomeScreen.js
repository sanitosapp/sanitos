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
    textWelcome: { 
        marginTop: 60, 
        left: 30, 
        fontSize: 16 
    },
    textName : {
        fontSize: 16,
        textAlign: "center",
        backgroundColor: "#1D96A3",
        padding: 6,
        color: "#fff",
        textTransform: "uppercase",
    },
    rowCard: { 
        flexDirection: "row" 
    },
    paddingCard: { 
        padding: 10 
    },
    textCard:{
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
        alignItems: "center" 
    },
    modalContainer: {
        height: "80%",
        width: "80%",
        backgroundColor: "grey",
        padding: 10,
        borderRadius: 4,
    },
    

});

export default styles;