import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HistoryStyles from "../Booking History/HistoryStyles";

export default CancelParty = () => {
    return (
        <ScrollView>
            <View style={HistoryStyles.cardHistory}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dvevyvqyt/oyjo83xyyqiltzaehlfc' }}
                    style={HistoryStyles.cardImage} />
                <View style={HistoryStyles.cardContent}>
                    <Text style={HistoryStyles.cardTitle}>Name</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: 11-05-2024</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày tổ chức: 11-06-2024</Text>
                    <Text style={HistoryStyles.cardPrice}>Tổng chi phí: 1.000.000 VND</Text>
                </View>
                <TouchableOpacity style={HistoryStyles.buttonFeedBack}>
                    <Text style={HistoryStyles.buttonText}>Hủy đặt tiệc</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}