import React, { Component } from 'react';
/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/*--- react-native ---*/
import { Animated, Text, View, Dimensions } from 'react-native';
/*--- utils ---*/
import { quizStyles } from '../utils/styles';

/*--- Components ---*/

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
      deck: this.props.deck,
      currentIndex: 0,
      currentProgress: new Animated.Value(0),
      correctCount: 0,
    };

    this.onStartPressed = this.onStartPressed.bind(this);
  }

  onStartPressed = () => {
    this.setState({
      started: true,
    })
  };

  render() {
    const {deck, finished, currentIndex, currentProgress} = this.state;
    const {width} = Dimensions.get('window');
    console.log(width);
    console.log(deck);

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
            3 / 10
          </Text>
        </View>

        <View>
          <Text>
            Quiz
          </Text>
        </View>
        <View>
          <Text>
            Button Area
          </Text>
        </View>
        <View style={quizStyles.scoreArea}>
          <Text>
            Score Area
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