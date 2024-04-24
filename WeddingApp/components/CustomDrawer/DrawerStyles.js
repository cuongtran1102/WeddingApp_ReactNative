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
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
      },
      userEmail: {
        fontSize: 14,
        color: '#666',
        marginRight: 10
      },
});