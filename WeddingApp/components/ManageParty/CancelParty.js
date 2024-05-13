import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HistoryStyles from "../Booking History/HistoryStyles";
import { useEffect, useState } from "react";
import { AuthAPI, Endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formattedNumber } from "../../configs/Utils";

export default CancelParty = () => {
    const [parties, setParites] = useState(null)
    const [isChange, setIsChange] = useState(false)
    const [loading, setLoading] = useState(false)

    const changeStatus = async (status, partyId) => {
        let token = await AsyncStorage.getItem('token')
        try {
            setLoading(true)
            let res = await AuthAPI(token).post(Endpoints['party']['change-status'](partyId), {
                'status': status
            })
            Alert.alert('Success')
        } catch(ex) {
            Alert.alert('Thất bại')
            console.log(ex)
        } finally {
            setIsChange(!isChange)
            setLoading(false)
        }
    }


    // use effect
    useEffect(() => {
        const loadParitiesPending = async () => {
            let token = await AsyncStorage.getItem('token')
            let {data} =  await AuthAPI(token).get(`${Endpoints['party']['list-history']}?status=PENDING`)
            setParites(data)
        }

        loadParitiesPending()
    }, [isChange])


    if (parties === null) return <ActivityIndicator />


    return (
        <ScrollView>
            {
                parties.length === 0 && <Text style={{'marginTop': 8, 'marginLeft': 8}}>Không có lịch chờ</Text>
            }
            {
                loading && <ActivityIndicator />
            }
            {
                parties.map(item => (
                    <View style={HistoryStyles.cardHistory} key={item.id}>
                <Image
                    source={{ uri: item.wedding_hall.img }}
                    style={HistoryStyles.cardImage} />
                <View style={HistoryStyles.cardContent}>
                    <Text style={HistoryStyles.cardTitle}>{item.wedding_hall.name}</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày đặt tiệc: {item.created_date.split('T')[0]}</Text>
                    <Text style={HistoryStyles.bookingDate}>Ngày tổ chức: {item.order_date.split('T')[0]}</Text>
                    <Text style={HistoryStyles.cardPrice}>Tổng chi phí: {formattedNumber(item.total)} VND</Text>
                </View>
                <TouchableOpacity style={HistoryStyles.buttonFeedBack} onPress={() => changeStatus('REJECTED', item.id)}>
                    <Text style={HistoryStyles.buttonText}>Hủy đặt tiệc</Text>
                </TouchableOpacity>
                <TouchableOpacity style={HistoryStyles.buttonFeedBack} onPress={() => changeStatus('COMPLETED', item.id)}>
                    <Text style={HistoryStyles.buttonText}>Đã xong tiệc</Text>
                </TouchableOpacity>
            </View>
                ))
            }
        </ScrollView>
    );
}