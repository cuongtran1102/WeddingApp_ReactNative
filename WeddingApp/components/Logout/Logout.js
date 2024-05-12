import { ActivityIndicator, Alert, Button, Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import LogoutStyle from "./LogoutStyle";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../contexts/UserContext";
import Login from "../Login/Login";
import { Ionicons } from "@expo/vector-icons";

export default Logout = ({navigation}) =>{
    const [loading, setLoading] = useState(false)
    const [currentUser, dispatch] = useContext(UserContext)

    const createLogoutAlert = () => {
        Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất?', [
            {
                text: 'Hủy'
            },
            {
                text: 'Đăng xuất',
                onPress: Logout
            }
        ]);
    }

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
            <TouchableOpacity style={LogoutStyle.btnLogout} onPress={createLogoutAlert}>
                <Ionicons name="log-out-outline" size={30} color={'white'}/>
                <Text style={LogoutStyle.textLogout}>Đăng xuất</Text>
            </TouchableOpacity>
            }
        </View>
    );
}