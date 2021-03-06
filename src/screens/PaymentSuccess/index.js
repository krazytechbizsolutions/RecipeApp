import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import TextEle from '@components/TextEle';
import RAButton1 from '@components/RAButton1';

const PaymentSuccess = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <LottieView
      source={require('@assets/lottie/10470-confirm.json')}
      style={{ height: 300, width: 300 }}
      autoPlay
      loop={false}
    />
    <TextEle variant="header1">Payment Successful</TextEle>
    <RAButton1
      style={{ position: 'absolute', bottom: 10, width: '100%' }}
      variant="fill"
      text="Done"
      onPress={() => navigation.navigate('CourseDetailsBought')}
    />
  </View>
);

export default PaymentSuccess;
