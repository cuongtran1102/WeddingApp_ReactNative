import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useState } from "react";
import HistoryStyles from "./HistoryStyles";
export default RecentlyBooking = () => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }, []);

    return (
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <TouchableOpacity style={HistoryStyles.card}>
                    <Image
                        source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/hoa.jpeg' }}
                        style={HistoryStyles.cardImage} />
                    <View style={HistoryStyles.cardContent}>
                        <Text style={HistoryStyles.cardTitle}>Diamond Garden</Text>
                        <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: 01/05/2024</Text>
                        <Text style={HistoryStyles.bookingDate}>Ngày tổ chức: 07/05/2024</Text>
                        <Text style={HistoryStyles.cardPrice}>Tổng chi phí: 15.000.000 VND</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
    );
}