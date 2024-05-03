import { Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecentlyBooking from "./RecentlyBooking";
import History from "./History";
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

export default BookingHistory = () => {
    return(
        <Tab.Navigator 
        screenOptions={{
            tabBarItemStyle:{padding: 1},
            tabBarLabelStyle: {fontSize: 10, color: '#000080'},
            tabBarShowIcon: true,
        }}
        initialRouteName="RecentlyBooking">
            <Tab.Screen name="Đang đặt tiệc" component={RecentlyBooking} options={{
                tabBarIcon: () => {
                    return(<Ionicons name="newspaper-outline" size={24} color='#000080'/>);
                }
            }}/>
            <Tab.Screen name="Lịch sử đặt tiệc" component={History} options={{
                tabBarIcon: () => {
                    return(<Ionicons name="timer-outline" size={24} color='#000080'/>);
                }
            }}/>

        </Tab.Navigator>
    );
}