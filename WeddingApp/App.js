import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './components/Home/Home';
import BookingHistory from './components/Booking History/BookingHistory';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import EditProfile from './components/EditProfile/EditProfile';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Logout from './components/Logout/Logout';

const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props}
        />}
        initialRouteName='Home' screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#98fb98',
          },
          headerTintColor: '#f0ffff',
        }}>
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

