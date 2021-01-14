import React from 'react';
import PropTypes from 'prop-types';
import { GoogleSignin } from '@react-native-community/google-signin';
import Config from 'react-native-config';
import { View } from 'react-native';
import Form from '@components/Form';
import axios from '@utils/axios';
import RAText from '@components/RAText';
import { useHeaderHeight } from '@react-navigation/stack';
import RAButton1 from '@components/RAButton1';
import { setToken, showErrorToast } from '@utils/index';
import { initialValues, resetForm, formRef } from './fields';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

const ResetPassword = ({ navigation, route }) => {
  const headerHight = useHeaderHeight();
  const { code } = route.params;

  const onSubmit = async values => {
    try {
      const user = await axios.post('auth/reset-password', { ...values, code });
      await setToken(user.data);
      navigation.replace('Home');
    } catch (error) {
      console.log(error);
      showErrorToast(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: headerHight,
          marginBottom: 20,
          marginHorizontal: 20,
        }}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <RAText variant="h1" style={{ marginBottom: 8 }}>
              Reset Password
            </RAText>
            <RAText variant="p2">Please enter your password here</RAText>
          </View>
          <Form
            ref={formRef}
            initialValues={{ ...initialValues, code }}
            fields={resetForm}
            onSubmit={onSubmit}
          />
          <RAButton1
            style={{ marginTop: 24 }}
            variant="fill"
            text="Login"
            onPress={() => formRef.current?.handleSubmit()}
          />
        </View>
      </View>
    </View>
  );
};

ResetPassword.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default ResetPassword;
