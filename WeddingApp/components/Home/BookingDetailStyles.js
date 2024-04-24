import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    imageStyle:{
        height: screenHeight * 0.36,
    },
    viewIcon:{
        width: 33,
        height: 33,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginLeft: 10,
        marginTop: 30,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewDiscription:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: screenHeight * 0.2,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    textTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 1,
        marginLeft: 15
    },
    textDiscription:{
        fontSize: 10,
        fontStyle: 'italic',
        color: '#ffe4b5',
        marginLeft: 15
    },
    viewBooking:{
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    btnBooking:{
        backgroundColor: '#ffe4b5',
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center',
    },
    txtBooking:{
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#000080',
        fontSize: 12
    },
    line:{
        marginTop: 10,
        borderBottomColor: '#2f4f4f',
        borderBottomWidth: 1,
        marginHorizontal: 10
    },

    dropdown: {
        width: screenWidth * 0.31,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffe4b5',
        borderRadius: 8,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },

      btnBookingParty:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        borderRadius: 8,
        padding: 12
      }
});