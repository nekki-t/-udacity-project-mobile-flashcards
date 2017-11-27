import React, { Component } from 'react';

/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*--- Actions ---*/
import { createDeck } from '../actions/deckActions';

import { View, Text, TextInput, Alert } from 'react-native';

/*--- utils ---*/
import { newDeckStyles } from '../utils/styles';
import { TEXT_LIMIT } from '../utils/constants';
import sharedFunctions from '../utils/sharedFunctions';

/*--- components ---*/
import Button from './Button';
import Spinner from './Spinner';

class NewDeck extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'New Deck',
      headerTitleStyle: newDeckStyles.headerTitleStyle,
      headerStyle: newDeckStyles.headerStyle,
    };
  };

  state = {
    title: ''
  };

  constructor() {
    super();
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onTitleFocused = this.onTitleFocused.bind(this);
    this.onAddPressed = this.onAddPressed.bind(this);
  }

  onChangeTitle = (value) => {
    this.setState({
      title: value.trim()
    });
  };

  onTitleFocused = () => {

  };

  async onAddPressed() {
    const value = this.state.title.trim();
    if (value.length < 1) {
      Alert.alert(
        'Invalid title',
        `Please input the title with in ${TEXT_LIMIT.DeckTitle} characters.`,
        [{text: 'OK', onPress: () => console.log('OK')}]
      );
      return;
    }
    const newDeck = sharedFunctions.generateNewDeck(value);
    try {
      await this.props.actions.createDeck(newDeck);
      Alert.alert(
        'Deck created!',
        'Go back to the list to deck it!',
        [{text: 'OK', onPress: () => this.props.navigation.goBack()}]
      );
    } catch (error) {
      Alert.alert(
        'Error!',
        'Sorry... But there is something wrong. I will fix this soon.',
        [{text: 'OK', onPress: () => console.log(error)}]
      );
    }
  }

  render() {
    const {title} = this.state;
    if (this.props.loading) {
      return <Spinner size='large'/>
    }
    return (
      <View style={newDeckStyles.container}>
        <Text style={newDeckStyles.label}>
          What is the title of your new deck?
        </Text>
        <TextInput
          placeholder={`Input the title within ${TEXT_LIMIT.DeckTitle} characters`}
          value={title}
          onChangeText={this.onChangeTitle}
          autoFocus={true}
          maxLength={TEXT_LIMIT.DeckTitle}
          onFocus={this.onTitleFocused}
          style={newDeckStyles.input}
        />
        <Button
          onPress={this.onAddPressed}
          style={newDeckStyles.addButton}
        >
          Add Deck
        </Button>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.deck.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({createDeck}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);