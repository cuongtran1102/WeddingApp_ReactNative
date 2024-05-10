import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useCallback, useEffect, useState } from "react";
import HistoryStyles from "./HistoryStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI, Endpoints } from "../../configs/API";
import { Status } from "../../configs/Enum";

export default History = ({navigation}) => {
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
                let { data } = await AuthAPI(token).get(`${Endpoints['party']['history']}?status=${Status['COMPLETED']}`)
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
            {
                parties.map(item => (
                    <View style={HistoryStyles.cardHistory} key={item.id}>
                        <Image
                            source={{ uri: item.wedding_hall.img }}
                            style={HistoryStyles.cardImage} />
                        <View style={HistoryStyles.cardContent}>
                            <Text style={HistoryStyles.cardTitle}>{item.wedding_hall.name}</Text>
                            <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: {item.created_date}</Text>
                            <Text style={HistoryStyles.bookingDate}>Ngày tổ chức: {item.order_date}</Text>
                            <Text style={HistoryStyles.cardPrice}>Tổng chi phí: {item.total} VND</Text>
                        </View>
                        <TouchableOpacity style={HistoryStyles.buttonFeedBack} onPress={() => navigation.navigate('Feedback', {
                            'partyId': item.id
                        })}>
                            <Text style={HistoryStyles.buttonText}>Đánh giá chất lượng dịch vụ {item.id} </Text>
                        </TouchableOpacity>
                    </View>
                ))
            }
        </ScrollView>
    );
}