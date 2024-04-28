import { Image, View, Text } from "react-native";
import DrawerStyles from "./DrawerStyles";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default CustomDrawer = props => {
    const [currentUser, dispatch] = useContext(UserContext)

    return (
        <DrawerContentScrollView {...props}>
            {currentUser !== null && <View style={DrawerStyles.container}>
                <Image source={{ uri: "https://thanhduong.pythonanywhere.com/static/courses/2022/04/Lighthouse.jpg" }} style={DrawerStyles.avatar} />
                <View style={DrawerStyles.userInfo}>
                    <Text style={DrawerStyles.userName}>{currentUser.first_name} {currentUser.last_name}</Text>
                    <Text style={DrawerStyles.userEmail}>{currentUser.email}</Text>
                </View>
            </View>}
            <View>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}