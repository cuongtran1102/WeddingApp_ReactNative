import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Salad', value: '1', image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D' },
  { label: 'Mỳ Ý', value: '2', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574'},
  { label: 'Pizza', value: '3', image: 'https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill'},
];

const EditProfile = () => {
  const [selected, setSelected] = useState([]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <Image source={{uri:item.image}} style={{width: 40, height: 40, borderRadius: 15, marginRight: 5}}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Chọn món"
        value={selected}
        search
        searchPlaceholder="Tìm..."
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="shoppingcart"
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Image source={{uri:item.image}} style={{width: 40, height: 40, borderRadius: 15, marginRight: 5}}/>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color="black" name="closecircle" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    marginTop: 150,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});