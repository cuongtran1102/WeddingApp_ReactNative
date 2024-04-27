import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import EditProfileStyles from "./EditProfileStyles";
import { Ionicons } from "@expo/vector-icons";

export default EditProfile = () => {
  return (
    <ScrollView>
      <View style={EditProfileStyles.viewAvatar}>
        <View style={EditProfileStyles.viewTextEdit}>
          <Text style={EditProfileStyles.txtAvatar}>Ảnh Đại Diện</Text>
          <TouchableOpacity>
            <Text style={EditProfileStyles.txtEdit}>Chỉnh Sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={EditProfileStyles.viewImg}>
          <Image
            style={EditProfileStyles.imgAvatar}
            source={{ uri: "https://thanhduong.pythonanywhere.com/static/courses/2022/04/Lighthouse.jpg" }} />
        </View>
      </View>
      <View style={EditProfileStyles.line} />
      <View style={EditProfileStyles.viewAvatar}>
        <Text style={EditProfileStyles.txtAvatar}>Thông Tin Cá Nhân</Text>
        <View style={EditProfileStyles.viewInput}>
          <Ionicons name="person-circle-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Tên"
            style={EditProfileStyles.textInput}
          />
        </View>
        <View style={EditProfileStyles.viewInput}>
          <Ionicons name="people-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Họ và Tên Đệm"
            style={EditProfileStyles.textInput}
          />
        </View>
        <View style={EditProfileStyles.viewInput}>
          <Ionicons name="mail-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Email"
            style={EditProfileStyles.textInput}
          />
        </View>
      </View>
        <TouchableOpacity style={EditProfileStyles.viewBtnSave}>
          <Text style={EditProfileStyles.txtSave}>Lưu Thông Tin</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}