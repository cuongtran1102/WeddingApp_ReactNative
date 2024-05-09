import{Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import BookingDetailStyles from '../Home/BookingDetailStyles';
import { Ionicons } from '@expo/vector-icons';
import MyStyles from "../../styles/MyStyles";
import FeedbackStyles from './FeedbackStyles';

export default Feedback = () => {
    return(
        <ScrollView>
            <ImageBackground style={BookingDetailStyles.imageStyle} source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/cx2.jpeg' }}>
                <TouchableOpacity style={BookingDetailStyles.viewIcon}>
                    <Ionicons name="chevron-back-outline" size={24} color={'white'} />
                </TouchableOpacity>
                <View style={BookingDetailStyles.viewDiscription}>
                    <Text style={BookingDetailStyles.textTitle}>Flower Garden</Text>
                    <Text style={BookingDetailStyles.textDiscription}>Vườn hoa với hoa đào chủ đạo
                        mang lại cảm giác ấm áp hài hòa phù hợp với những tâm hồn hòa quyện thiên nhiên
                        Vườn hoa với hoa đào chủ đạo
                        mang lại cảm giác ấm áp hài hòa phù hợp với những tâm hồn hòa quyện thiên nhiên</Text>
                    <Text style={BookingDetailStyles.textPrice}>5.500.000 VND</Text>
                </View>
            </ImageBackground>
            <View style={MyStyles.line}/>
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Thông tin chi tiết</Text>
            </View>
            <View style={FeedbackStyles.viewBookingDate}>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>Ngày đặt tiệc:</Text>
                <Text style={FeedbackStyles.textBookingDate}>15-02-2024</Text>
            </View>
            <View style={FeedbackStyles.viewBookingDate}>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>Ngày tổ chức tiệc:</Text>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>15-02-2024</Text>
                <Text style={[FeedbackStyles.textBookingDate, {marginRight: 5}]}>Buổi:</Text>
                <Text style={FeedbackStyles.textBookingDate}>sáng</Text>
            </View>
            <View style={FeedbackStyles.viewBookingDate}>
                <Text style={[FeedbackStyles.textTotalPrice, {marginRight: 5}]}>Tổng tiền:</Text>
                <Text style={FeedbackStyles.textTotalPrice}>1.500.000 VND</Text>
            </View>
            <View style={MyStyles.line}/>
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Chi tiết menu</Text>
            </View>

            {/* item menu */}
            <View style={FeedbackStyles.viewMenu}>
                <Image style={FeedbackStyles.imageMenu} 
                source={{uri: 'https://res.cloudinary.com/dvevyvqyt/image/upload/v1712892405/kcd2fv3xkeywsmtrdknd.jpg'}}/>
                <Text style={FeedbackStyles.textNameMenu}>Bánh bông lan</Text>
                <Text style={FeedbackStyles.textPriceMenu}>80.000 VND</Text>
            </View>
            <View style={FeedbackStyles.viewQuantity}>
                <Text style={[FeedbackStyles.textNameMenu, {marginRight: 5}]}>Số lượng:</Text>
                <Text style={FeedbackStyles.textNameMenu}>50</Text>
            </View>
            <View style={MyStyles.line}/>
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Chi tiết dịch vụ</Text>
            </View>

            {/* item service */}
            <View style={FeedbackStyles.viewService}>
                <Text style={FeedbackStyles.textNameService}>Dịch vụ quay phim cưới</Text>
                <Text style={FeedbackStyles.textPriceService}>1.000.000 VND</Text>
            </View>
            <View style={MyStyles.line}/>
            <View style={FeedbackStyles.viewTextDiscription}>
                <Text style={FeedbackStyles.textDiscription}>Đánh giá của khách hàng</Text>
            </View>
            <View style={FeedbackStyles.viewInputComment}>
                <TextInput style={FeedbackStyles.textInputComment} placeholder='Đánh giá chất lượng dịch vụ'/>
            </View>
            <TouchableOpacity style={FeedbackStyles.viewBtnComment}>
                <Text style={FeedbackStyles.textBtnComment}>Đánh giá</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}