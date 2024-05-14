import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useReducer } from 'react';
import Home from './components/Home/Home';
import BookingHistory from './components/Booking History/BookingHistory';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import EditProfile from './components/EditProfile/EditProfile';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Logout from './components/Logout/Logout';
import MyUserReducer from './reducers/MyUserReducers';
import UserContext from './contexts/UserContext';
import Login from './components/Login/Login';
import Feedback from './components/Booking History/Feedback'
import Register from './components/Register/Register';
import BookingDetail from './components/Home/BookingDetail';
import ManageParty from './components/ManageParty/ManageParty';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function App() {
  const [currentUser, dispatch] = useReducer(MyUserReducer, null)


  return (
    <UserContext.Provider value={[currentUser, dispatch]}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props}
          />}
          initialRouteName='Login' screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#98fb98',
            },
            headerTintColor: '#f0ffff',
          }}>

          {currentUser !== null ?
            <>
              <Drawer.Screen
                name='Home'
                component={Home}
                options={{
                  title: 'Dịch Vụ Đặt Tiệc', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                  ),
                }} />
              <Drawer.Screen
                name='BookingHistory'
                component={BookingHistory}
                options={{
                  title: 'Lịch Sử Đặt Tiệc', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />
                  )
                }} />
              <Drawer.Screen
                name='ManageParty'
                component={ManageParty}
                options={{
                  title: 'Quản Lý Đặt Tiệc', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'reader' : 'reader-outline'} size={size} color={color} />
                  )
                }} />
              <Drawer.Screen
                name='BookingDetail'
                component={BookingDetail}
                options={{
                  title: 'Đặt Tiệc',
                  drawerItemStyle: { display: 'none' },
                  drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />
                  )
                }} />
              <Drawer.Screen
                name='Feedback'
                component={Feedback}
                options={{
                  title: 'Đánh giá',
                  drawerItemStyle: { display: 'none' },
                  drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />
                  )
                }} />
              <Drawer.Screen
                name='EditProfile'
                component={EditProfile}
                options={{
                  title: 'Chỉnh sửa thông tin', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
                  )
                }} />
              <Drawer.Screen
                name='ResetPassword'
                component={ResetPassword}
                options={{
                  title: 'Đổi mật khẩu', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'lock-closed' : 'lock-closed-outline'} size={size} color={color} />
                  )
                }} />
              <Drawer.Screen
                name='Logout'
                component={Logout}
                options={{
                  title: 'Đăng xuất', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={color} />
                  )
                }} />
            </> :
            <>
              <Drawer.Screen
                name='Login'
                component={Login}
                options={{
                  title: 'Đăng Nhập', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={color} />
                  ),
                }} />
              <Drawer.Screen
                name='Register'
                component={Register}
                options={{
                  title: 'Đăng Ký', drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'person-add' : 'person-add-outline'} size={size} color={color} />
                  ),
                }} />
            </>

          }

        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

