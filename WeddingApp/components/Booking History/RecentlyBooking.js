import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useState, useEffect } from "react";
import HistoryStyles from "./HistoryStyles";
import { formattedNumber } from "../../configs/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI, Endpoints } from "../../configs/API";
import { Status } from "../../configs/Enum";
export default RecentlyBooking = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState(null)


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }, []);

    useEffect(() => {
        const loadHistory = async () => {
            let token = await AsyncStorage.getItem('token')
            try {
                let { data } = await AuthAPI(token).get(`${Endpoints['party']['history']}?status=${Status['PENDING']}`)
                setParties(data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadHistory()
    }, [])

    if (parties === null) return <ActivityIndicator />

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            {parties.length === 0 && <View style={HistoryStyles.viewHistoryText}><Text style={HistoryStyles.historyText}>Danh sách đặt tiệc trống</Text></View>}
            
            {

                parties.map(item => (
                    <TouchableOpacity style={HistoryStyles.card} key={item.id}>
                        <View>
                            <Image
                                source={{ uri: item.wedding_hall.img }}
                                style={HistoryStyles.cardImage} />
                            <View style={HistoryStyles.cardContent}>
                                <Text style={HistoryStyles.cardTitle}>{item.wedding_hall.name}</Text>
                                <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: {item.created_date.split('T')[0]}</Text>
                                <Text style={HistoryStyles.bookingDate}>Ngày tổ chức: {item.order_date.split('T')[0]}</Text>
                                <Text style={HistoryStyles.cardPrice}>Tổng chi phí: {formattedNumber(item.total)} VND</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
            
        </ScrollView>
    );
}