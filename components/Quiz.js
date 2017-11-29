import React, { Component } from 'react';
/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDeck } from '../actions/deckActions';
import SharedFunctions from '../utils/sharedFunctions';

/*--- react-native ---*/
import {
  Animated,
  Dimensions,
  Text,
  View,
  Alert,
} from 'react-native';
/*--- utils ---*/
import { quizStyles } from '../utils/styles';
/*--- Components ---*/
import Button from './Button';
import Checked from './Checked';
import FinalScore from './FinalScore';

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
      showFinalScore: false,
      deck: this.props.deck,
      correct: false,
      currentIndex: 0,
      correctCount: 0,
      questionsCount: this.props.deck.contents.questions.length,
      score: 0,
      finished: false,
    };

    this.onShowAnswer = this.onShowAnswer.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onGotoNextQuestion = this.onGotoNextQuestion.bind(this);
    this.onCheckFinalScore = this.onCheckFinalScore.bind(this);
    this.onActionAfterFinished = this.onActionAfterFinished.bind(this);
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

  getProgressValue = () => {
    const {width} = Dimensions.get('window');
    const ratio = (this.state.currentIndex + 1) / this.state.questionsCount;
    return Math.ceil(width * ratio);
  };

  onShowAnswer = () => {
    this.setState({
      showAnswer: true,
    });
    if (this.value >= 90) {
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
    let correctCount = this.state.correctCount;
    if (correct) {
      correctCount += 1;
    }

    const score = ((correctCount / this.state.questionsCount) * 100);

    if ((this.state.currentIndex + 1) === this.state.questionsCount) {
      this.setState({
        checked: true,
        finished: true,
        correctCount,
        correct,
        score,
      });
    } else {
      this.setState({
        checked: true,
        correctCount,
        correct,
        score,
      });
    }
  };

  onGotoNextQuestion = () => {
    if (this.state.currentIndex < (this.state.questionsCount - 1)) {
      this.setState({
        showAnswer: false,
        checked: false,
        currentIndex: this.state.currentIndex + 1,
      });
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      // all done
    }
  };

  async onCheckFinalScore() {
    const deck = this.state.deck;
    const trainedCount = deck.contents.trained + 1;
    const pastTotal = deck.contents.trained * deck.contents.average;
    const newAverage = (pastTotal + this.state.score) / trainedCount;

    deck.contents.trained = trainedCount;
    deck.contents.average = newAverage;

    try {
      await this.props.actions.updateDeck(deck);
      this.setState({
        showAnswer: false,
        checked: false,
        showFinalScore: true,
        deck: Object.assign({}, deck)
      });
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
      SharedFunctions.clearLocalNotification()
        .then(SharedFunctions.setLocalNotification());
    } catch (error) {
      Alert.alert(
        'Save Error!',
        'Sorry... But there is something wrong. I will fix this soon.',
        [{text: 'OK'}]
      );
    }
  };

  onActionAfterFinished = (restart) => {
    if (restart) {
      this.setState({
        showAnswer: false,
        checked: false,
        showFinalScore: false,
        deck: this.props.deck,
        correct: false,
        currentIndex: 0,
        correctCount: 0,
        questionsCount: this.props.deck.contents.questions.length,
        score: 0,
        finished: false,
      });
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    const {
      deck,
      showAnswer,
      showFinalScore,
      checked,
      correct,
      finished,
      currentIndex,
      score,
      questionsCount,
    } = this.state;
    const {width} = Dimensions.get('window');
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

    if (showFinalScore) {
      return (
        <FinalScore
          score={score}
          trained={deck.contents.trained}
          average={deck.contents.average}
          onActionAfterFinished={this.onActionAfterFinished}
        />
      )
    }

    return (
      <View style={quizStyles.container}>
        {checked &&
        <Checked
          correct={correct}
          finished={finished}
          onGotoNextQuestion={this.onGotoNextQuestion}
          onFinished={this.onCheckFinalScore}
        />
        }
        <View style={quizStyles.deckNameArea}>
          <Text style={quizStyles.deckNameText}>
            {deck.contents.title}
          </Text>
        </View>
        <View style={quizStyles.progressInfoArea}>
          <View style={quizStyles.progressBarArea}>
            <View style={[quizStyles.progressBarValue, {width: this.getProgressValue()}]}>
            </View>
          </View>
        </View>
        <View style={quizStyles.progressTextArea}>
          <Text style={quizStyles.progressText}>
            {currentIndex + 1} / {questionsCount}
          </Text>
          <Text style={quizStyles.progressSubText}>
            Remaining: <Text style={quizStyles.progressRemainingValue}>{questionsCount - currentIndex} </Text>questions
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
            Current Score: {score.toFixed(2)} %
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
  return {
    actions: bindActionCreators({updateDeck}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);