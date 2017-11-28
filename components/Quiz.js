import React, { Component } from 'react';
/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/*--- react-native ---*/
import {
  Animated,
  Dimensions,
  Text,
  View
} from 'react-native';
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
      showAnswer: false,
      checked: false,
      deck: this.props.deck,
      currentIndex: 0,
      currentProgress: new Animated.Value(0),
      correctCount: 0,
      score: 0,
      finished: false,
    };

    this.onShowAnswer = this.onShowAnswer.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onGotoNextQuestion = this.onGotoNextQuestion.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
  }

  onShowAnswer = () => {
    this.setState({
      showAnswer: true,
    });
    if(this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  };

  onCheck = (correct) => {
    if (correct) {

    } else {

    }

    this.setState({
      checked: true,
    });
  };

  onGotoNextQuestion = () => {

  };


  render() {
    const {
      deck,
      showAnswer,
      checked,
      finished,
      currentIndex,
      currentProgress,
      score
    } = this.state;
    const {width} = Dimensions.get('window');
    console.log(width);

    const frontAnimatedStyle = {
      transform: [
        {rotateY: this.frontInterpolate}
      ]
    };

    const backAnimatedStyle = {
      transform: [
        {rotateY: this.backInterpolate}
      ]
    };

    return (
      <View style={quizStyles.container}>
        {checked &&
        <View style={quizStyles.checked}>
          <Text>
            Overlay
          </Text>
          <Button
            onPress={this.onGotoNextQuestion}
          >

          </Button>
        </View>
        }
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

        <View>
          <Animated.View style={[quizStyles.question, frontAnimatedStyle]}>
            <Text style={quizStyles.questionText}>
              {deck.contents.questions[currentIndex].question}
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, quizStyles.question, quizStyles.backSide]}>
            <Text style={quizStyles.backSideText}>
              {deck.contents.questions[currentIndex].answer}
            </Text>
          </Animated.View>
        </View>

        {showAnswer
          ? <View style={quizStyles.actionArea}>
            <Button
              onPress={() => this.onCheck(false)}
              style={quizStyles.inCorrectButton}
            >
              <Text style={quizStyles.inCorrectLabel}>
                Incorrect
              </Text>
            </Button>
            <Button
              onPress={() => this.onCheck(true)}
              style={quizStyles.correctButton}
            >
              <Text style={quizStyles.correctLabel}>
                Correct
              </Text>
            </Button>
          </View>
          : <View style={quizStyles.singleActionArea}>
            <Button
              onPress={this.onShowAnswer}
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