import React, { Component } from 'react';

/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*--- react-natives ---*/
import { View, Text, TextInput } from 'react-native';

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
      question: value.trim()
    })
  };

  onChangeAnswer = (value) => {
    this.setState({
      answer: value.trim()
    });
  };

  render() {
    const {question, answer} = this.state;

    if (this.props.loading) {
      return <Spinner size='large'/>
    }
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
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