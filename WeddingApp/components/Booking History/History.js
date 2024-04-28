import {View, Text, ScrollView, RefreshControl} from "react-native";
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

    return(
        <View style={HistoryStyles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
                contentContainerStyle={HistoryStyles.scrollView}>
                <Text>Booking History</Text>
            </ScrollView>
        </View>
    );
}