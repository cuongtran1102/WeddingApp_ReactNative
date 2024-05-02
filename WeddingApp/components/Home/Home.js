// <<<<<<< quoc
import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Avatar, Card, Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import API, { Endpoints } from "../../configs/API";

const leftContent = props => <Avatar.Icon {...props} icon={'camera'} />

export default Home = () => {
    const [halls, setHalls] = useState(null)



    // useEffect
    useEffect(() => {
        const loadWeddingHall = async() => {
            let {data} = await API.get(Endpoints['wedding-hall']['list'])
            setHalls(data)
        }

        loadWeddingHall()
    }, [])


    if (halls === null) return <ActivityIndicator />

// =======
// import { RefreshControl, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
// import MyStyles from "../../styles/MyStyles";
// import { Avatar, Card, Text, Button } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons";
// import { useCallback, useState } from "react";

// export default Home = () => {
//     const [refreshing, setRefreshing] = useState(false);
//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         setTimeout(() => {
//             setRefreshing(false)
//         }, 2000);
//     }, []);
// >>>>>>> main

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
            <View>
                <View style={MyStyles.viewInput}>
                    <Ionicons name="search-outline" size={24} color='#1e90ff' style={{ marginRight: 10 }} />
                    <TextInput placeholder="Tra cứu..." style={MyStyles.searchInput}></TextInput>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        borderBottomColor: '#2f4f4f',
                        borderBottomWidth: 1,
                        marginHorizontal: 10
                    }}
                />
                {halls.map(item => (

                
                <Card style={MyStyles.cardStyle} key={item.id}>
                    <Card.Cover style={MyStyles.cardImage} source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/hoa.jpeg' }} />
                    <Card.Content style={MyStyles.cardContent}>
                        <Text variant="titleLarge" style={MyStyles.cardTitle}>{item.name}</Text>
                        <Text variant="bodyMedium" style={MyStyles.cardDiscription}>Một trong những sảnh
                            tiệc sang trong bậc nhất với sức chứa lên đến 50 bàn</Text>
                    </Card.Content>
                    <Card.Actions>
                        <TouchableOpacity>
                            <Button style={MyStyles.btnBookingStyle}>Đặt Sảnh</Button>
                        </TouchableOpacity>
                    </Card.Actions>
                </Card>
                ))}
                {/* <Card style={MyStyles.cardStyle}>
                    <Card.Cover style={MyStyles.cardImage} source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/cx2.jpeg' }} />
                    <Card.Content style={MyStyles.cardContent}>
                        <Text variant="titleLarge" style={MyStyles.cardTitle}>Flower Garden</Text>
                        <Text variant="bodyMedium" style={MyStyles.cardDiscription}>Vườn hoa với hoa đào chủ đạo
                            mang lại cảm giác ấm áp hài hòa</Text>
                    </Card.Content>
                    <Card.Actions>
                        <TouchableOpacity>
                            <Button style={MyStyles.btnBookingStyle}>Đặt Sảnh</Button>
                        </TouchableOpacity>
                    </Card.Actions>
                </Card>
                <Card style={MyStyles.cardStyle}>
                    <Card.Cover style={MyStyles.cardImage} source={{ uri: 'https://callabridal.com.vn/wp-content/uploads/2023/05/cx2.jpeg' }} />
                    <Card.Content style={MyStyles.cardContent}>
                        <Text variant="titleLarge" style={MyStyles.cardTitle}>Flower Garden</Text>
                        <Text variant="bodyMedium" style={MyStyles.cardDiscription}>Vườn hoa với hoa đào chủ đạo
                            mang lại cảm giác ấm áp hài hòa</Text>
                    </Card.Content>
                    <Card.Actions>
                        <TouchableOpacity>
                            <Button style={MyStyles.btnBookingStyle}>Đặt Sảnh</Button>
                        </TouchableOpacity>
                    </Card.Actions>
                </Card> */}
            </View>
        </ScrollView>
    );
}