import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#C13273',
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        height: 40,
        borderRadius: 4,
        elevation:16,
        shadowOpacity: 1,
        shadowRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            widht: 1,
            height: 1
        }
    },
    textButton: {
        fontSize: 16,
        color: "#fff",
    }
});

export default styles;