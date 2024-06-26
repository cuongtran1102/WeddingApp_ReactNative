import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    imageStyle:{
        height: screenHeight * 0.33,
    },
    viewIcon:{
        width: 33,
        height: 33,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginLeft: 10,
        marginTop: 10,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewDiscription:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: screenHeight * 0.18,
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
    textPrice:{
      fontSize: 15,
      color: '#ff0000',
      marginLeft: 15,
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
        fontSize: 12,
        color: '#000080',
        fontWeight: 'bold'
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
        backgroundColor: 'rgba(0, 0, 255, 0.7)',
        borderRadius: 8,
        padding: 10
      },
      txtConfirm:{
        marginTop: 10,
        marginLeft: 10,
        fontSize: 12,
        color: '#000080',
        fontWeight: 'bold'
      },
      avatarUser:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
      },
      viewComment:{
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#00ffff',
        borderRadius: 8,
        padding: 8
      },
      viewInforUser:{
        flexDirection: 'row',
        alignItems: 'center'
      },
      textNameUser:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000080'
      },
      textComment:{
        marginTop: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000080'
      },
      buttonTotal:{
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'red',
        borderRadius: 8,
        marginRight: 10
      },
      contentTotal:{
        flexDirection: 'row'
      },
      viewTotal:{
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      textContentTotal:{
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 5
      },
      textTotal:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red'
      }
});