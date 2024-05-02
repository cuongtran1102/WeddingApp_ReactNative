import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import EditProfileStyles from "./EditProfileStyles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import API, { AuthAPI, Endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

export default EditProfile = () => {
  const [user, setUser] = useState({
    'first_name': '',
    'last_name': '',
    'email': ''
  })
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // function
  const changeValue = (field, value) => {
    setUser(current => {
      return { ...current, [field]: value}
    })
  }

  const edit = async () => {
    let form = new FormData()
    for(let key in user) {
      form.append(key, user[key])
    }
    try {
      setLoading(true)
      let token = await AsyncStorage.getItem('token')
      let res = await AuthAPI(token).put(Endpoints['user']['edit'], form)
      Alert.alert('Cập Nhật thành công')
    } catch(ex) {
      Alert.alert('Có lỗi xảy ra')
      console.log(ex)
    }
  }


  // useEffect
  useEffect(() => {

    const loadUser = async() => {
      let token = await AsyncStorage.getItem('token')
      let res = await AuthAPI(token).get(Endpoints['user']['current'])
      setCurrentUser(res.data)
    }

    loadUser()

  }, [loading])


  if (currentUser === null)
    return <ActivityIndicator />


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
            onChangeText={evt => changeValue('first_name', evt)}
          />
        </View>
        <View style={EditProfileStyles.viewInput}>
          <Ionicons name="people-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Họ và Tên Đệm"
            style={EditProfileStyles.textInput}
            onChangeText={evt => changeValue('last_name', evt)}
          />
        </View>
        <View style={EditProfileStyles.viewInput}>
          <Ionicons name="mail-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Email"
            style={EditProfileStyles.textInput}
            onChangeText={evt => changeValue('email', evt)}
          />
        </View>
      </View>
        <TouchableOpacity style={EditProfileStyles.viewBtnSave} onPress={edit}>
          <Text style={EditProfileStyles.txtSave}>Lưu Thông Tin</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}