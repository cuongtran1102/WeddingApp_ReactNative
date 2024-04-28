import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardStyle:{
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#98fb98',
    },
    cardTitle:{
        fontWeight: 'bold',
        color: '#4b0082',
        fontSize: 18
    },
    cardDiscription:{
        fontStyle: 'italic',
        color: '#0000cd',
        fontSize: 12
    },
    cardContent:{
        marginTop: 5,
    },
    btnBookingStyle:{
        width: screenWidth * 0.4,
        backgroundColor: '#f0f8ff',
    },
    cardImage:{
        height: screenHeight * 0.2
    },
    viewInput:{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center', 
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10
    },
    searchInput:{
        flex: 1,
        fontSize: 15,
        color: '#4b0082'
    },
    line:{
        marginTop: 10,
        borderBottomColor: '#2f4f4f',
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
});