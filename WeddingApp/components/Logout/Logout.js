import { ActivityIndicator, Button, Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import LogoutStyle from "./LogoutStyle";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../contexts/UserContext";
import Login from "../Login/Login";

export default Logout = ({navigation}) =>{
    const [loading, setLoading] = useState(false)
    const [currentUser, dispatch] = useContext(UserContext)

    const Logout = async () => {
        setLoading(true)
        await AsyncStorage.removeItem('token')
        dispatch({
            'type': 'logout'
        })
        setLoading(false)
        navigation.navigate('Login')
    }


    return(
        <View style={MyStyles.container}>
            { loading ? <ActivityIndicator /> :
            <Button onPress={Logout} title="Đăng Xuất" style={LogoutStyle['btn-logout']} /> }
        </View>
    );
}