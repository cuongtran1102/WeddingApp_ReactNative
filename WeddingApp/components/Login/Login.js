import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LoginStyles from "./LoginStyles";
import { useContext, useState } from "react";
import API, { AuthAPI, Endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../contexts/UserContext";
import { CLIENT_ID, CLIENT_SECRET } from "../../configs/Enum";
export default Login = ({navigation}) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const login = async () => {
        try{
            setLoading(true)
            let {data} = await API.post(Endpoints['user']['login'],
                {
                    "client_id": CLIENT_ID,
                    "client_secret": CLIENT_SECRET,
                    "grant_type": "password",
                    "password": password,
                    "username": username
                })
            await AsyncStorage.setItem('token', data.access_token)

            let res = await AuthAPI(data.access_token).get(Endpoints['user']['current'])
            dispatch({
                'type': 'login',
                'payload': res.data
            })
            let resRole = await AuthAPI(data.access_token).get(Endpoints['user']['role'])
            await AsyncStorage.setItem('role', resRole.data === 'None' ? 'customer'.toUpperCase() : resRole.data.toUpperCase())
            navigation.navigate('Home')
        }
        catch(ex){
            Alert.alert('Kết quả đăng nhập', 'Sai tên tài khoản hoặc mật khẩu')
        } finally {
            setLoading(false)
        }
    }

    return(
        <ScrollView>
            <View style={LoginStyles.container}>
                <View style={LoginStyles.item}>
                    <Text style={LoginStyles.textLogin}>Đăng Nhập</Text>
                    <Text style={LoginStyles.textTitle}>Booking For Your Party</Text>
                </View>
                <View style={LoginStyles.viewInput}>
                    <Ionicons name="person-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                    <TextInput
                    onChangeText={evt => setUsername(evt)}
                        placeholder="Tên đăng nhập"
                        keyboardType="visible-password"
                        maxLength={16}
                        style={LoginStyles.textInput}
                        value={username}
                    />
                </View>
                <View style={LoginStyles.viewInput}>
                    <Ionicons name="lock-closed-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                    <TextInput
                    onChangeText={evt => setPassword(evt)}
                        placeholder="Mật khẩu"
                        maxLength={16}
                        secureTextEntry={true}
                        style={LoginStyles.textInput}
                        value={password}
                    />
                </View>
                <TouchableOpacity onPress={login} style={LoginStyles.loginBtn}>
                    { loading ? <ActivityIndicator /> :
                    <Text style={LoginStyles.textBtn}>Đăng Nhập</Text> }
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate('Register')}>
                    <Text style={LoginStyles.textRegister}>Tạo tài khoản mới</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}