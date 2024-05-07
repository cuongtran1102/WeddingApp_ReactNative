import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import HistoryStyles from "../Booking History/HistoryStyles";
import API, { Endpoints } from "../../configs/API";

export default Home = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false)
    const [halls, setHalls] = useState(null)


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }, []);

    // use effect
    useEffect(() => {
        const loadHalls = async () => {
            try {
                setLoading(true)
                let {data} = await API.get(Endpoints['wedding-hall']['list'])
                setHalls(data.results)
            } catch(ex) {
                console.log(ex)
            } finally {
                setLoading(false)
            }
        }

        loadHalls()
    }, [])

    if (halls === null) return <ActivityIndicator />

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
                {
                    halls.map(item => (
                        <View style={HistoryStyles.card} key={item.id}>
                    <Image
                        source={{ uri: item.img}}
                        style={HistoryStyles.cardImage} />
                    <View style={HistoryStyles.cardContent}>
                        <Text style={HistoryStyles.cardTitle}>{item.name}</Text>
                        <Text style={HistoryStyles.bookingDate}>{item.description_text}</Text>
                    </View>
                    <TouchableOpacity style={HistoryStyles.buttonBooking} onPress={() => {
                        navigation.navigate('BookingDetail', {
                            'weddingHall': item
                        })
                    }}>
                        <Text style={HistoryStyles.bookingText}>Đặt Tiệc</Text>
                    </TouchableOpacity>
                </View>
                    ))
                }
            </View>
        </ScrollView>
    );
}