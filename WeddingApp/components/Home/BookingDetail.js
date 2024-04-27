import { ImageBackground, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import BookingDetailStyles from "./BookingDetailStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import MenuStyles from "./MenuStyles";
import Counter from "react-native-counters";

const data = [
    { label: 'Sáng', value: '1' },
    { label: 'Chiều', value: '2' },
    { label: 'Tối', value: '3' },
];

const menuData = [
    {
        label: 'Salad', value: '1', price: '130000',
        image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D'
    },
    {
        label: 'Mỳ Ý', value: '2', price: '215000',
        image: 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574'
    },
    {
        label: 'Pizza', value: '3', price: '150000',
        image: 'https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill'
    },
];
const serviceData = [
    {
        label: 'Chụp Ảnh Cưới', value: '1', price: '3150000',
        image: 'https://forevermark.vn/wp-content/uploads/2023/06/ly-do-nen-su-dung-dich-vu-cuoi-hoi-tron-goi.jpg'
    },
    {
        label: 'Trang Phục Cưới', value: '2', price: '4500000',
        image: 'https://forevermark.vn/wp-content/uploads/2023/06/cho-thue-trang-phuc-dam-hoi.jpg'
    },
];

const renderMenuItem = item => {
    return (
        <View style={MenuStyles.item}>
            <Text style={MenuStyles.selectedTextStyle}>{item.label}</Text>
            <Text style={MenuStyles.selectedPriceStyle}>{item.price}</Text>
            <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} />
        </View>
    );
};

const renderServiceItem = item => {
    return (
        <View style={MenuStyles.item}>
            <Text style={MenuStyles.selectedTextStyle}>{item.label}</Text>
            <Text style={MenuStyles.selectedPriceStyle}>{item.price}</Text>
            <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} />
        </View>
    );
};

export default BookingDetail = () => {
    const [value, setValue] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [selectedService, setSelectedService] = useState([]);

    return (
        <ScrollView>
            <ImageBackground style={BookingDetailStyles.imageStyle} source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/cx2.jpeg' }}>
                <TouchableOpacity style={BookingDetailStyles.viewIcon}>
                    <Ionicons name="chevron-back-outline" size={24} color={'white'} />
                </TouchableOpacity>
                <View style={BookingDetailStyles.viewDiscription}>
                    <Text style={BookingDetailStyles.textTitle}>Flower Garden</Text>
                    <Text style={BookingDetailStyles.textDiscription}>Vườn hoa với hoa đào chủ đạo
                        mang lại cảm giác ấm áp hài hòa phù hợp với những tâm hồn hòa quyện thiên nhiên</Text>
                    <Text style={BookingDetailStyles.textPrice}>5.500.000 VND</Text>
                </View>
            </ImageBackground>
            <View style={BookingDetailStyles.line} />
            <View style={{ marginTop: 10 }}>
                <View style={BookingDetailStyles.viewBooking}>
                    <TouchableOpacity style={BookingDetailStyles.btnBooking}>
                        <Ionicons name="calendar-outline" size={20} color={'#000080'} />
                        <Text style={BookingDetailStyles.txtBooking}>Chọn Ngày</Text>
                    </TouchableOpacity>
                    {/* Dropdown Item */}
                    <Dropdown
                        itemTextStyle={BookingDetailStyles.selectedTextStyle}
                        style={BookingDetailStyles.dropdown}
                        placeholderStyle={BookingDetailStyles.placeholderStyle}
                        selectedTextStyle={BookingDetailStyles.selectedTextStyle}
                        inputSearchStyle={BookingDetailStyles.inputSearchStyle}
                        iconStyle={BookingDetailStyles.iconStyle}
                        data={data}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000080' }}>Chọn Buổi</Text>}
                        // searchPlaceholder="Tìm..."
                        value={value}
                        onChange={item => {
                            setValue(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={BookingDetailStyles.icon} color="#000080" name="clockcircleo" size={20} />
                        )}

                    />
                </View>
                <View style={BookingDetailStyles.line} />

                {/* Dropdown Menu Item */}
                <View>
                    <MultiSelect
                        activeColor="#ffe4b5"
                        style={MenuStyles.dropdown}
                        placeholderStyle={MenuStyles.placeholderStyle}
                        selectedTextStyle={MenuStyles.selectedTextStyle}
                        inputSearchStyle={MenuStyles.inputSearchStyle}
                        iconStyle={MenuStyles.iconStyle}
                        data={menuData}
                        labelField="label"
                        valueField="value"
                        placeholder={<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000080' }}> Chọn Món</Text>}
                        value={selectedMenu}
                        search
                        searchPlaceholder="Tìm..."
                        maxSelect={7}
                        onChange={item => {
                            setSelectedMenu(item);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={MenuStyles.icon}
                                color="#000080"
                                name="shoppingcart"
                                size={24}
                            />
                        )}
                        renderItem={renderMenuItem}
                        renderSelectedItem={(item, unSelect) => (
                            <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => unSelect && unSelect(item)}>
                                <View style={MenuStyles.selectedStyle}>
                                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} />
                                    <Text style={MenuStyles.textSelectedStyle}>{item.label}</Text>
                                    <AntDesign color="black" name="closecircle" size={17} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ marginRight: 10, fontSize: 12, fontWeight: 'bold', color: '#000080' }}>Số Lượng:</Text>
                    <Counter
                        buttonStyle={{
                            borderColor: '#333',
                            borderWidth: 2,
                            width: 15,
                            height: 15,
                        }}
                        buttonTextStyle={{
                            color: '#333',
                            fontSize: 12
                        }}
                        countTextStyle={{
                            color: '#333',
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#000080'
                        }}
                        start={1}
                        min={1}
                        max={25}
                    />
                </View>
                <View style={BookingDetailStyles.line} />

                {/* Dropdown Service Item */}
                <View>
                    <MultiSelect
                        activeColor="#ffe4b5"
                        style={MenuStyles.dropdown}
                        placeholderStyle={MenuStyles.placeholderStyle}
                        selectedTextStyle={MenuStyles.selectedTextStyle}
                        inputSearchStyle={MenuStyles.inputSearchStyle}
                        iconStyle={MenuStyles.iconStyle}
                        data={serviceData}
                        labelField="label"
                        valueField="value"
                        placeholder={<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000080' }}> Chọn Dịch Vụ</Text>}
                        value={selectedService}
                        search
                        searchPlaceholder="Tìm..."
                        maxSelect={7}
                        onChange={item => {
                            setSelectedService(item);
                        }}
                        renderLeftIcon={() => (
                            <Ionicons
                                style={MenuStyles.icon}
                                color="#000080"
                                name="add-circle-outline"
                                size={24}
                            />
                        )}
                        renderItem={renderServiceItem}
                        renderSelectedItem={(item, unSelect) => (
                            <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => unSelect && unSelect(item)}>
                                <View style={MenuStyles.selectedStyle}>
                                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} />
                                    <Text style={MenuStyles.textSelectedStyle}>{item.label}</Text>
                                    <AntDesign color="black" name="closecircle" size={17} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={BookingDetailStyles.line} />
                <TouchableOpacity style={BookingDetailStyles.btnBookingParty}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000080' }}>Đặt Tiệc</Text>
                </TouchableOpacity>
                <View style={BookingDetailStyles.line} />
                <Text style={BookingDetailStyles.txtConfirm}>Đánh Giá</Text>

                {/* Comments View */}
                <View>

                </View>
            </View>
        </ScrollView>
    );
}