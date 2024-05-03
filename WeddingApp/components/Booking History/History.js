import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image } from "react-native";
import { useCallback, useState } from "react";
import HistoryStyles from "./HistoryStyles";

export default History = () => {
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
            <View style={HistoryStyles.cardHistory}>
                <Image
                    source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/hoa.jpeg' }}
                    style={HistoryStyles.cardImage} />
                <View style={HistoryStyles.cardContent}>
                    <Text style={HistoryStyles.cardTitle}>Diamond Garden</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: 01/05/2024</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày tổ chức: 07/05/2024</Text>
                    <Text style={HistoryStyles.cardPrice}>Tổng chi phí: 15.000.000 VND</Text>
                </View>
                <TouchableOpacity style={HistoryStyles.buttonFeedBack}>
                    <Text style={HistoryStyles.buttonText}>Đánh giá chất lượng dịch vụ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}