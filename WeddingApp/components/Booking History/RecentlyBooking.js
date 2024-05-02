import { RefreshControl, ScrollView, Text, View } from "react-native";
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
        <View style={HistoryStyles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
                contentContainerStyle={HistoryStyles.scrollView}>
                <Text>RecentlyBooking</Text>
            </ScrollView>
        </View>
    );
}