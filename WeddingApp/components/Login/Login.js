import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LoginStyles from "./LoginStyles";

export default Login = () =>{
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
                        placeholder="UserName"
                        style={LoginStyles.textInput}
                    />
                </View>
                <View style={LoginStyles.viewInput}>
                    <Ionicons name="lock-closed-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Password"
                        style={LoginStyles.textInput}
                    />
                </View>
                <TouchableOpacity style={LoginStyles.loginBtn}>
                    <Text style={LoginStyles.textBtn}>Đăng Nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 20}}>
                    <Text style={LoginStyles.textRegister}>Tạo tài khoản mới</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}