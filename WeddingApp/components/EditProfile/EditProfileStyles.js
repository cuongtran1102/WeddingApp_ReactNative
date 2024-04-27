import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    viewAvatar:{
        marginTop: 10,
        marginHorizontal: 10
    },
    txtAvatar:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    viewTextEdit:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtEdit:{
        fontSize: 18,
        color: 'blue'
    },
    viewImg:{
        alignItems: 'center',
        marginTop: 10
    },
    imgAvatar:{
        width: screenWidth * 0.4,
        height: screenWidth * 0.4,
        borderRadius: screenWidth * 0.2
    },
    line:{
        marginTop: 10,
        borderBottomColor: '#2f4f4f',
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    viewEditProfile:{
        marginTop: 10
    },
    viewInput:{
        backgroundColor: '#00ffff',
        flexDirection: 'row',
        alignItems: 'center', 
        borderRadius: 8,
        padding: 12,
        marginTop: 8
    },
    textInput:{
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        color: 'black'
    },
    viewBtnSave:{
        marginTop: 60,
        marginHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 255, 0.65)',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
    txtSave:{
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    }
});