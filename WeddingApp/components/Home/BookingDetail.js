
import {ToastAndroid, ImageBackground, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert, LogBox, KeyboardAvoidingView, NativeModules, NativeEventEmitter, Linking } from "react-native";
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
import { formattedNumber } from "../../configs/Utils";
import CryptoJS from 'crypto-js';

const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const subscription = payZaloBridgeEmitter.addListener(
  'EventPayZalo',
  (data) => {
    if (data.returnCode == 1) {
      Alert.alert('Pay Success')
    } else {
      Alert.alert('pay error')
    }
  }
);

const data = [
    { label: 'Sáng', value: SHIFT['MORNING'] },
    { label: 'Chiều', value: SHIFT['AFTERNOON'] },
    { label: 'Tối', value: SHIFT['EVENING'] },
];

const renderMenuItem = item => {
    return (
        <View style={MenuStyles.item}>
            <Text style={MenuStyles.selectedTextStyle}>{item.name}</Text>
            <Text style={MenuStyles.selectedPriceStyle}>{formattedNumber(item.unit_price)} VND</Text>
            <Image source={{ uri: item.url }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 5 }} />
        </View>
    );
};

const renderServiceItem = item => {
    return (
        <View style={MenuStyles.item}>
            <Text style={MenuStyles.selectedTextStyle}>{item.name}</Text>
            <Text style={MenuStyles.selectedPriceStyle}>{formattedNumber(item.unit_price)} VND</Text>
        </View>
    );
};

