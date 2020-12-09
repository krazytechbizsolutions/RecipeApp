import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Category from '../../components/Category';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Popular from '../../components/Popular';

const TabHome = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, paddingTop: insets.top }}
      contentContainerStyle={{ paddingBottom: 20 }}>
      <Header />
      <Category />
      <Popular
        onRecipePress={() => {
          navigation.navigate('RecipeDetail');
        }}
      />
      <Footer />
    </ScrollView>
  );
};

TabHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabHome;
