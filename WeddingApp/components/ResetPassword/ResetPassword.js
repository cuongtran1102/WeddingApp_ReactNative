import { View, Text, TextInput } from "react-native";
import MyStyles from "../../styles/MyStyles";
import ResetPasswordStyles from "./ResetPasswordStyles";

export default ResetPassword = () => {
    return(
        <View style={MyStyles.container}>
           <TextInput style={ResetPasswordStyles.textInput} placeholder="Nhập mật khẩu hiện tại"/>
        </View>
    );
}