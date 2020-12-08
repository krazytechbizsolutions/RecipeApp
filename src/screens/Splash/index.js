import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Timer from '../../assets/icons/timer-black.svg';

const index = () => {
  const photos = [
    {
      id: 1,
      img: require('../../assets/images/cucumber-slices.jpg'),
      text: 'Slices of cucumber',
      amount: '4-5 Pieces',
    },
    {
      id: 2,
      img: require('../../assets/images/honey-syrup.jpg'),
      text: 'Honey Syrup',
      amount: '2 Spoon',
    },
    {
      id: 3,
      img: require('../../assets/images/Main-Rectangle-1.jpg'),
      text: 'Mango puree',
      amount: '1 Bowl',
    },
    {
      id: 4,
      img: require('../../assets/images/Lemon.jpg'),
      text: 'Lemon Juice',
      amount: '200ml',
    },
    {
      id: 5,
      img: require('../../assets/images/Orange.jpg'),
      text: 'Orange Pulp',
      amount: '200ml',
    },
    {
      id: 6,
      img: require('../../assets/images/Dragon.jpg'),
      text: 'Dragon',
      amount: '200ml',
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Mango Mule</Text>
        <Text numberOfLines={2} style={{ color: 'gray' }}>
          Amazing combo of sweet and sour taste!Super easy to prepare.Enjoy!
        </Text>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            flex: 1,
            marginVertical: 5,
          }}>
          Ingredients
        </Text>
        <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Timer height={24} width={24} />
          <Text style={{ marginLeft: 8, fontSize: 17 }}>35`</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {photos.map(item => (
          <View key={item.id} style={{ flexDirection: 'row', marginVertical: 5, height: 100 }}>
            <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={item.img} />
            <View
              style={{
                flex: 1,
                paddingLeft: 15,
                justifyContent: 'center',
              }}>
              <Text style={{ fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: 17 }}>
                {item.text}
              </Text>
              <Text style={{ color: 'gray' }}>{item.amount}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default index;
