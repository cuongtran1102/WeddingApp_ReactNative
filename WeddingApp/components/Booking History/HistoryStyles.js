import { Dimensions, StyleSheet } from "react-native"

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    card:{
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#98fb98',
        borderRadius: 10
    },
    cardHistory:{
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#00ffff',
        borderRadius: 10
    },
    cardImage:{
        height: screenHeight * 0.18,
        borderRadius: 10
    },
    cardContent:{
        marginVertical: 5,
        marginHorizontal: 10
    },
    cardTitle:{
        fontWeight: 'bold',
        color: '#4b0082',
        fontSize: 15
    },
    bookingDate:{
        color: '#4b0082',
        fontSize: 12,
        fontStyle: 'italic'
    },
    cardPrice:{
        fontSize: 12,
        fontWeight: 'bold',
        color: 'red'
    },
    buttonFeedBack:{
        marginBottom: 5,
        marginHorizontal: screenWidth * 0.12,
        backgroundColor: '#1e90ff',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonBooking:{
        marginBottom: 5,
        marginHorizontal: screenWidth * 0.12,
        backgroundColor: '#f0f8ff',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    bookingText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4b0082'
    }
});