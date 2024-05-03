import { Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import HistoryStyles from "../Booking History/HistoryStyles";

export default Home = () => {
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
            <View>
                <View style={MyStyles.viewInput}>
                    <Ionicons name="search-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                    <TextInput placeholder="Tra cứu..." style={MyStyles.searchInput}></TextInput>
                </View>
                <View style={MyStyles.line} />

                {/* Card Item */}
                <View style={HistoryStyles.card}>
                    <Image
                        source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/hoa.jpeg' }}
                        style={HistoryStyles.cardImage} />
                    <View style={HistoryStyles.cardContent}>
                        <Text style={HistoryStyles.cardTitle}>Diamond Garden</Text>
                        <Text style={HistoryStyles.bookingDate}>Sảnh cưới được bày trí theo phong cách
                            vườn hoa kim cương mang lại cảm giác nguy nga tráng lệ</Text>
                    </View>
                    <TouchableOpacity style={HistoryStyles.buttonBooking}>
                        <Text style={HistoryStyles.bookingText}>Đặt Tiệc</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}