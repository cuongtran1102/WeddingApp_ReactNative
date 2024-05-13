import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import HistoryStyles from "../Booking History/HistoryStyles";
import API, { Endpoints } from "../../configs/API";


export default Home = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isloading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadComplete, setIsLoadComplete] = useState(false);
    const [q, setQ] = useState('')
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)

    useEffect(() => {
        fetchData();
        console.log('useEffect')
    }, []);

    const fetchData = async () => {
        try {
            console.log('fetchData')
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

    const searchWeddingHall = async () => {
        try {
            // setData([]);
            setIsLoadingSearch(true);
            let url = Endpoints['wedding-hall']['list'];
            if (q !== '') {
                url += `?name=${q}`
                const response = await API.get(url);

                if (response.data.results.length === 0) {
                    console.log('Khong tim thay');
                    Alert.alert("Kết quả tra cứu", "Không tìm thấy sảnh cần tra cứu");
                }
                else {
                    setData(response.data.results);
                    setIsLoadComplete(true);
                    console.log('Tim thay');
                }
            }
            else {
                ToastAndroid.showWithGravity(
                    'Hãy nhập tên sảnh cần tra cứu',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP
                );
                console.log('Hay nhap tu khoa can tim')
            }
            setIsLoadingSearch(false);
        }
        catch (ex) {
            console.log(ex);
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
            <TouchableOpacity onPress={() => {
                navigation.navigate('BookingDetail', {
                    'weddingHall': item
                })
            }
            }
                style={HistoryStyles.buttonBooking}>
                <Text style={HistoryStyles.bookingText}>Đặt Tiệc</Text>
            </TouchableOpacity>
        </View>
    );

    const handleEndReached = () => {
        console.log('EndReached');
        if (!isloading && !isLoadComplete) {
            fetchData();
        }
    };

    const renderFooter = () => {
        return isloading ? (
            <View style={{ alignItems: 'center', paddingVertical: 20, marginBottom: 50 }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        ) : <View style={{ height: 80 }} />;
    };

    const onRefresh = useCallback(() => {
        console.log('onfresh')
        setIsRefreshing(true);
        setQ('');
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
                <TextInput value={q} onChangeText={evt => setQ(evt)} placeholder="Nhập tên sảnh..." style={MyStyles.searchInput}></TextInput>
            </View>
            <TouchableOpacity style={MyStyles.buttonSearch} onPress={() => searchWeddingHall()}>
                {
                    isLoadingSearch ? <ActivityIndicator /> :
                        <Text style={MyStyles.textSearch}>Tra Cứu</Text>
                }
            </TouchableOpacity>
            <View style={MyStyles.line} />
            <FlatList
                style={{ marginBottom: 50 }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={() => handleEndReached()}
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