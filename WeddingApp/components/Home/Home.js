import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import HistoryStyles from "../Booking History/HistoryStyles";
import API, { Endpoints } from "../../configs/API";

export default Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isloading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadComplete, setIsLoadComplete] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            let url = Endpoints['wedding-hall']['list'];
            const response = await API.get(`${url}?page=${currentPage}`);
            if (response.data.next === null) {
                setIsLoadComplete(true);
            }
            setData([...data, ...response.data.results]);
            setCurrentPage(currentPage + 1);
            setIsLoading(false);
        }
        catch (ex) {
            console.log(ex)
        }
    };

    const renderItem = ({ item }) => (
        <View style={HistoryStyles.card}>
            <Image
                source={{ uri: item.img }}
                style={HistoryStyles.cardImage} />
            <View style={HistoryStyles.cardContent}>
                <Text style={HistoryStyles.cardTitle}>{item.name}</Text>
                <Text style={HistoryStyles.bookingDate}>{item.description_text}</Text>
            </View>
            <TouchableOpacity style={HistoryStyles.buttonBooking}>
                <Text style={HistoryStyles.bookingText}>Đặt Tiệc</Text>
            </TouchableOpacity>
        </View>
    );

    const handleEndReached = () => {
        if (!isloading && !isLoadComplete) {
            fetchData();
        }
    };

    const renderFooter = () => {
        return isloading ? (
            <View style={{ alignItems: 'center', paddingVertical: 20, marginBottom: 60 }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        ) : <View style={{ height: 80 }} />;
    };

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        setData([]);
        setCurrentPage(1);
        setIsLoading(false);
        setIsLoadComplete(false);

        fetchData();
        setIsRefreshing(false);
    }, []);

    return (
        <View>
            <View style={MyStyles.viewInput}>
                <Ionicons name="search-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                <TextInput placeholder="Tra cứu..." style={MyStyles.searchInput}></TextInput>
            </View>
            <View style={MyStyles.line} />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />}
            />
        </View>
    );
}