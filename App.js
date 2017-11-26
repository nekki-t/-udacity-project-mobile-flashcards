import React, { Component } from 'react';

/*--- Redux ---*/
import { Provider } from 'react-redux';

import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

/*--- Shared ---*/
import { dark_gray, black, white } from './utils/colors';

/*--- Components ---*/
import FlashcardStatusBar from './components/FlashcardStatusBar';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';

/*--- Store ---*/
import createStore from './createStore';

const store = createStore();

/*--- Navigator ---*/
const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
  },
  Deck: {
    screen: Deck,
  },
  NewDeck: {
    screen: NewDeck,
  },
  NewQuestion: {
    screen: NewQuestion,
  },
  Quiz: {
    screen: Quiz,
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashcardStatusBar backgroundColor={black} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark_gray,
  },
});
