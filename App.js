import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

i18n.translations = {
  en: {
    welcome: 'Welcome to',
    singlePlayer: 'Singleplayer',
    multiPlayer: 'Multiplayer',
    settings: 'Settings',
    comingSoon: 'Coming soon',
    player: 'Player {{someValue}}',
    themes: 'Themes',
    playOnline: 'Play Online',
    won:'has won',
    playerWon:"Congratulations You Won!",
    draw:'Tie',
    select:'Select',
    selected:'Selected',
    unlockNow:'Unlock now!',
    newGame:'New Game',
    playAgain:'Play again'
  },
  tr: {
    welcome: 'Hoşgeldiniz',
    singlePlayer: 'Tek Kişi Oyna',
    multiPlayer: 'Birlikte Oyna',
    settings: 'Ayarlar',
    comingSoon: 'Çok yakında',
    player: 'Oyuncu {{someValue}}',
    themes: 'Temalar',
    playOnline: 'Çevrimiçi Oyna',
    won:'Kazandı',
    playerWon:"Tebrikler Kazandınız!",
    draw:'Berabere',
    select:'Seç',
    selected:'Seçili',
    unlockNow:'Şimdi aç!',
    newGame:'Yeni Oyun',
    playAgain:'Tekrar oyna'
  },
  pl: {
    welcome: 'Witamy w',
    singlePlayer: 'Jeden Gracz',
    multiPlayer: 'Graj Razem',
    settings: 'Ustawienia',
    comingSoon: 'Wkrótce',
    player: 'Odtwarzacz {{someValue}}',
    themes: 'Tematy',
    playOnline: 'Graj online',
    won:'Wygrał',
    playerWon:"Gratulacje Wygrałeś!",
    draw:'Sporządzony',
    select:'Wybierz',
    selected:'Wybrany',
    unlockNow:'Odblokuj!',
    newGame:'Nowa gra',
    playAgain:'Zagraj ponownie'
  },
  de: {
    welcome: 'Willkommen zu',
    singlePlayer: 'Einzelspieler',
    multiPlayer: 'Multiplayer',
    settings: 'Einstellungen',
    comingSoon: 'Kommt bald',
    player: 'Spieler(in) {{someValue}}',
    themes: 'Themen',
    playOnline: 'Online spielen',
    won:'Gewonnen',
    playerWon:"Glückwunsch du hast gewonnen!",
    draw:'Gleich',
    select:'Wählen',
    selected:'Ausgewählt',
    unlockNow:'Freischalten!',
    newGame:'Neues Spiel',
    playAgain:'Nochmal abspielen'
  },
  fr: {
    welcome: 'Bienvenue chez',
    singlePlayer: 'Seul Joueur',
    multiPlayer: 'Multijoueur',
    settings: 'Réglages',
    comingSoon: 'Bientôt disponible',
    player: 'joueu(r/se) {{someValue}}',
    themes: 'Thèmes',
    playOnline: 'Jouer en ligne',
    won:'a gagné',
    playerWon:"Félicitations, vous avez gagné!",
    draw:'Dessine',
    select:'Sélectionner',
    selected:'Choisi',
    unlockNow:'Ouvrir!',
    newGame:'Nouveau jeu',
    playAgain:'Rejouer'
  },
  ru: {
    welcome: 'Добро пожаловать в',
    singlePlayer: 'Oдиночная игра',
    multiPlayer: 'Мультиплеер',
    settings: 'настройки',
    comingSoon: 'Скоро',
    player: 'игрок {{someValue}}',
    themes: 'Темы',
    playOnline: 'Играть онлайн',
    won:'выиграл',
    playerWon:"Поздравляем, Вы выиграли!",
    draw:'Hичья',
    select:'Выбрать',
    selected:'выбранный',
    unlockNow:'Oтпирать!',
    newGame:'Новая игра',
    playAgain:'Играть снова'
  },
  es: {
    welcome: 'Bienvenid(o/a) a',
    singlePlayer: 'Un(a) jugador(a)',
    multiPlayer: 'Multijugador(a)',
    settings: 'Configuraciones',
    comingSoon: 'Próximamente',
    player: 'Jugador(a) {{someValue}}',
    themes: 'Temas',
    playOnline: 'Jugar en linea',
    won:'ha ganado',
    playerWon:"Felicitaciones has ganado!",
    draw:'Dibujar',
    select:'Seleccione',
    selected:'Escogido',
    unlockNow:'Desbloquear!',
    newGame:'Nuevo juego',
    playAgain:'Juega de nuevo'
  },
  
};

i18n.locale = Localization.locale.split("-")[0];
// You can import from local files

import WellcomeScreen from './screens/wellcomeScreen';
import MultiplayerScreen from './screens/multiplayerScreen';
import SinglePlayerScreen from './screens/singlePlayerScreen';
import SinglePlayerForm from './screens/singlePlayerForm';
import MultiPlayerForm from './screens/multiPlayerForm';
import OnlineScreen from './screens/onlineScreen';
import ThemesScreen from './screens/themesScreen';

const MainNavigator = createStackNavigator(
  {
    WellcomeScreen: { screen: WellcomeScreen },
    MultiplayerScreen: { screen: MultiplayerScreen },
    SinglePlayerScreen: { screen: SinglePlayerScreen },
    SinglePlayerForm: { screen: SinglePlayerForm },
    MultiPlayerForm: { screen: MultiPlayerForm },
    ThemesScreen: { screen: ThemesScreen },
    OnlineScreen: { screen: OnlineScreen },
  },
  {
    headerMode: 'none',
  }
);
const MyApp = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <MyApp />;
  }
}
