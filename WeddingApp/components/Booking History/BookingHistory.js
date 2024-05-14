import { ActivityIndicator, Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecentlyBooking from "./RecentlyBooking";
import History from "./History";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ManageParty from "../ManageParty/ManageParty";
import CancelParty from "../ManageParty/CancelParty";
import RejectedParty from "../ManageParty/RejectedParty";

const Tab = createMaterialTopTabNavigator();

export default BookingHistory = () => {
    const [role, setRole] = useState('')


    useEffect(() => {
        const loadRole = async() => {
            let role = await AsyncStorage.getItem('role')
            setRole(role)
            console.log(role)
        }
        loadRole()
    }, [])


    if (role === null) <ActivityIndicator />

    return(
        <>
            {role === 'EMPLOYEE' ? 
        <Tab.Navigator 
        screenOptions={{
            tabBarItemStyle:{padding: 1},
            tabBarLabelStyle: {fontSize: 10, color: '#000080'},
            tabBarShowIcon: true,
        }}
        initialRouteName="RecentlyBooking">
           <Tab.Screen name="Hủy đặt tiệc" component={CancelParty} options={{
                tabBarIcon: () => {
                    return(<Ionicons name="newspaper-outline" size={24} color='#000080'/>);
                }
            }}/>
            <Tab.Screen name="Lịch sử hủy" component={RejectedParty} options={{
                tabBarIcon: () => {
                    return(<Ionicons name="timer-outline" size={24} color='#000080'/>);
                }
            }}/>

        </Tab.Navigator>  
        
        :<Tab.Navigator 
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
        }
        </>
    );
}