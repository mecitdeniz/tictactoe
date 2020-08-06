import * as React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
} from 'expo-ads-admob';
import i18n from 'i18n-js';
import { AsyncStorage } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import Emoji from 'react-native-emoji';
import Names from '../assets/names.json';

export default class multiplayerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      player1Points: 0,
      player2Points: 0,
      round: 0,
      gamePlayed: 1,
      computer: 'Computer',
      player: 'Player',
      playerTile: 'x',
      computerTile: 'o',
      isSwitchable: true,
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
  componentDidMount() {
    this.initializaGame();
    this.generateName();
    this.getPlayerName();
    this.retrieveData();
  }

  switchTiles() {
    let isSwitchable = this.state.isSwitchable;
    if (isSwitchable !== false) {
      let playerTile = this.state.playerTile;
      let computerTile = this.state.computerTile;
      this.setState({
        playerTile: computerTile,
        computerTile: playerTile,
      });
    }else{
      alert("You can not chance tiles while playing!");
    }
  }

  retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('theme');
      const valueThemes = await AsyncStorage.getItem('themes');
      const themes = JSON.parse(valueThemes);
      value = parseInt(value);
      if (value !== null && valueThemes !== null) {
        this.setState({
          playerTile: themes[value].player,
          computerTile: themes[value].opponent,
        });
      } else {
        this.initializeData();
        return;
      }
    } catch (error) {
      alert(error);
    }
  };

  showAlert = tit => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };
  getPlayerName() {
    let playerName = this.props.navigation.state.params.player;
    this.setState({ player: playerName });
  }
  initializaGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      round: 0,
      isSwitchable:true
    });
  };
  checAd() {
    let gameNumber = this.state.gamePlayed;
    if (gameNumber % 3 == 0 && gameNumber != 0) {
      this.showAd();
    }
  }
  newGame = () => {
    this.initializaGame();
    this.generateName();
    this.setState({
      player1Points: 0,
      player2Points: 0,
    });
  };

  generateName() {
    let id = Math.floor(Math.random() * 62);
    let opponent = Names[id].name;
    this.setState({ computer: opponent });
  }
  //Returns 1 if player1  won, -1 if player2 won,or a 0 if no one has won
  getWinner = () => {
    const NUM_TILES = 3;
    const arr = this.state.gameState;
    let sum;
    const round = this.state.roundCount;
    // Check rows
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    // Check columns
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    //Check the diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    //There are no winners
    return 0;
  };

  getRandom() {
    let r = Math.floor(Math.random() * 2) + 1;
    let c = Math.floor(Math.random() * 2) + 1;
    let arr = this.state.gameState;
    if (arr[r][c] == 0) {
      this.computerMove(r, c);
    } else {
      this.getRandom();
    }
  }
  /* getFirstAvailable() {
    let arr = this.state.gameState;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (arr[i][j] == 0) {
          this.computerMove(i, j);
          return;
        }
      }
    }
  }*/
  checkForFinish() {
    let Positions = new Object();
    const arr = this.state.gameState;
    let sum = 0;
    sum = arr[0][0] + arr[0][1] + arr[0][2];
    if (sum == -2) {
      for (let i = 0; i < 3; i++) {
        if (arr[0][i] == 0) {
          Positions[0] = 1;
          Positions[1] = 0;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[1][0] + arr[1][1] + arr[1][2];
    if (sum == -2) {
      for (let i = 0; i < 3; i++) {
        if (arr[1][i] == 0) {
          Positions[0] = 1;
          Positions[1] = 1;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[2][0] + arr[2][1] + arr[2][2];
    if (sum == -2) {
      for (let i = 0; i < 3; i++) {
        if (arr[2][i] == 0) {
          Positions[0] = 1;
          Positions[1] = 2;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[0][0] + arr[1][0] + arr[2][0];
    if (sum == -2) {
      for (let i = 0; i < 3; i++) {
        if (arr[i][0] == 0) {
          Positions[0] = 1;
          Positions[1] = i;
          Positions[2] = 0;
          return Positions;
        }
      }
    }
    sum = arr[0][1] + arr[1][1] + arr[2][1];
    if (sum == -2) {
      if (arr[0][1] == 0) {
        Positions[0] = 1;
        Positions[1] = 0;
        Positions[2] = 1;
        return Positions;
      } else if (arr[1][1] == 0) {
        Positions[0] = 1;
        Positions[1] = 1;
        Positions[2] = 1;
        return Positions;
      } else {
        Positions[0] = 1;
        Positions[1] = 2;
        Positions[2] = 1;
        return Positions;
      }
    }
    sum = arr[0][2] + arr[1][2] + arr[2][2];
    if (sum == -2) {
      for (let i = 0; i < 3; i++) {
        if (arr[i][2] == 0) {
          Positions[0] = 1;
          Positions[1] = i;
          Positions[2] = 2;
          return Positions;
        }
      }
    }
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == -2) {
      for (let i = 0; i < 3; i++) {
        if (arr[i][i] == 0) {
          Positions[0] = 1;
          Positions[1] = i;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == -2) {
      if (arr[0][2] == 0) {
        Positions[0] = 1;
        Positions[1] = 0;
        Positions[2] = 2;
        return Positions;
      } else if (arr[1][1] == 0) {
        Positions[0] = 1;
        Positions[1] = 0;
        Positions[2] = 1;
        return Positions;
      } else {
        Positions[0] = 1;
        Positions[1] = 2;
        Positions[2] = 0;
        return Positions;
      }
    } else {
      Positions[0] = 0;
      return Positions;
    }
  }
  checkForBlock() {
    let Positions = new Object();
    const arr = this.state.gameState;
    let sum = 0;
    sum = arr[0][0] + arr[0][1] + arr[0][2];
    if (sum == 2) {
      for (let i = 0; i < 3; i++) {
        if (arr[0][i] == 0) {
          Positions[0] = 1;
          Positions[1] = 0;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[1][0] + arr[1][1] + arr[1][2];
    if (sum == 2) {
      for (let i = 0; i < 3; i++) {
        if (arr[1][i] == 0) {
          Positions[0] = 1;
          Positions[1] = 1;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[2][0] + arr[2][1] + arr[2][2];
    if (sum == 2) {
      for (let i = 0; i < 3; i++) {
        if (arr[2][i] == 0) {
          Positions[0] = 1;
          Positions[1] = 2;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[0][0] + arr[1][0] + arr[2][0];
    if (sum == 2) {
      for (let i = 0; i < 3; i++) {
        if (arr[i][0] == 0) {
          Positions[0] = 1;
          Positions[1] = i;
          Positions[2] = 0;
          return Positions;
        }
      }
    }
    sum = arr[0][1] + arr[1][1] + arr[2][1];
    if (sum == 2) {
      if (arr[0][1] == 0) {
        Positions[0] = 1;
        Positions[1] = 0;
        Positions[2] = 1;
        return Positions;
      } else if (arr[1][1] == 0) {
        Positions[0] = 1;
        Positions[1] = 1;
        Positions[2] = 1;
        return Positions;
      } else {
        Positions[0] = 1;
        Positions[1] = 2;
        Positions[2] = 1;
        return Positions;
      }
    }
    sum = arr[0][2] + arr[1][2] + arr[2][2];
    if (sum == 2) {
      for (let i = 0; i < 3; i++) {
        if (arr[i][2] == 0) {
          Positions[0] = 1;
          Positions[1] = i;
          Positions[2] = 2;
          return Positions;
        }
      }
    }
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 2) {
      for (let i = 0; i < 3; i++) {
        if (arr[i][i] == 0) {
          Positions[0] = 1;
          Positions[1] = i;
          Positions[2] = i;
          return Positions;
        }
      }
    }
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == 2) {
      if (arr[0][2] == 0) {
        Positions[0] = 1;
        Positions[1] = 0;
        Positions[2] = 2;
        return Positions;
      } else if (arr[1][1] == 0) {
        Positions[0] = 1;
        Positions[1] = 0;
        Positions[2] = 1;
        return Positions;
      } else {
        Positions[0] = 1;
        Positions[1] = 2;
        Positions[2] = 0;
        return Positions;
      }
    } else {
      Positions[0] = 0;
      Positions[1] = 5;
      Positions[2] = 6;
      return Positions;
    }
  }
  checkForPos() {
    let Positions = this.checkForFinish();
    if (Positions[0] == 1) {
      this.computerMove(Positions[1], Positions[2]);
    } else {
      let Positions = this.checkForBlock();
      if (Positions[0] == 1) {
        this.computerMove(Positions[1], Positions[2]);
      } else {
        this.getRandom();
      }
    }
  }

  computerMove(row, col) {
    const value = this.state.gameState[row][col];
    if (value !== 0) {
      this.getRandom();
      return;
    }
    let roundCount = this.state.round;
    let gameNumber = this.state.gamePlayed;
    // Grab current player
    const currentPlayer = this.state.currentPlayer;
    let p1Points = this.state.player1Points;
    let p2Points = this.state.player2Points;
    //Set the correct tile
    const arr = this.state.gameState.slice();
    arr[row][col] = -1;
    roundCount++;
    this.setState({
      gameState: arr,
      round: roundCount,
    });
    //Switch to other player
    const nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //Get player names
    let player = this.state.player;
    let computer = this.state.computer;

    //Check for winners
    let winner = this.getWinner();
    if (winner == 1) {
      Alert.alert(
        i18n.t('playerWon'),
        ' ',
        [{ text:i18n.t('playAgain'), onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      p1Points++;
      gameNumber++;
      this.setState({ player1Points: p1Points, gamePlayed: gameNumber });
      this.initializaGame();
      this.checAd();
    } else if (winner == -1) {
      Alert.alert(
        computer + ' ' + i18n.t('won'),
        '',
        [{ text:i18n.t('playAgain'), onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      p2Points++;
      gameNumber++;
      this.setState({ player2Points: p2Points, gamePlayed: gameNumber });
      this.initializaGame();
      this.checAd();
    } else if (roundCount == 5) {
      Alert.alert(
        i18n.t('draw'),
        '',
        [{ text:i18n.t('playAgain'), onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      gameNumber++;
      this.setState({ gamePlayed: gameNumber });
      this.initializaGame();
      this.checAd();
    }
  }
  showAd = async () => {
    try {
      // Display an interstitial
    AdMobInterstitial.setAdUnitID('ca-app-pub-4568717536332670/3043614823');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(error);
    }
  };
  onTilePress = (row, col) => {
    //Don't allow tiles to change..
    const value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }
    let roundCount = this.state.round;
    // Grab current player

    const currentPlayer = this.state.currentPlayer;
    let p1Points = this.state.player1Points;
    let p2Points = this.state.player2Points;
    //Set the correct tile
    const arr = this.state.gameState.slice();
    arr[row][col] = 1;
    roundCount++;
    this.setState({
      gameState: arr,
      round: roundCount,
      isSwitchable:false
    });

    //Switch to other player
    const nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //Get player names
    let player = this.state.player;
    let computer = this.state.computer;

    //Check for winners
    let gameNumber = this.state.gamePlayed;
    let winner = this.getWinner();
    if (winner == 1) {
      Alert.alert(
        i18n.t('playerWon'),
        ' ',
        [{ text:i18n.t('playAgain'), onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      p1Points++;
      gameNumber++;
      this.setState({ player1Points: p1Points, gamePlayed: gameNumber });
      this.initializaGame();
      this.checAd();
    } else if (winner == -1) {
      Alert.alert(
        computer + ' ' + i18n.t('won'),
        ' ',
        [{ text:i18n.t('playAgain'), onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      p2Points++;
      gameNumber++;
      this.setState({ player2Points: p2Points, gamePlayed: gameNumber });
      this.initializaGame();
      this.checAd();
    } else if (roundCount == 5) {
      //alert(i18n.t("draw"));
      Alert.alert(
        i18n.t('draw'),
        ' ',
        [{ text:i18n.t('playAgain'), onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      gameNumber++;
      this.setState({ gamePlayed: gameNumber });
      this.initializaGame();
      this.checAd();
    } else {
      this.checkForPos();
    }
  };

  renderIcon = (row, col) => {
    const value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Emoji name={this.state.playerTile} style={{ fontSize: 45 }} />;
      case -1:
        return (
          <Emoji name={this.state.computerTile} style={{ fontSize: 45 }} />
        );
      case 0:
        return <View />;
    }
  };
  showPoints = player => {
    const player1Points = this.state.player1Points;
    const player2Points = this.state.player2Points;
    const roundCount = this.state.gamePlayed;
    switch (player) {
      case 1:
        return <Text>{player1Points}</Text>;
      case 2:
        return <Text style={{ marginLeft: 20 }}>{player2Points}</Text>;
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/image_bg.jpg')}
        style={styles.container}>
        <View
          style={{
            flex: 0.75,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Emoji name={this.state.playerTile} style={{ fontSize: 25 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>
              {this.state.player}
            </Text>
            <View>{this.showPoints(1)}</View>
          </View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.switchTiles()}>
              <Icon
                name="swap-horizontal"
                style={{ fontSize: 25, marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Emoji name={this.state.computerTile} style={{ fontSize: 25, marginLeft: 20 }} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 5,
                marginLeft: 20,
              }}>
              {this.state.computer}
            </Text>
            <View>{this.showPoints(2)}</View>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}>
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={[styles.tile, { borderTopWidth: 0 }]}>
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 2)}
              style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={[styles.tile, { borderLeftWidth: 0 }]}>
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={[styles.tile, {}]}>
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={[styles.tile, { borderRightWidth: 0 }]}>
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={[
                styles.tile,
                { borderBottomWidth: 0, borderLeftWidth: 0 },
              ]}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={[styles.tile, { borderBottomWidth: 0 }]}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={[
                styles.tile,
                { borderBottomWidth: 0, borderRightWidth: 0 },
              ]}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.newGame();
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
              {i18n.t('newGame')}
            </Text>
          </TouchableOpacity>
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
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 180,
    height: 45,
    borderWidth: 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginBottom: 20,
  },
});
