import * as React from 'react';
import { View,TouchableOpacity, Text,ImageBackground, TextInput, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {
  AdMobBanner,
} from 'expo-ads-admob';
export default class singlePlayerForm extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          player:"Player"
        }
      }
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    return (  
      <ImageBackground source={require("../assets/image_bg.jpg")} style={styles.container}>
        <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
          <Text style={{fontWeight:"bold",fontSize:34}}>{i18n.t("singlePlayer")}</Text>
        </View>
        <View style={{flex:1,padding:10,justifyContent:"center"}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={[styles.button, { flexDirection: 'row', width: 210 }]}
              onPress={() => this.handleClick(1)}>
              <Icon name="account" style={{ color: 'red', fontSize: 30 }} />
              <TextInput
                style={{ marginLeft:10,width:100,height:50 }}
                placeholder={i18n.t("player",{someValue:""})}
                onChangeText={text => this.setState({ player:text })}
                value={this.state.text}
              />
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
              style={[styles.button, { marginRight:5,width: 100 }]}
              onPress={() =>
                this.props.navigation.navigate('SinglePlayerScreen',{player: this.state.player})
              }>
              <Icon name="play" style={{ color: 'red', fontSize: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginLeft: 5 }]}
              onPress={() => this.props.navigation.navigate("ThemesScreen")}>
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