import{ActivityIndicator, Alert, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import BookingDetailStyles from '../Home/BookingDetailStyles';
import { Ionicons } from '@expo/vector-icons';
import MyStyles from "../../styles/MyStyles";
import FeedbackStyles from './FeedbackStyles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthAPI, Endpoints } from '../../configs/API';
import { SHIFT } from '../../configs/Enum';

export default Feedback = ({route}) => {
    const [party, setParty] = useState(null)
    const {partyId} = route.params
    const [loading, setLoading]= useState(false)
    const [content, setContent] = useState('')
    const [feedBack, setFeedBack] = useState(null)


    // function
    const feedback = async() => {
        let token = await AsyncStorage.getItem('token')

        try {
            setLoading(true)
            let {data} =  await AuthAPI(token).post(Endpoints['party']['feedback'](partyId), {
                'content': content,
                'wedding_hall_id': party.wedding_hall.id
            })

            console.log(data)
            Alert.alert('Gửi phản hồi thành công')
        } catch(ex) {
            Alert.alert('Gửi phản hồi thất bại')
        } finally {
            setLoading(false)
        }

    }

    // use effect
    useEffect(() => {
        const loadParty = async() => {
            let token = await AsyncStorage.getItem('token')
            console.log(partyId)
            try {
                let {data} = await AuthAPI(token).get(Endpoints['party']['detail'](partyId))
                setParty(data)
            } catch(ex) {
                console.log(ex)
            }
        }

        const get_feedback = async () => {
            let token = await AsyncStorage.getItem('token')
            try {
                let {data} = await AuthAPI(token).get(`${Endpoints['feedback']['party']}?party=${partyId}`)
                // console.log(data)
                setFeedBack(data)
            } catch(ex) {
                setFeedBack(null)
            }
        }

        loadParty()
        get_feedback()
    }, [])

    if (party === null) return <ActivityIndicator />

    return(
        <ScrollView>
            <ImageBackground style={BookingDetailStyles.imageStyle} source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/cx2.jpeg' }}>
                <TouchableOpacity style={BookingDetailStyles.viewIcon}>
                    <Ionicons name="chevron-back-outline" size={24} color={'white'} />
                </TouchableOpacity>
                <View style={BookingDetailStyles.viewDiscription}>
                    <Text style={BookingDetailStyles.textTitle}>{party.wedding_hall.name}</Text>
                    <Text style={BookingDetailStyles.textDiscription}>{party.wedding_hall.description_text}</Text>
                    <Text style={BookingDetailStyles.textPrice}>{
                        party.shift === SHIFT['MORNING'] ? party.price_morning : 
                        party.shift === SHIFT['AFTERNOON'] ? party.price_afternoon : party.price_evening
                    }</Text>
                </View>
            </ImageBackground>
            <View style={MyStyles.line}/>
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Thông tin chi tiết</Text>
            </View>
            <View style={FeedbackStyles.viewBookingDate}>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>Ngày đặt tiệc:</Text>
                <Text style={FeedbackStyles.textBookingDate}>{party.created_date.split('T')[0]}</Text>
            </View>
            <View style={FeedbackStyles.viewBookingDate}>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>Ngày tổ chức tiệc:</Text>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>{party.order_date.split('T')[0]}</Text>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>Buổi:</Text>
                <Text style={FeedbackStyles.textBookingDate}>sáng</Text>
            </View>
            <View style={FeedbackStyles.viewBookingDate}>
                <Text style={[FeedbackStyles.textTotalPrice, {marginRight: 5}]}>Tổng tiền:</Text>
                <Text style={FeedbackStyles.textTotalPrice}>{party.total}</Text>
            </View>
            <View style={MyStyles.line}/>
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Chi tiết menu</Text>
            </View>

            {/* item menu */}
            {
                party.menu_items.map((item, index) => (
                    <View key={index}>
                        <View style={FeedbackStyles.viewMenu}>
                            <Image style={FeedbackStyles.imageMenu}
                                source={{ uri: 'https://res.cloudinary.com/dvevyvqyt/image/upload/v1712892405/kcd2fv3xkeywsmtrdknd.jpg' }} />
                            <Text style={FeedbackStyles.textNameMenu}>{item.menu_name}</Text>
                            <Text style={FeedbackStyles.textPriceMenu}>{item.unit_price * item.quantity}</Text>
                        </View>
                        <View style={FeedbackStyles.viewQuantity}>
                            <Text style={[FeedbackStyles.textNameMenu, { marginRight: 5 }]}>Số lượng:</Text>
                            <Text style={FeedbackStyles.textNameMenu}>{item.quantity}</Text>
                        </View>
                    </View>
                ))
            }

            
            <View style={MyStyles.line} />
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Chi tiết dịch vụ</Text>
            </View>

            {/* item service */}
            {
                party.service_items.map((item, index) => (
                    <View style={FeedbackStyles.viewService} key={index}>
                        <Text style={FeedbackStyles.textNameService}>{item.service_name}</Text>
                        <Text style={FeedbackStyles.textPriceService}>{item.unit_price}</Text>
                    </View>
                ))
            }
            <View style={MyStyles.line}/>
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Đánh giá của khách hàng</Text>
            </View>
            {
                feedBack === null ?
                    <>
                        <View style={FeedbackStyles.viewInputComment}>
                            <TextInput onChangeText={evt => setContent(evt)} style={FeedbackStyles.textInputComment} placeholder='Đánh giá chất lượng dịch vụ' />
                        </View>
                        <TouchableOpacity style={FeedbackStyles.viewBtnComment} onPress={feedback}>
                            {
                                loading ? <ActivityIndicator /> : <Text style={FeedbackStyles.textBtnComment}>Đánh giá</Text>
                            }
                        </TouchableOpacity>
                    </> :
                    <>
                        <View style={FeedbackStyles.viewInputComment}>
                            <TextInput readOnly value={feedBack.content} style={FeedbackStyles.textInputComment} />
                        </View>
                    </>
            }
        </ScrollView>
    );
}