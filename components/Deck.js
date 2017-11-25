import React, { Component } from 'react';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Text, View } from 'react-native';
/*--- utils ---*/
import { deckStyles } from '../utils/styles';

/*--- Components ---*/
import DeckItem from './DeckItem';
import Button from './Button';

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    const {deck} = navigation.state.params;
    return {
      title: 'Deck',
      headerTitleStyle: deckStyles.headerTitleStyle,
      headerStyle: deckStyles.headerStyle,
    }
  };

  constructor() {
    super();
    this.onDeckClick = this.onDeckClick.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  onDeckClick = (deck) => {
    console.log(deck);
  };

  startQuiz = () => {
    console.log('play quiz');
  };

  addCard = () => {
    console.log('add card');
  };

  render() {
    const {deck, loading} = this.props;
    return (
      <View style={deckStyles.container}>
        <DeckItem
          deck={deck}
          onPress={this.onDeckClick}
        />
        <View style={deckStyles.buttonArea}>
          <Button
            onPress={this.addCard}
          >
            Add Card
          </Button>
          <Button
            onPress={this.startQuiz}
          >
            Start Quiz
          </Button>
        </View>
        <View>
          <Text>
            Cards
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {deck} = navigation.state.params;
  return {
    loading: state.deck.loading,
    deck
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);