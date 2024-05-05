import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import EditProfileStyles from "./EditProfileStyles";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import API, { AuthAPI, Endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import {append} from 'domutils'
import * as ImgPicker from 'expo-image-picker'
import { processImagePicker } from "../../configs/Utils";
import UserContext from "../../contexts/UserContext";

export default EditProfile = () => {
  const [user, setUser] = useState({
    'first_name': '',
    'last_name': '',
    'email': ''
  })
  const [avatar, setAvatar] = useState(null)
  const [localAvatar, setLocalAvatar] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [, dispatch] = useContext(UserContext)

  // function
  const changeValue = (field, value) => {
    setUser(current => {
      return { ...current, [field]: value}
    })
  }

  const uploadImage = async() => {
    let {status} = await ImgPicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
        Alert.alert('Ứng dụng không có quyền truy cập')
        return
    }

    let result = await ImgPicker.launchImageLibraryAsync()
    if (result.canceled) {
      setAvatar(currentUser.avatar)
      setLocalAvatar(null)
    } else {
      setAvatar(result.assets[0].uri)
      setLocalAvatar(result.assets[0])
    }
  }

  const edit = async () => {
    let form = new FormData()
    for(let key in user) {
      form.append(key, user[key])
    }
    if (localAvatar) {
      let img = processImagePicker(localAvatar)
      form.append('avatar', img)
    }
    let token = await AsyncStorage.getItem('token')
    try {
      setLoading(true)
      
      let res = await AuthAPI(token).put(Endpoints['user']['edit'], form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      Alert.alert('Cập Nhật thành công')
      setIsUpdated(!isUpdated)
    } catch(ex) {
      Alert.alert('Có lỗi xảy ra')
      console.log(ex.response.data)
    } finally {
      setLoading(false)
    }
  }


  // useEffect
  useEffect(() => {

    const loadUser = async() => {
      let token = await AsyncStorage.getItem('token')
      let res = await AuthAPI(token).get(Endpoints['user']['current'])
      setCurrentUser(res.data)
      console.log(res.data)
      setAvatar(res.data.avatar)
      // setLocalAvatar
      dispatch({
        'type': 'login',
        'payload': res.data
      })
    }

    loadUser()

  }, [isUpdated])


  if (currentUser === null)
    return <ActivityIndicator />


  return (
    <ScrollView>
      <View style={EditProfileStyles.viewAvatar}>
        <View style={EditProfileStyles.viewTextEdit}>
          <Text style={EditProfileStyles.txtAvatar}>Ảnh Đại Diện</Text>
          <TouchableOpacity onPress={uploadImage}>
            <Text style={EditProfileStyles.txtEdit}>Chỉnh Sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={EditProfileStyles.viewImg}>
          { avatar && <Image
            style={EditProfileStyles.imgAvatar}
            source={{ uri: avatar}} />}
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
          {loading ? <ActivityIndicator /> : <Text style={EditProfileStyles.txtSave}>Lưu Thông Tin</Text>}
        </TouchableOpacity>
    </ScrollView>
  );
}