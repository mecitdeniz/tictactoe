import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  AdMobBanner,
} from 'expo-ads-admob';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import Constants from 'expo-constants';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import { ScreenOrientation } from 'expo';
import THEMES from '../assets/themes.json';
import { AsyncStorage } from 'react-native';
export default class wellcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'en',
      player1: null,
      player2: null,
    };
  }
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    this.changeScreenOrientation();
    this.retrieveData();
    //this.resetData();
  }
  resetData = async () => {
    await AsyncStorage.removeItem('themes');
  };
  initializeData = async () => {
    try {
      await AsyncStorage.setItem('theme', '0');
      const themes = JSON.stringify(THEMES);
      await AsyncStorage.setItem('themes', themes);
    } catch (error) {
      alert(error);
    }
  };
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      const valueThemes = await AsyncStorage.getItem('themes');
      const themes = JSON.parse(valueThemes);
      let country = (i18n.locale = Localization.locale.split('-')[0]);
      this.setState({
        country,
      });
      if (value !== null && valueThemes !== null) {
        // We have data!!
      } else {
        this.initializeData();
        return;
      }
    } catch (error) {
      alert(error);
    }
  };
  changeScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.Orientation.PORTRAIT_UP
    );
  };
  /*<Text style={{ fontWeight: 'bold', fontSize: 18 }}>Country: {Localization.locale.split("-")[0]}</Text>*/
  render() {
    return (
      <ImageBackground
        source={require('../assets/image_bg.jpg')}
        style={styles.container}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {i18n.t('welcome')}
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 32 }}>Tic Tac Toe!</Text>
        </View>
        <View style={{ flex: 1, padding: 5 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={[styles.button, { marginRight: 5 }]}
              onPress={() =>
                this.props.navigation.navigate('SinglePlayerForm')
              }>
              <Icon name="account" style={{ color: 'red', fontSize: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginLeft: 5 }]}
              onPress={() => this.props.navigation.navigate('MultiPlayerForm')}>
              <Icon
                name="account-multiple"
                style={{ color: 'red', fontSize: 50 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={[styles.button, { marginRight: 5 }]}
              onPress={() => this.props.navigation.navigate('OnlineScreen')}>
              <Icon name="wan" style={{ color: 'red', fontSize: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginLeft: 5 }]}
              onPress={() => this.props.navigation.navigate('ThemesScreen')}>
              <Icon name="shape" style={{ color: 'red', fontSize: 50 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.75,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <AdMobBanner
            bannerSize="banner"
            //testDeviceID="EMULATOR"
            adUnitID='ca-app-pub-4568717536332670/2967593203'
          />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
