/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { SWRConfig } from 'swr';
import { enableScreens } from 'react-native-screens';
import ErrorScreen from '@screens/Error';
import { useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import MasterNavigation from '@navigation/MasterNavigation';
import { RADarkTheme, RALightTheme } from '@theme/index';
import fetcher from '@utils/fetcher';
// import YoutubeVideo from '@screens/YoutubeVideo';
import UserProvider from '@context/userContext';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FOODCOUTURE_TOKEN } from '@constants/';
import { isIOS } from './src/utils';
import YoutubeFilter from './src/screens/YoutubeFilter';

// import Login from './src/screens/Login/index';

enableScreens();

const RootStack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  const routeNameRef = useRef();
  const navigationRef = useRef();

  const currentTheme = scheme === 'dark' ? RADarkTheme : RALightTheme;
  const [isInternetAvailable, setIsInternetAvailable] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const value = await AsyncStorage.getItem(FOODCOUTURE_TOKEN);
      if (value === null) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    };

    checkAuth();
    SplashScreen.hide();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetAvailable(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isInternetAvailable) {
    return <ErrorScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={currentTheme.colors.card}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <SWRConfig
        value={{
          fetcher,
          errorRetryCount: 3,
        }}>
        <UserProvider>
          <KeyboardAvoidingView
            {...(isIOS && { behavior: 'padding' })}
            style={{ flex: 1 }}
            enabled={isIOS}>
            <NavigationContainer
              ref={navigationRef}
              theme={currentTheme}
              onReady={() => {
                routeNameRef.current = navigationRef.current.getCurrentRoute().name;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                  // Change this line to use another Mobile analytics SDK
                  await analytics().logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                  });
                }

                // Save the current route name for later comparision
                routeNameRef.current = currentRouteName;
              }}>
              <RootStack.Navigator initialRouteName="Main" mode="modal" headerMode="none">
                <RootStack.Screen
                  name="Main"
                  component={MasterNavigation}
                  options={{
                    headerShown: true,
                    headerTransparent: 1,
                    headerTintColor: currentTheme.colors.primary,
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                  }}
                  initialParams={{ isAuth }}
                />
                <RootStack.Screen
                  name="PaymentSuccess"
                  getComponent={() => require('@screens/PaymentSuccess').default}
                  options={{
                    headerShown: true,
                    headerTransparent: true,
                  }}
                />
                <RootStack.Screen
                  name="PaymentUnsuccessfull"
                  getComponent={() => require('@screens/PaymentUnsuccessfull').default}
                  options={{
                    headerShown: true,
                    headerTransparent: true,
                  }}
                />
                <RootStack.Screen name="YoutubeFilter" component={YoutubeFilter} />
                {/* <RootStack.Screen
                  name="YoutubeVideo"
                  component={YoutubeVideo}
                  options={{ headerShown: true, headerTransparent: true }}
                /> */}
              </RootStack.Navigator>
            </NavigationContainer>
          </KeyboardAvoidingView>
        </UserProvider>
      </SWRConfig>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

export default App;
