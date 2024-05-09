import { ImageBackground, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import BookingDetailStyles from "./BookingDetailStyles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import MenuStyles from "./MenuStyles";
import Counter from "react-native-counters";
import API, { AuthAPI, Endpoints } from "../../configs/API";
import { SHIFT } from "../../configs/Enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNDateTimePicker from '@react-native-community/datetimepicker';

const data = [
    { label: 'Sáng', value: SHIFT['MORNING'] },
    { label: 'Chiều', value: SHIFT['AFTERNOON'] },
    { label: 'Tối', value: SHIFT['EVENING'] },
];

const renderMenuItem = item => {
    return (
        <View style={MenuStyles.item}>
            <Text style={MenuStyles.selectedTextStyle}>{item.name}</Text>
            <Text style={MenuStyles.selectedPriceStyle}>{item.unit_price}</Text>
            <Image source={{ uri: item.url }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} />
        </View>
    );
};

const renderServiceItem = item => {
    return (
        <View style={MenuStyles.item}>
            <Text style={MenuStyles.selectedTextStyle}>{item.name}</Text>
            <Text style={MenuStyles.selectedPriceStyle}>{item.unit_price}</Text>
            {/* <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} /> */}
        </View>
    );
};

export default BookingDetail = ({ route }) => {
    // Use State
    const [value, setValue] = useState(null);
    const [menuItems, setMenuItems] = useState(null)
    const [serviceItems, setServiceItems] = useState(null)
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [unitPrice, setUnitPrice] = useState(0)
    const [orderDate, setOrderDate] = useState(new Date('2024-12-10'))
    const [loading, setLoading] = useState(false)
    const { weddingHall } = route.params
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [counterValue, setCounterValue] = useState(1); //Số lượng Menu

    // function
    const handleCounterChange = (number) => {
        setCounterValue(number);
    };

    const handleDateChange = (event, newDate) => {
        if (newDate > new Date()) {
            setSelectedDate(newDate);
        }
        setShowDatePicker(false);
    };

    const fetchApiMenuDetail = async (quantity = 1) => {
        let menus = []

        for (let item of selectedMenu) {
            try {
                let { data } = await API.get(Endpoints['menu']['detail'](item))
                menus.push({
                    'id': data.id,
                    'unit_price': data.unit_price,
                    'quantity': quantity
                })
            } catch (ex) {
                console.log('Error Menu')
                console.log(ex)
                return []
            }
        }
        return menus
    }

    const fetchApiServiceDetail = async () => {
        let services = []

        for (let item of selectedService) {
            try {
                let { data } = await API.get(Endpoints['service']['detail'](item))
                services.push({
                    'id': data.id,
                    'unit_price': data.unit_price
                })
            } catch (ex) {
                console.log('Error service')
                console.log(ex)
                return []
            }
        }
        return services
    }


    const getUnitPrice = (shift) => {
        switch (shift) {
            case SHIFT['MORNING']:
                return weddingHall.price_morning
            case SHIFT['AFTERNOON']:
                return weddingHall.price_afternoon
            default:
                return weddingHall.price_evening
        }
    }


    const isWeekend = (date) => {
        return date.getDay() === 0
    }

    const submit = async () => {
        try {
            setLoading(true)
            let token = await AsyncStorage.getItem('token')

            let menuSelected = await fetchApiMenuDetail(counterValue)
            let serviceSelected = await fetchApiServiceDetail()

            let data = {
                "unit_price": getUnitPrice(value),
                "order_date": selectedDate.toISOString().split('T')[0],
                "wedding_hall_id": weddingHall.id,
                "shift_party": value,
                "is_weekend": isWeekend(orderDate),
                "services": serviceSelected,
                "menus": menuSelected
            }

            try {
                let res = await AuthAPI(token).post(Endpoints['party']['add'], data)
                Alert.alert('Đặt Tiệc Thành Công')
            } catch(ex) {
                console.log('Có lỗi xảy ra. Vui lòng thử lại')
                console.log(ex)
            }
            
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
        }
    }



    // use Effect
    useEffect(() => {
        const loadData = async () => {
            try {
                let res = await API.get(Endpoints['menu']['list'])
                setMenuItems(res.data.results)
                res = await API.get(Endpoints['service']['list'])
                setServiceItems(res.data.results)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadData()
    }, [])

    if (menuItems === null || serviceItems === null) return <ActivityIndicator />

    return (
        <ScrollView>
            <ImageBackground style={BookingDetailStyles.imageStyle} source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/cx2.jpeg' }}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={BookingDetailStyles.viewIcon}>
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
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={BookingDetailStyles.btnBooking}>
                        <Ionicons name="calendar-outline" size={20} color={'#000080'} />
                        <Text style={BookingDetailStyles.txtBooking}>{selectedDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <RNDateTimePicker
                            mode="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            isVisible={showDatePicker}
                            onDismiss={() => setShowDatePicker(false)}
                            minimumDate={new Date()}
                        />
                    )}
                    {/* Dropdown Item */}
                    <Dropdown
                        itemTextStyle={BookingDetailStyles.selectedTextStyle}
                        style={BookingDetailStyles.dropdown}
                        placeholderStyle={BookingDetailStyles.placeholderStyle}
                        selectedTextStyle={BookingDetailStyles.selectedTextStyle}
                        inputSearchStyle={BookingDetailStyles.inputSearchStyle}
                        iconStyle={BookingDetailStyles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000080' }}>Chọn Buổi</Text>}
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
                        data={menuItems}
                        labelField="name"
                        valueField="id"
                        placeholder={<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000080' }}> Chọn Món</Text>}
                        value={selectedMenu}
                        search
                        searchPlaceholder="Tìm..."
                        // maxSelect={10}
                        onChange={items => setSelectedMenu(items)}
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
                                    <Image source={{ uri: item.url }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} />
                                    <Text style={MenuStyles.textSelectedStyle}>{item.name}</Text>
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
                        onChange={handleCounterChange}
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
                        data={serviceItems}
                        labelField="name"
                        valueField="id"
                        placeholder={<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000080' }}> Chọn Dịch Vụ</Text>}
                        value={selectedService}
                        search
                        searchPlaceholder="Tìm..."
                        // maxSelect={7}
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
                                    {/* <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} /> */}
                                    <Text style={MenuStyles.textSelectedStyle}>{item.name}</Text>
                                    <AntDesign color="black" name="closecircle" size={17} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={BookingDetailStyles.line} />
                {
                    loading ? <ActivityIndicator /> :
                        <TouchableOpacity style={BookingDetailStyles.btnBookingParty} onPress={submit}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000080' }}>Đặt Tiệc</Text>
                        </TouchableOpacity>
                }
                <View style={BookingDetailStyles.line} />
                <Text style={BookingDetailStyles.txtConfirm}>Đánh Giá</Text>

                {/* Comments View */}
                <View>

                </View>
            </View>
        </ScrollView>
    );
}