import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import RegisterStyles from "./RegisterStyles";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import API, { Endpoints } from "../../configs/API";
import { ActivityIndicator } from "react-native-paper";
import mime from "mime";
import { processImagePicker } from "../../configs/Utils";

export default Register = ({ navigation }) => {
    // useState
    const [user, SetUser] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'username': '',
        'password': ''
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState('')


    // function
    const changeValue = (field, value) => {
        SetUser(current => {
            return { ...current, [field]: value }
        })
    }

    const pickImage = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert('Không có quyền truy cập vào bộ sưu tập')
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync()
            if (!result.canceled) {
                setAvatar(result.assets[0])
                setFileName(result.assets[0].fileName)
            } else {
                setAvatar(null)
            }
        }
    }

    const register = async () => {
        if (confirmPassword !== user['password']) {
            Alert.alert('Mật khẩu và xác nhận mật khẩu không hợp lệ')
            return
        } else if (avatar === null) {
            Alert.alert('Chọn ảnh đại diện')
            return;
        }
        let formData = new FormData()
        for (let item in user) {
            formData.append(item, user[item])
        }
        let formAvatar = processImagePicker(avatar)
        formData.append('avatar', formAvatar)

       try {
        setLoading(true)
        let res = await API.post(Endpoints['user']['register'], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        Alert.alert('Đăng Ký thành công.')
        navigation.navigate('Login')
       } catch(ex) {
        Alert.alert('Có lỗi xảy ra. Vui Lòng thử lại')
        console.info(ex.response.data)
       } finally {
        setLoading(false)
       }
    }

    return (
        <ScrollView>
            <View style={RegisterStyles.container}>
                <View style={RegisterStyles.item}>
                    <Text style={RegisterStyles.textLogin}>Đăng Ký</Text>
                    <Text style={RegisterStyles.textTitle}>Register to Booking your party</Text>
                </View>
                <View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="person-circle-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Tên"
                            style={RegisterStyles.textInput}
                            onChangeText={evt => changeValue('last_name', evt)}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="person-circle-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Họ Và Tên Đệm"
                            style={RegisterStyles.textInput}
                            onChangeText={evt => changeValue('first_name', evt)}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="mail-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                        inputMode="email"
                            placeholder="Email"
                            style={RegisterStyles.textInput}
                            onChangeText={evt => changeValue('email', evt)}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="person-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Tên Đăng Nhập"
                            keyboardType="visible-password"
                            maxLength={16}
                            style={RegisterStyles.textInput}
                            onChangeText={evt => changeValue('username', evt)}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="lock-closed-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Mật Khẩu"
                            maxLength={16}
                            secureTextEntry={true}
                            style={RegisterStyles.textInput}
                            onChangeText={evt => changeValue('password', evt)}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="lock-closed-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Nhập Lại Mật Khẩu"
                            maxLength={16}
                            secureTextEntry={true}
                            style={RegisterStyles.textInput}
                            onChangeText={evt => setConfirmPassword(evt)}
                        />
                    </View>
                    <TouchableOpacity style={RegisterStyles.viewInput} onPress={pickImage}>
                        <Ionicons name="image-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            editable={false}
                            placeholder="Ảnh Đại Diện"
                            style={RegisterStyles.textInput}
                            value={fileName}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={RegisterStyles.loginBtn} onPress={register}>
                    {loading && <ActivityIndicator />}
                    <Text style={RegisterStyles.textBtn}>Đăng Ký</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}