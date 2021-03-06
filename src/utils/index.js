import { FOODCOUTURE_TOKEN, NUMBER_OF_DIVECE_ALLOWED } from '@constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import analytics from '@react-native-firebase/analytics';
import {
  getUniqueId,
  getManufacturer,
  getCarrier,
  getDeviceId,
  getDeviceType,
  getBuildId,
  getVersion,
  getSystemVersion,
  getBuildNumber,
  getSystemName,
} from 'react-native-device-info';
import axios from '@utils/axios';

export const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';

export const setToken = data =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    AsyncStorage.setItem(FOODCOUTURE_TOKEN, JSON.stringify(data))
      .then(val => resolve(val))
      .catch(err => reject(err));
  });

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(FOODCOUTURE_TOKEN);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const showErrorToast = error => {
  Toast.show({
    text1: 'Error',
    text2: `${error.message}`,
    type: 'error',
  });
};

export const showSuccessToast = message => {
  Toast.show({
    text1: 'Success',
    text2: message,
    type: 'success',
  });
};

export const getDeviceInfo = async () => {
  const data = await Promise.all([
    getSystemName(),
    getSystemVersion(),
    getManufacturer(),
    getDeviceId(),
    getDeviceType(),
    getVersion(),
    getCarrier(),
    getBuildId(),
    getUniqueId(),
    getBuildNumber(),
  ]);
  return {
    OSName: data[0],
    OSVersion: data[1].data,
    manufacturer: data[2],
    deviceId: data[3],
    deviceType: data[4],
    appVersion: data[5],
    carrier: data[6],
    buildId: data[7],
    uniqueId: data[8],
    buildNumber: data[9],
  };
};
