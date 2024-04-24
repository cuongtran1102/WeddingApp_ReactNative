import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
        container: {
            padding: 20
        },
        item:{
            alignItems: 'center'
        },
        textLogin:{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#8a2be2',
            marginTop: screenHeight * 0.1
        },
        textTitle:{
            fontSize: 22,
            color: '#ff00ff',
            fontWeight: 'bold',
            fontStyle: 'italic',
            marginBottom: screenHeight * 0.15
        },
        viewInput:{
            backgroundColor: '#00ffff',
            flexDirection: 'row',
            alignItems: 'center', 
            borderRadius: 8,
            padding: 12,
            marginTop: 20
        },
        textInput:{
            flex: 1,
            fontSize: 15
        },
        loginBtn:{
            marginTop: 40,
            padding: 10,
            backgroundColor: '#0000ff',
            borderRadius: 8,
        },
        textBtn:{
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold'
        },
        textRegister:{
            color: '#00008b',
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center'
        }
    });