import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import RegisterStyles from "./RegisterStyles";

export default Register = () => {
    return (
        <SafeAreaView>
            <View style={RegisterStyles.container}>
                <View style={RegisterStyles.item}>
                    <Text style={RegisterStyles.textLogin}>Đăng Ký</Text>
                    <Text style={RegisterStyles.textTitle}>Register to Booking your party</Text>
                </View>
                <ScrollView>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="person-circle-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Tên"
                            style={RegisterStyles.textInput}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="person-circle-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Họ Và Tên Đệm"
                            style={RegisterStyles.textInput}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="mail-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Email"
                            style={RegisterStyles.textInput}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="person-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Tên Đăng Nhập"
                            style={RegisterStyles.textInput}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="lock-closed-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Mật Khẩu"
                            style={RegisterStyles.textInput}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="lock-closed-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Nhập Lại Mật Khẩu"
                            style={RegisterStyles.textInput}
                        />
                    </View>
                    <View style={RegisterStyles.viewInput}>
                        <Ionicons name="image-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Ảnh Đại Diện"
                            style={RegisterStyles.textInput}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={RegisterStyles.loginBtn}>
                    <Text style={RegisterStyles.textBtn}>Đăng Ký</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}