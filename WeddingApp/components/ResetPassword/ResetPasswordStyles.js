import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    textInput:{
        backgroundColor: '#00ffff',
        marginHorizontal: 10,
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        color: 'black',
        marginTop: 8
    },
    btnResetPassword:{
        marginTop: 60,
        marginHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 255, 0.65)',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
    textBtn:{
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    textNote:{
        marginTop: 10,
        marginHorizontal: 10,
        fontSize: 12,
        fontStyle: 'italic',
    },
    textNotification:{
        marginBottom: 20,
        marginHorizontal: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red'
    }
});