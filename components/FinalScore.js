import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

/*--- utils ---*/
import { finalScoreStyles } from '../utils/styles';

/*--- Component ---*/
import Button from './Button';


const FinalScore = ({score, trained, average, onActionAfterFinished}) => {

  const resultIcon = () => {
    if (score > 70) {
      return <FontAwesome name='smile-o' size={200} style={{color: '#fff'}}/>
    } else if (score > 50) {
      return <FontAwesome name='meh-o' size={200} style={{color: '#fff'}}/>
    } else {
      return <FontAwesome name='frown-o' size={200} style={{color: '#fff'}}/>
    }
  };

  return (
    <View style={finalScoreStyles.container}>
      {resultIcon()}
      <View style={finalScoreStyles.scoreInfoArea}>
        <Text style={finalScoreStyles.scoreText}>Score: <Text
          style={finalScoreStyles.scoreValue}>{score.toFixed(2)}</Text> %</Text>
        <Text style={finalScoreStyles.scoreText}>Total Trained Count: <Text
          style={finalScoreStyles.scoreValue}>{trained}</Text> times</Text>
        <Text style={finalScoreStyles.scoreText}>Average Score: <Text
          style={finalScoreStyles.scoreValue}>{average.toFixed(2)}</Text> %</Text>
      </View>

      <View style={finalScoreStyles.actionArea}>
        <Button
          style={finalScoreStyles.button}
          onPress={() => onActionAfterFinished(false)}
        >
          <Text style={finalScoreStyles.buttonLabel}>Back to Deck</Text>
        </Button>
        <Button
          style={finalScoreStyles.button}
          onPress={() => onActionAfterFinished(true)}
        >
          <Text style={finalScoreStyles.buttonLabel}>Restart Quiz</Text>
        </Button>
      </View>
    </View>
  )
};

export default FinalScore;