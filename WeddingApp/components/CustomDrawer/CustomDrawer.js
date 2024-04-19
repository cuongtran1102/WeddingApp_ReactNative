import { Image, View, Text } from "react-native";
import DrawerStyles from "./DrawerStyles";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default CustomDrawer = props => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={DrawerStyles.container}>
                <Image source={{ uri: "https://thanhduong.pythonanywhere.com/static/courses/2022/04/Lighthouse.jpg" }} style={DrawerStyles.avatar} />
                <View style={DrawerStyles.userInfo}>
                    <Text style={DrawerStyles.userName}>Cuong Tran</Text>
                    <Text style={DrawerStyles.userEmail}>cuongtran@gmail.com</Text>
                </View>
            </View>
            <View>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}