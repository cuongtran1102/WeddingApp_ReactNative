import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HistoryStyles from "../Booking History/HistoryStyles";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI, Endpoints } from "../../configs/API";
import { formattedNumber } from "../../configs/Utils";

export default RejectedParty = () => {
    const [cancles, setCancles] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setCancles([]);
        loadListCancles();
        setRefreshing(false);
    }, []);

    const loadListCancles = async() => {
        let token = await AsyncStorage.getItem('token')

            try {
                let {data} = await AuthAPI(token).get(Endpoints['cancle']['list'])
                console.log('rejected')
                console.log(data)
                setCancles(data)
        } catch(ex) {
            console.log(ex)
        }
    }
    useEffect(() => {
        loadListCancles()
    }, [])

    if (cancles === null) return <ActivityIndicator />


    return(
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {
                cancles.map((item, index) => (
                    <TouchableOpacity style={HistoryStyles.cardHistory} key={index}>
                <Image
                    source={{ uri: item.wedding_party.wedding_hall.img }}
                    style={HistoryStyles.cardImage} />
                <View style={HistoryStyles.cardContent}>
                    <Text style={HistoryStyles.cardTitle}>{item.employee.first_name} {item.employee.last_name}</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: {item.wedding_party.order_date.split('T')[0]}</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày hủy tiệc: {item.cancel_date.split('T')[0]}</Text>
                    <Text style={HistoryStyles.cardPrice}>Tổng chi phí: {formattedNumber(item.wedding_party.total)} VND</Text>
                </View>
            </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}