export default BookingDetail = ({ route, navigation }) => {
    LogBox.ignoreAllLogs()

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
    const [feedbacks, setFeedbacks] = useState(null)
    const [loadingTotal, setLoadingTotal] = useState(null)
    const [loadingOrder, setLoadingOrder] = useState(false)
    const [isPushBtn, setIsPushBtn] = useState(false)
    const [token, setToken] = useState('')
    const [returncode, setReturnCode] = useState('')
    const [order, setOrder] = useState(null)
    const [url, setUrl] = useState('test')
    const [responseJson, setResponseJson] = useState(null)
    const [mac, setMac] = useState(null)


    function getCurrentDateYYMMDD() {
        var todayDate = new Date().toISOString().slice(2, 10);
        return todayDate.split('-').join('');
      }


    async function createOrder() {
        setLoadingOrder(true)
        let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime()

        let appid = 2553
        let amount = parseInt(unitPrice.replace(/\./g, ''))
        let appuser = "0858038081"
        let apptime = (new Date).getTime()
        let embeddata = "{}"
        let item = "[]"
        let description = "Thanh toán đơn hàng đặt tiệc #" + apptransid
        let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item
        let mac = CryptoJS.HmacSHA256(hmacInput, "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL")
        var order = {
            'app_id': appid,
            'app_user': appuser,
            'app_time': apptime,
            'amount': amount,
            'app_trans_id': apptransid,
            'embed_data': embeddata,
            'item': item,
            'description': description,
            'mac': mac

        }

        setMac(order['mac'])

        let formBody = []
        for (let i in order) {
            var encodedKey = encodeURIComponent(i);
            var encodedValue = encodeURIComponent(order[i]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        setOrder(order)
        console.log(formBody)
        await fetch('https://sb-openapi.zalopay.vn/v2/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(response => response.json())
            .then(res => {
                setToken(res.zp_trans_token)
                setReturnCode(res.return_code)
                setResponseJson(res)
            })
            .catch((error) => {
                console.log("error ", error)
            })
        setLoadingOrder(false)
    }

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
            case SHIFT['AFTERNOON']:
                return weddingHall.price_afternoon
            case SHIFT['EVENING']:
                return weddingHall.price_evening
            default:
                return weddingHall.price_morning
        }
    }

    const getTotal = async () => {
        setLoadingTotal(true)
        setIsPushBtn(false)
        if (value === null) {
            ToastAndroid.showWithGravity(
                'Hãy chọn buổi tổ chức tiệc',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            setLoadingTotal(false);
            return;
        }
        let menuSelected = await fetchApiMenuDetail(counterValue)
        let serviceSelected = await fetchApiServiceDetail()
        let totalMenu = menuSelected.reduce((total, current) => total + parseFloat(current.unit_price) * counterValue, 0)
        let totalService = serviceSelected.reduce((total, current) => total + parseFloat(current.unit_price), 0)
        setUnitPrice(formattedNumber(totalMenu + totalService + parseFloat(getUnitPrice(value))))
        setLoadingTotal(false)
        setIsPushBtn(true)
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
                console.log(value)
                let res = await AuthAPI(token).post(Endpoints['party']['add'], data)
                console.log('Đặt tiệc thành công')
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
            setSelectedMenu([])
            setSelectedService([])
            setUnitPrice(0)
            setCounterValue(1) 
            setIsPushBtn(false)
        }

        const loadFeedbacks = async () => {
            try {
                let token = await AsyncStorage.getItem('token')
                let { data } = await AuthAPI(token).get(`${Endpoints['feedback']['hall']}?hall=${weddingHall.id}`)
                setFeedbacks(data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadData()
        loadFeedbacks()

        if (returncode === 1) {
            submit()
            Alert.alert('Thông báo', 'Đặt tiệc thành công vui lòng thanh toán cho zalopay')
            
            setReturnCode(null)
        }

        console.log('button party, ', isPushBtn)
    }, [weddingHall, returncode])

    useEffect(() => {
        if (responseJson !== null) {
            Linking.openURL(responseJson.order_url)
        }
    }, [responseJson])

    if (menuItems === null || serviceItems === null) return <ActivityIndicator />

    return (
        <ScrollView>
            <ImageBackground style={BookingDetailStyles.imageStyle} source={{ uri: weddingHall.img }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={BookingDetailStyles.viewIcon}>
                    <Ionicons name="chevron-back-outline" size={24} color={'white'} />
                </TouchableOpacity>
                <View style={BookingDetailStyles.viewDiscription}>
                    <Text style={BookingDetailStyles.textTitle}>{weddingHall.name}</Text>
                    <Text style={BookingDetailStyles.textDiscription}>{weddingHall.description_text}</Text>
                    <Text style={BookingDetailStyles.textPrice}>{
                        value === 'MORNING' || value === null ? formattedNumber(weddingHall.price_morning) :
                            (value === 'AFTERNOON' ? formattedNumber(weddingHall.price_afternoon) : formattedNumber(weddingHall.price_evening))
                    } VND</Text>
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
                                    <Text style={MenuStyles.textSelectedStyle}>{item.name}</Text>
                                    <AntDesign color="black" name="closecircle" size={17} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={BookingDetailStyles.line} />
                <View style={BookingDetailStyles.viewTotal}>
                    <TouchableOpacity style={BookingDetailStyles.buttonTotal} onPress={() => {
                        getTotal()
                    }}>
                        {
                            loadingTotal ? <ActivityIndicator /> :
                                <View style={BookingDetailStyles.contentTotal}>
                                    <Ionicons name="eye-outline" size={22} color={'white'} />
                                    <Text style={BookingDetailStyles.textContentTotal}>Xem tổng tiền</Text>
                                </View>
                        }
                    </TouchableOpacity>
                    <Text style={BookingDetailStyles.textTotal}>{unitPrice} VND</Text>
                </View>
                <View style={BookingDetailStyles.line} />
                {
                        loadingOrder ? <ActivityIndicator /> :
                            isPushBtn && <TouchableOpacity style={BookingDetailStyles.btnBookingParty} onPress={createOrder}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Đặt Tiệc</Text>
                        </TouchableOpacity>
                    
                }
                <View style={BookingDetailStyles.line} />
                <Text style={BookingDetailStyles.txtConfirm}>Đánh Giá</Text>

                {/* Comments View */}
                {
                    feedbacks === null ? <ActivityIndicator /> :

                        feedbacks.map(item => (
                            <View style={BookingDetailStyles.viewComment}>
                                <View style={BookingDetailStyles.viewInforUser}>
                                    <Image source={{ uri: item.user.avatar }}
                                        style={BookingDetailStyles.avatarUser} />
                                    <Text style={BookingDetailStyles.textNameUser}>{item.user.first_name} {item.user.last_name}</Text>
                                </View>
                                <Text style={BookingDetailStyles.textComment}>{item.content}</Text>
                            </View>
                        ))
                }
            </View>
        </ScrollView>
    );
}