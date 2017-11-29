import React, { Component } from 'react';
/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDeck } from '../actions/deckActions';

/*--- react-natives ---*/
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
/*--- utils ---*/
import { newQuestionStyles } from '../utils/styles';
import { TEXT_LIMIT } from '../utils/constants';
/*--- Components ---*/
import Spinner from './Spinner';
import Button from './Button';
import SharedFunctions from "../utils/sharedFunctions";

class NewQuestion extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'New Card',
      headerTitleStyle: newQuestionStyles.headerTitleStyle,
      headerStyle: newQuestionStyles.headerStyle,
    };
  };
  state = {
    question: '',
    answer: ''
  };

  constructor() {
    super();
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onAddPressed = this.onAddPressed.bind(this);
  }

  onChangeQuestion = (value) => {
    this.setState({
      question: value
    })
  };

  onChangeAnswer = (value) => {
    this.setState({
      answer: value
    });
  };

  async onAddPressed() {
    const { question, answer } = this.state;
    let tmpQuestion = question.trim();
    let tmpAnswer = answer.trim();
    if(tmpQuestion.length < 1 || tmpAnswer.length < 1) {
      Alert.alert(
        'Invalid question or answer',
        `Please input both of the question and the answer with in ${TEXT_LIMIT.Question} characters.`,
        [{text: 'OK'}]
      );
      return;
    }
    const newQuestion = SharedFunctions.generateNewQuestion(tmpQuestion, tmpAnswer);
    const targetDeck = Object.assign({}, this.props.deck);
    targetDeck.contents.questions.push(newQuestion);

    try {
      await this.props.actions.updateDeck(targetDeck);
      Alert.alert(
        'Question created!',
        'Go back to the deck to deck it!',
        [{text: 'OK', onPress: () => this.props.navigation.goBack()}]
      );
    } catch(error) {
      Alert.alert(
        'Error!',
        'Sorry... But there is something wrong. I will fix this soon.',
        [{text: 'OK'}]
      );
    }
  };

  render() {
    const {question, answer} = this.state;

    if (this.props.loading) {
      return <Spinner size='large'/>
    }
    return (
      <KeyboardAvoidingView behavior='padding' style={newQuestionStyles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={newQuestionStyles.label}>
              What is the question of this card?
            </Text>
            <TextInput
              placeholder={`input the question within ${TEXT_LIMIT.Question} characters`}
              value={question}
              onChangeText={this.onChangeQuestion}
              maxLength={TEXT_LIMIT.Question}
              returnKeyType='next'
              style={newQuestionStyles.input}
            />
            <Text style={newQuestionStyles.label}>
              What is the answer for the question?
            </Text>
            <TextInput
              placeholder={`input the answer within ${TEXT_LIMIT.Answer} characters`}
              value={answer}
              onChangeText={this.onChangeAnswer}
              maxLength={TEXT_LIMIT.Answer}
              returnKeyType='next'
              style={newQuestionStyles.input}
            />
            <Button
              onPress={this.onAddPressed}
              style={newQuestionStyles.addButton}
            >
              Add Card
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const { deck } = navigation.state.params;
  return {
    loading: state.question.loading,
    deck,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateDeck }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);