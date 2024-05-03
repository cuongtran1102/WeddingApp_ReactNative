import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: screenHeight * 0.06,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginHorizontal: 10
      },
      userInfo: {
        flexDirection: 'column',
      },
      userName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#4b0082'
      },
      userEmail: {
        fontSize: 12,
        color: '#4b0082',
        fontStyle: 'italic',
        marginRight: 10
      },
});