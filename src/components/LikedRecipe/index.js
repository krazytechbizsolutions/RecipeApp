/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Image from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import useSWR from 'swr';
import { UserContext } from '@context/userContext';
import Loading from '@components/loading';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import TextEle from '../TextEle';

const LikedRecipe = ({ onRecipeDetail }) => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery({
      pageIndex: 0,
      limit: 5,
      sort: 'updated_at:DESC',
      where: `{like_event:{user:${user?.id}}}`,
      userId: user?.id,
    }),
  ]);
  if (!data) {
    return <Loading />;
  }
  // useFocusEffect(
  //   useCallback(() => {
  //     mutate();
  //   }, [mutate]),
  // );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {data?.courses.map(item => (
          <View
            key={item.id}
            style={{ flex: 1, flexDirection: 'row', marginVertical: 5, height: 100 }}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 20 }}
              source={{ uri: item?.image?.url }}
            />
            <RectButton
              rippleColor="#D3D3D3"
              style={{ flex: 1 }}
              onPress={() => onRecipeDetail(item)}>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 15,
                  justifyContent: 'center',
                }}>
                <TextEle style={{ fontWeight: 'bold', fontSize: 17 }}>{item.name}</TextEle>
                <TextEle style={{ color: 'gray' }}>{item.caption}</TextEle>
              </View>
            </RectButton>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

LikedRecipe.propTypes = {
  onRecipeDetail: PropTypes.func.isRequired,
};

export default LikedRecipe;
