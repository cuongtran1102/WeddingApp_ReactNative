import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LoginStyles from "./LoginStyles";
import { useState } from "react";
import API, { Endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try{
            let {data} = await API.post(Endpoints['user']['login'],
                {
                    "client_id": "mlxGinrkhw2faB4TqRss7duykFqrMfiTTnn2EiCQ",
                    "client_secret": "MhB17AQbUeqd4kLH1WDZ2kFleBR7owqt636pKR5vpfnmEQi9TBn1WxZDwlsCsd7dUuoq8BVAxCBqIhgy7DCxv30QpeIPGlnc9JBMPGzRs5eryo8IkDX1t7D5e5YBXtZG",
                    "grant_type": "password",
                    "password": password,
                    "username": username
                })
            await AsyncStorage.setItem('token', data.access_token)
        }
        catch(ex){
            Alert.alert('Sai tai khoan hoac mat khau')
        }
    }

    return(
        <SafeAreaView>
            <View style={LoginStyles.container}>
                <View style={LoginStyles.item}>
                    <Text style={LoginStyles.textLogin}>Đăng Nhập</Text>
                    <Text style={LoginStyles.textTitle}>Booking For Your Party</Text>
                </View>
                <View style={LoginStyles.viewInput}>
                    <Ionicons name="person-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                    <TextInput
                    onChangeText={evt => setUsername(evt)}
                        placeholder="UserName"
                        style={LoginStyles.textInput}
                    />
                </View>
                <View style={LoginStyles.viewInput}>
                    <Ionicons name="lock-closed-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                    <TextInput
                    onChangeText={evt => setPassword(evt)}
                        placeholder="Password"
                        secureTextEntry={true}
                        style={LoginStyles.textInput}
                    />
                </View>
                <TouchableOpacity onPress={login} style={LoginStyles.loginBtn}>
                    <Text style={LoginStyles.textBtn}>Đăng Nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 20}}>
                    <Text style={LoginStyles.textRegister}>Tạo tài khoản mới</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}