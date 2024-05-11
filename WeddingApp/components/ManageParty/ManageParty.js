import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import CancelParty from "./CancelParty";
import RejectedParty from "./RejectedParty";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export default ManageParty = () => {
    return(
        <Tab.Navigator 
        screenOptions={{
            tabBarItemStyle:{padding: 1},
            tabBarLabelStyle: {fontSize: 10, color: '#000080'},
            tabBarShowIcon: true,
        }}>
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
    );
}