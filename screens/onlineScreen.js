import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {
  AdMobBanner,
} from 'expo-ads-admob';
export default class onlineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    return (
      <ImageBackground
        source={require('../assets/image_bg.jpg')}
        style={styles.container}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 34 }}>
            {i18n.t('playOnline')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ textAlign: 'center', fontSize: 24 }}>
            {i18n.t('comingSoon')}...
          </Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => this.props.navigation.navigate('WellcomeScreen')}>
            <Icon name="arrow-left" style={{ color: 'green', fontSize: 50 }} />
          </TouchableOpacity>
        </View>
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
