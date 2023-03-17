import React, { useState, useEffect, useCallback } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { RegistrationScreen } from './Screens/RegistrationScreen';

const initialState = {
  login: '',
  email: '',
  password: '',
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [appIsReady, setAppIsReady] = useState(false);
  const [dimension, setDimension] = useState(Dimensions.get('window').width - 16 * 2);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 16 * 2;
      // console.log('width', width);
      setDimension(width);
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.addEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Попередньо завантажте шрифти, зробіть необхідні виклики API тут
        await Font.loadAsync({
          'Roboto-400': require('./assets/Roboto-Regular.ttf'),
          'Roboto-500': require('./assets/Roboto-Medium.ttf'),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Скажіть програмі відрендерити
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      //Це наказує негайно сховати заставку! Якщо ми викличемо цю команду після `setAppIsReady`, ми можемо побачити порожній екран, поки програма завантажує свій початковий стан і рендерить свої перші пікселі. Натомість ми ховаємо заставку, коли знаємо, що кореневе подання вже виконало компонування.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <RegistrationScreen />
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground style={styles.image} source={require('./assets/photo-bg.jpg')}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.title}>Регистрация</Text>
            <View
              style={{ ...styles.form, marginBottom: isShowKeyboard ? 40 : 0, width: dimension }}
            >
              <TextInput
                style={styles.input}
                textAlign={'left'}
                placeholder={'Логин'}
                placeholderTextColor={'#BDBDBD'}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={state.login}
                onChangeText={value => setState(prevState => ({ ...prevState, login: value }))}
              />

              <TextInput
                style={styles.input}
                textAlign={'left'}
                placeholder={'Адрес электронной почты'}
                placeholderTextColor={'#BDBDBD'}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={state.email}
                onChangeText={value => setState(prevState => ({ ...prevState, email: value }))}
              />

              <TextInput
                style={styles.input}
                textAlign={'left'}
                placeholder={'Пароль'}
                placeholderTextColor={'#BDBDBD'}
                // secureTextEntry={true}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={state.password}
                onChangeText={value => setState(prevState => ({ ...prevState, password: value }))}
              />

              <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={keyboardHide}>
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.enterBtn} onPress={keyboardHide}>
                <Text style={styles.enterBtn}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-500',
    fontSize: 30,
    fontWeight: 500,
    color: '#212121',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    fontFamily: 'Roboto-400',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    borderRadius: 8,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 18,
  },

  form: {
    // marginHorizontal: 16,
  },
  btn: {
    height: 50,
    borderRadius: 100,
    // backgroundColor: Platform.OS === 'ios' ? '#ccc' : '#FF6C00',
    backgroundColor: '#FF6C00',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontFamily: 'Roboto-400',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  enterBtn: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-500',
    fontSize: 16,
    color: '#0000ff',
  },
});
