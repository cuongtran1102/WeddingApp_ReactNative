import { View, Text, TextInput, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import ResetPasswordStyles from "./ResetPasswordStyles";

export default ResetPassword = () => {
    return (
        <View style={ResetPasswordStyles.container}>
            <Text style={ResetPasswordStyles.textNotification}>Trong trường hợp quên mật khẩu quý khách vui lòng liên hệ
                trực tiếp với đội ngũ kỹ thuật để được hỗ trợ lấy lại mật khẩu
            </Text>
            <View style={MyStyles.line} />
            <TextInput style={ResetPasswordStyles.textInput} placeholder="Nhập mật khẩu hiện tại" />
            <TextInput style={ResetPasswordStyles.textInput} placeholder="Nhập mật khẩu mới" />
            <TextInput style={ResetPasswordStyles.textInput} placeholder="Nhập lại mật khẩu mới" />
            <Text style={ResetPasswordStyles.textNote}>Lưu ý: Mật khẩu phải bao gồm ít nhất 6 ký tự
                bao gồm ký tự số, ký tự chữ và ký tự đặc biệt
            </Text>
            <TouchableOpacity style={ResetPasswordStyles.btnResetPassword}>
                <Text style={ResetPasswordStyles.textBtn}>Đổi Mật Khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}