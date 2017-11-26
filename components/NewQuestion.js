import React, { Component } from 'react';
/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/*--- react-natives ---*/
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
/*--- utils ---*/
import { newQuestionStyles } from '../utils/styles';
/*--- Components ---*/
import Spinner from './Spinner';

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
              placeholder='input the question within 100 characters'
              value={question}
              onChangeText={this.onChangeQuestion}
              autoFocus={true}
              maxLength={100}
              multiline={true}
              blurOnSubmit={false}
              numberOfLines={4}
              style={newQuestionStyles.input}
            />
              <Text style={newQuestionStyles.label}>
                What is the answer for the question?
              </Text>
              <TextInput
                placeholder='input the answer within 100 characters'
                value={answer}
                onChangeText={this.onChangeAnswer}
                maxLength={100}
                multiline={true}
                blurOnSubmit={false}
                numberOfLines={4}
                style={newQuestionStyles.input}
              />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.question.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);