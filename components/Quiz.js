import React, { Component } from 'react';

/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*--- react-native ---*/
import { View, Text, Animated } from 'react-native';

/*--- utils ---*/
import { quizStyles } from '../utils/styles';

/*--- Components ---*/
import Progressbar from './Progressbar';

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
      currentIndex: 0,
      currentProgress: new Animated.Value(0),
    }
  }

  render() {
    const { currentIndex, currentProgress } = this.state;
    return (
      <View style={quizStyles.container}>
        <View>
          <Text>
            Progressbar
          </Text>
          <Text>
            Progress Count
          </Text>
        </View>

        <Text>
          Quiz comes here!
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);