import React, { Component } from 'react';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FlatList, View } from 'react-native';
/*--- utils ---*/
import { deckStyles } from '../utils/styles';
/*--- Components ---*/
import DeckItem from './DeckItem';
import Button from './Button';
import QuestionItem from './QuestionItem';

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
    this.startQuiz = this.startQuiz.bind(this);
    this.addCard = this.addCard.bind(this);
  }


  startQuiz = () => {
    this.props.navigation.navigate('Quiz', {deck: this.props.deck});
  };

  addCard = () => {
    this.props.navigation.navigate('NewQuestion', {deck: this.props.deck});
  };

  renderQuestions = (data) => {
    return (
      <QuestionItem
        question={data.item}
      />
    )
  };

  render() {
    const {deck, loading} = this.props;
    return (
      <View style={deckStyles.container}>
        <DeckItem
          deck={deck}
          onPress={this.startQuiz}
        />
        <View style={deckStyles.buttonArea}>
          <Button
            onPress={this.addCard}
          >
            Add Card
          </Button>
          <Button
            onPress={this.startQuiz}
            active={deck.contents.questions.length > 0}
          >
            Start Quiz
          </Button>
        </View>
        <FlatList
          data={deck.contents.questions}
          renderItem={this.renderQuestions}
          style={{alignSelf: 'stretch'}}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {deck} = navigation.state.params;
  return {
    loading: state.deck.loading,
    deck,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);