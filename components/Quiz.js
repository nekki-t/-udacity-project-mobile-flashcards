import React, { Component } from 'react';
/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/*--- react-native ---*/
import { Animated, Dimensions, Text, View } from 'react-native';
/*--- utils ---*/
import { quizStyles } from '../utils/styles';
/*--- Components ---*/
import Button from './Button';

class Quiz extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Quiz',
      headerTitleStyle: quizStyles.headerTitleStyle,
      headerStyle: quizStyles.headerStyle,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      showAnswer: false,
      deck: this.props.deck,
      currentIndex: 0,
      currentProgress: new Animated.Value(0),
      correctCount: 0,
      score: 0,
    };

    this.onStartPressed = this.onStartPressed.bind(this);
  }

  onStartPressed = () => {
    this.setState({
      started: true,
    })
  };

  render() {
    const {
      deck,
      showAnswer,
      finished,
      currentIndex,
      currentProgress,
      score
    } = this.state;
    const {width} = Dimensions.get('window');
    console.log(width);
    return (
      <View style={quizStyles.container}>
        <View style={quizStyles.deckNameArea}>
          <Text style={quizStyles.deckNameText}>
            {deck.contents.title}
          </Text>
        </View>
        <View style={quizStyles.progressInfoArea}>
          <View style={quizStyles.progressBarArea}>
            <View style={quizStyles.progressBarValue}>
            </View>
          </View>
        </View>
        <View style={quizStyles.progressTextArea}>
          <Text style={quizStyles.progressText}>
            {currentIndex + 1} / {deck.contents.questions.length}
          </Text>
        </View>

        <View style={quizStyles.question}>
          <Text style={quizStyles.questionText}>
            {deck.contents.questions[currentIndex].question}
          </Text>
        </View>
        {showAnswer
          ? <View style={quizStyles.actionArea}>
            <Button
              onPress={() => console.log('incorrect')}
              style={quizStyles.inCorrectButton}
            >
              <Text style={quizStyles.inCorrectLabel}>
                Incorrect
              </Text>
            </Button>
            <Button
              onPress={() => console.log('correct')}
              style={quizStyles.correctButton}
            >
              <Text style={quizStyles.correctLabel}>
                Correct
              </Text>
            </Button>
          </View>
          : <View style={quizStyles.singleActionArea}>
            <Button
              onPress={() => console.log('show answer')}
              style={quizStyles.showAnswerButton}
            >
              <Text style={quizStyles.inCorrectLabel}>
                Show Answer
              </Text>
            </Button>
          </View>

        }

        <View style={quizStyles.scoreArea}>
          <Text style={quizStyles.scoreText}>
            Your Score: {score} %
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {deck} = navigation.state.params;
  return {
    deck,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);