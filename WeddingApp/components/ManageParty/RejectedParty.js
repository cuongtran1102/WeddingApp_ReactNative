import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HistoryStyles from "../Booking History/HistoryStyles";

export default RejectedParty = () => {
    return(
        <ScrollView>
            <TouchableOpacity style={HistoryStyles.cardHistory}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dvevyvqyt/oyjo83xyyqiltzaehlfc' }}
                    style={HistoryStyles.cardImage} />
                <View style={HistoryStyles.cardContent}>
                    <Text style={HistoryStyles.cardTitle}>Name</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: 11-05-2024</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày hủy tiệc: 11-06-2024</Text>
                    <Text style={HistoryStyles.cardPrice}>Tổng chi phí: 1.000.000 VND</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}