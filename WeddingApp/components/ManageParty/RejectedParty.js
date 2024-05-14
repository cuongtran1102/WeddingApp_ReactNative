import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HistoryStyles from "../Booking History/HistoryStyles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI, Endpoints } from "../../configs/API";

export default RejectedParty = () => {
    const [cancles, setCancles] = useState(null)
    

    useEffect(() => {
        const loadListCancles = async() => {
            let token = await AsyncStorage.getItem('token')

            try {
                let {data} = await AuthAPI(token).get(Endpoints['cancle']['list'])
                console.log('rejected')
                console.log(data)
                setCancles(data)
                console.log(cancles.length)
            setCancles(data)
            } catch(ex) {
                console.log(ex)
            }
        }

        loadListCancles()
    }, [])

    if (cancles === null) return <ActivityIndicator />
    if (cancles.length === 0) return <Text style={{'marginTop': 8, 'marginLeft': 8}}>Không có lịch chờ</Text>


    return(
        <ScrollView>
            {
                cancles.map((item, index) => (
                    <TouchableOpacity style={HistoryStyles.cardHistory} key={index}>
                <Image
                    source={{ uri: item.wedding_party.wedding_hall.img }}
                    style={HistoryStyles.cardImage} />
                <View style={HistoryStyles.cardContent}>
                    <Text style={HistoryStyles.cardTitle}>{item.employee.first_name} {item.employee.last_name}</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: {item.wedding_party.order_date.split('T')[0]}</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày hủy tiệc: {item.cancel_date.split('T')[0]}</Text>
                    <Text style={HistoryStyles.cardPrice}>Tổng chi phí: {item.wedding_party.total} VND</Text>
                </View>
            </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}