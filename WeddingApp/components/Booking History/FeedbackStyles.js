import { StyleSheet } from "react-native";

export default StyleSheet.create({
    viewTextDiscription:{
        alignItems: 'center'
    },
    textDiscription:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000080'
    },
    viewBookingDate:{
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBookingDate:{
        fontSize: 12,
        color: '#000080'
    },
    textTotalPrice:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red'
    },
    viewMenu:{
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#98fb98',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageMenu:{
        width: 50,
        height: 40,
        borderRadius: 10,

    },
    textPriceMenu:{
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold',
        marginRight: 10
    },
    textNameMenu:{
        fontSize: 12,
        color: '#000080',
        fontWeight: 'bold'
    },
    viewService:{
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#00ffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    textNameService:{
        fontSize: 12,
        color: '#000080',
        fontWeight: 'bold',
    },
    textPriceService:{
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold',
    },
    viewInputComment:{
        backgroundColor: '#00ffff',
        borderRadius: 8,
        padding: 8,
        marginTop: 10,
        marginHorizontal: 10
    },
    textInputComment:{
        fontSize: 12,
        color: '#000080'
    },
    viewBtnComment:{
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: 'blue',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
    textBtnComment:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    viewQuantity:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    viewBtnCancel:{
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
});