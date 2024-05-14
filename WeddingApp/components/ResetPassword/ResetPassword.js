import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ToastAndroid } from "react-native";
import MyStyles from "../../styles/MyStyles";
import ResetPasswordStyles from "./ResetPasswordStyles";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI, Endpoints } from "../../configs/API";

export default ResetPassword = () => {
    // useState
    const [changePassword, setChangePassword] = useState({
        'current_password': '',
        'new_password': ''
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)


    // function
    const changeValue = (field, value) => {
        setChangePassword(current => {
            return {...current, [field]: value}
        })
    }

    const changePwd = async () => {
        if(changePassword['current_password'] === ''){
            ToastAndroid.showWithGravity(
                'Hãy nhập mật khẩu hiện tại',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            return;
        }
        else if (changePassword['new_password'] !== confirmPassword) {
            ToastAndroid.showWithGravity(
                'Mật khẩu mới và nhập lại không trùng khớp',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            return;
        }
        let token = await AsyncStorage.getItem('token')
        try {
            setLoading(true)
            let {data} = await AuthAPI(token).post(Endpoints['user']['change-password'], changePassword)
            Alert.alert('Thông báo', 'Đổi mật khẩu thành công.')
        } catch(ex) {
            Alert.alert('Thông báo', 'Mật khẩu hện tại không hợp lệ')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={ResetPasswordStyles.container}>
            <Text style={ResetPasswordStyles.textNotification}>Trong trường hợp quên mật khẩu quý khách vui lòng liên hệ
                trực tiếp với đội ngũ kỹ thuật để được hỗ trợ lấy lại mật khẩu
            </Text>
            <View style={MyStyles.line} />
            <TextInput style={ResetPasswordStyles.textInput} placeholder="Nhập mật khẩu hiện tại" 
                        secureTextEntry={true} onChangeText={evt => changeValue('current_password', evt)} />
            <TextInput style={ResetPasswordStyles.textInput} placeholder="Nhập mật khẩu mới" 
                        secureTextEntry={true} onChangeText={evt => changeValue('new_password', evt)} />
            <TextInput style={ResetPasswordStyles.textInput} placeholder="Nhập lại mật khẩu mới" 
                        secureTextEntry={true} onChangeText={evt => setConfirmPassword(evt)} />
            <Text style={ResetPasswordStyles.textNote}>Lưu ý: Mật khẩu phải bao gồm ít nhất 6 ký tự
                bao gồm ký tự số, ký tự chữ và ký tự đặc biệt
            </Text>
            <TouchableOpacity onPress={changePwd} style={ResetPasswordStyles.btnResetPassword}>
                {
                    loading ? <ActivityIndicator /> : <Text style={ResetPasswordStyles.textBtn}>Đổi Mật Khẩu</Text>
                }
            </TouchableOpacity>
        </View>
    );
}