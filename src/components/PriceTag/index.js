import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';
import TextEle from '../TextEle';
import Pie from '../../assets/images/Pie.jpg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const PriceTag = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '100%'], []);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Image
        style={{
          height: windowHeight * 0.5,
          width: windowWidth,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        source={Pie}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={insets.top}>
        <BottomSheetView style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
          <BottomSheetScrollView
            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <TextEle>Buy Stuff here</TextEle>
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>

      <RectButton
        style={{
          marginHorizontal: 40,
          marginVertical: 50,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FD6D3B',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextEle style={{ color: 'white', paddingLeft: 10 }}>Buy for Rs.249</TextEle>
      </RectButton>
    </View>
  );
};

export default PriceTag;