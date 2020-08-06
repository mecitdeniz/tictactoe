import * as React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'expo-ads-admob';
import Constants from 'expo-constants';
import Flag from 'react-native-flags';
import Emoji from 'react-native-emoji';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

import { AsyncStorage } from 'react-native';
export default class themesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: null,
      selectedTheme: 0,
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
  componentDidMount() {
    this.retrieveData();
  }
  retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('theme');
      const valueThemes = await AsyncStorage.getItem('themes');
      const themes = JSON.parse(valueThemes);
      value = parseInt(value);
      if (value !== null && valueThemes !== null) {
        this.setState({
          selectedTheme: value,
          themes: themes,
        });
      } else {
        this.initializeData();
        return;
      }
    } catch (error) {
      alert(error);
    }
  };
  unlock = async (id) => {
    try {
      let themes = this.state.themes;
      themes[id].isUnlocked="true";
      let data = JSON.stringify(themes);
      await AsyncStorage.setItem('themes',data);
      this.retrieveData();
      } catch (error) {
        // Error saving data
      }
  };
  select = async id => {
    try {
      let themes = this.state.themes;
      let selectedTheme = this.state.selectedTheme;
      themes[id].isSelected = 'true';
      themes[selectedTheme].isSelected = 'false';
      let data = JSON.stringify(themes);
      await AsyncStorage.setItem('theme', id);
      await AsyncStorage.setItem('themes', data);
      this.retrieveData();
    } catch (error) {
      alert(error);
    }
  };
  displayAdd = async id => {
    try { 
      AdMobRewarded.setAdUnitID('ca-app-pub-4568717536332670/7721226436'); // Test ID, Replace with your-admob-unit-id
      // AdMobRewarded.setTestDeviceID('EMULATOR');
      await AdMobRewarded.requestAdAsync();
      this.unlock(id);
      await AdMobRewarded.showAdAsync();
       //AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',()=>this.unlock(id));
    } catch (error) {
      console.log(error);
    }
  };
  renderAdButton(isUnlocked, isSelected, id) {
    if (isUnlocked === 'true' && isSelected === 'true') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="check-outline"
              style={{ fontSize: 25, color: 'green' }}
            />
          </View>
          <Text style={{ textAlign: 'center' }}>{i18n.t('selected')}</Text>
        </View>
      );
    } else if (isUnlocked === 'true' && isSelected === 'false') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.select(id)}>
            <Icon name="close" style={{ fontSize: 25, color: 'red' }} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center' }}>{i18n.t('select')}</Text>
        </View>
      );
    } else if (isUnlocked === 'false') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.displayAdd(id)}>
            <Icon name="filmstrip" style={{ fontSize: 25 }} />
          </TouchableOpacity>
          <Text>{i18n.t('unlockNow')}</Text>
        </View>
      );
    }
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/image_bg.jpg')}
        style={styles.container}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 32 }}>
            {i18n.t('themes')}
          </Text>
        </View>
        <FlatList
          style={{ flex: 3 }}
          data={this.state.themes}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.item} onPress={() => alert('Basıldı.')}>
                <Emoji name={item.player} style={{ fontSize: 45 }} />
                <Text> vs </Text>
                <Emoji name={item.opponent} style={{ fontSize: 45 }} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                  borderWidth: 0,
                  width: 100,
                  height: 100,
                }}>
                {this.renderAdButton(item.isUnlocked, item.isSelected, item.id)}
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <View
          style={{
            flex: 0.75,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <AdMobBanner
            bannerSize="banner"
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  item: {
    width: 210,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
});
