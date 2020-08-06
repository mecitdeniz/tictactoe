import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {
  AdMobBanner,
} from 'expo-ads-admob';
export default class multiPlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 'Player1',
      player2: 'Player2',
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    let players = [this.state.player1, this.state.player2];
    return (
      <ImageBackground
        source={require('../assets/image_bg.jpg')}
        style={styles.container}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 34 }}>
            {i18n.t('multiPlayer')}
          </Text>
        </View>
        <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={[styles.button, { width: 210 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="account" style={{ color: 'red', fontSize: 25 }} />
                <TextInput
                  style={{ marginLeft: 10, width: 100, height: 45 }}
                  placeholder={i18n.t('player', { someValue: '1' })}
                  onChangeText={text => this.setState({ player1: text })}
                  value={this.state.text}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="account" style={{ color: 'red', fontSize: 25 }} />
                <TextInput
                  style={{ marginLeft: 10, width: 100, height: 45 }}
                  placeholder={i18n.t('player', { someValue: '2' })}
                  onChangeText={text => this.setState({ player2: text })}
                  value={this.state.text}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={[styles.button, { marginRight: 5, width: 100 }]}
              onPress={() =>
                this.props.navigation.navigate('MultiplayerScreen', {
                  players: players,
                })
              }>
              <Icon name="play" style={{ color: 'red', fontSize: 50 }} />
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
