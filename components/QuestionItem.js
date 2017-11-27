import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { questionItemStyles } from '../utils/styles';

class QuestionItem extends Component {
  state = {
    isFront: true,
    front: 'flex',
    back: 'none'
  };

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    if (this.state.isFront) {
      this.setState({
        isFront: false,
        front: 'none',
        back: 'flex'
      })
    } else {
      this.setState({
        isFront: true,
        front: 'flex',
        back: 'none'
      })
    }
  };

  render() {
    const {question} = this.props;

    return (
      <TouchableOpacity onPress={this.toggle}>
        <ScrollView style={[questionItemStyles.container, {display: this.state.front}]}>
          <Text style={questionItemStyles.titleText}>
            {question.question}
          </Text>
        </ScrollView>
        <ScrollView style={[
          questionItemStyles.container,
          questionItemStyles.backSide,
          {display: this.state.back}]
        }>
          <Text style={questionItemStyles.backSideText}>
            {question.answer}
          </Text>
        </ScrollView>
      </TouchableOpacity>
    )
  }
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionItem;