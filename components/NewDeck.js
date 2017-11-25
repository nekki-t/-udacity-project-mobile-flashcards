import React, { Component } from 'react';

/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*--- Actions ---*/
import { createDeck } from '../actions/deckActions';

import { View, Text, TextInput, Modal, Alert } from 'react-native';

/*--- utils ---*/
import { newDeckStyles } from '../utils/styles';

/*--- libraries ---*/
import shortId from 'shortid';


/*--- components ---*/
import Button from './Button';

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
      title: value
    });
  };

  onTitleFocused = () => {

  };

  async onAddPressed() {
    const value = this.state.title.trim();
    if (value.length < 1) {
      Alert.alert(
        'Invalid title',
        'Please input the title with in 20 characters.',
        [{text: 'OK', onPress: () => console.log('OK')}]
      );
      return;
    }
    try{
      await this.props.actions.createDeck(shortId.generate(), value);
      Alert.alert(
        'Deck created!',
        'Please press OK to check the deck in the list.',
        [{text: 'OK', onPress: () => this.props.navigation.goBack()}]
      );
    } catch(error) {
      console.log('test');
    }
  }

  render() {
    const {title} = this.state;
    return (
      <View style={newDeckStyles.container}>
        <Text style={newDeckStyles.label}>
          What is the title of your new deck?
        </Text>
        <TextInput
          placeholder='input the title within 20 characters'
          value={title}
          onChangeText={this.onChangeTitle}
          autoFocus={true}
          maxLength={20}
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

const mapStateToProps = (state, {navigation}) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createDeck }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);