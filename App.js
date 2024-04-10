import 'react-native-gesture-handler';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import MainAppNavigation from './src/navigation/MainAppNavigation';
import { colors } from './src/utils/Theme';
import { store } from './src/redux/store';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';

export default function App() {

  let persister = persistStore(store)



  const [loaded] = useFonts({
    'HelveticaNeueBlack': require('./src/assets/fonts/HelveticaNeueBlack.otf'),
    'HelveticaNeueBlackItalic': require('./src/assets/fonts/HelveticaNeueBlackItalic.otf'),
    'HelveticaNeueBold': require('./src/assets/fonts/HelveticaNeueBold.otf'),
    'HelveticaNeueBoldItalic': require('./src/assets/fonts/HelveticaNeueBoldItalic.otf'),
    'HelveticaNeueHeavy': require('./src/assets/fonts/HelveticaNeueHeavy.otf'),
    'HelveticaNeueHeavyItalic': require('./src/assets/fonts/HelveticaNeueHeavyItalic.otf'),
    'HelveticaNeueItalic': require('./src/assets/fonts/HelveticaNeueItalic.ttf'),
    'HelveticaNeueLight': require('./src/assets/fonts/HelveticaNeueLight.otf'),
    'HelveticaNeueLightItalic': require('./src/assets/fonts/HelveticaNeueLightItalic.otf'),
    'HelveticaNeueMedium': require('./src/assets/fonts/HelveticaNeueMedium.otf'),
    'HelveticaNeueMediumItalic': require('./src/assets/fonts/HelveticaNeueMediumItalic.otf'),
    'HelveticaNeueRoman': require('./src/assets/fonts/HelveticaNeueRoman.otf'),
    'HelveticaNeueThin': require('./src/assets/fonts/HelveticaNeueThin.otf'),
    'HelveticaNeueThinItalic': require('./src/assets/fonts/HelveticaNeueThinItalic.otf'),
    'HelveticaNeueUltraLight': require('./src/assets/fonts/HelveticaNeueUltraLight.otf'),
    'HelveticaNeueUltraLightItalic': require('./src/assets/fonts/HelveticaNeueUltraLightItalic.otf'),
  })




  async function setNavigationBarColor() {
    NavigationBar.setBackgroundColorAsync(colors.header);
    NavigationBar.setButtonStyleAsync("light");
  }

  useEffect(() => {
    setNavigationBarColor()
  }, [])



  if (!loaded) {
    return null;
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.header} barStyle="light-content" />
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <PaperProvider>
              <NavigationContainer>
                <MainAppNavigation />
              </NavigationContainer>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});