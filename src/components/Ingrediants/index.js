import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import TextEle from '../TextEle';

const index = () => {
  const photos = [
    {
      id: 1,
      img: require('../../assets/images/cucumber.jpg'),
      text: 'Slices of cucumber',
      amount: '4-5 Pieces',
    },
    {
      id: 2,
      img: require('../../assets/images/honey.jpg'),
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
    <BottomSheetView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <TextEle style={{ fontSize: 23, fontWeight: 'bold' }}>Mango Mule</TextEle>
        <TextEle numberOfLines={2} style={{ color: 'gray' }}>
          Amazing combo of sweet and sour taste!Super easy to prepare.Enjoy!
        </TextEle>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <TextEle
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1,
            marginVertical: 5,
          }}>
          Ingrediants
        </TextEle>
      </View>
      <BottomSheetScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {photos.map(item => (
          <View key={item.id} style={{ flexDirection: 'row', marginVertical: 5, height: 100 }}>
            <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={item.img} />
            <View
              style={{
                flex: 1,
                paddingLeft: 15,
                justifyContent: 'center',
              }}>
              <TextEle style={{ fontWeight: 'bold', fontSize: 17 }}>{item.text}</TextEle>
              <TextEle style={{ color: 'gray' }}>{item.amount}</TextEle>
            </View>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheetView>
  );
};

export default index;
