import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

/*--- utils ---*/
import { checkedStyles } from '../utils/styles';

/*--- Component ---*/
import Button from './Button';

const Checked = ({onGotoNextQuestion, correct, finished, onFinished}) => {
  const correctView = (
    <View>
      <Text style={checkedStyles.correctText}>
        Yes!!
      </Text>
      <Text style={checkedStyles.description}>
        Your score is improved!!
      </Text>
    </View>
  );

  const inCorrectView = (
    <View>
      <Text style={checkedStyles.inCorrectText}>
        Oops...
      </Text>
      <Text style={checkedStyles.description}>
        Your score is downgraded...
      </Text>
    </View>
  );
  const resultView = (
    <View style={checkedStyles.resultView}>
      {finished &&
        <Text style={checkedStyles.allDoneText}>ALL DONE</Text>
      }
      {correct
        ? correctView

        : inCorrectView
      }
    </View>
  );

  const actionButton = () => {
    if(!finished) {
      return (
        <Button
          style={checkedStyles.nextButton}
          onPress={onGotoNextQuestion}
        >
          <Text style={checkedStyles.nextButtonLabel}>
            Next Question
          </Text>
        </Button>
      )
    }
    return(
      <Button
        style={checkedStyles.finishedButton}
        onPress={onFinished}
      >
        <Text style={checkedStyles.finishedButtonLabel}>
          Check your Score
        </Text>
      </Button>
    )
  };
  return (
    <View style={checkedStyles.container}>
      {resultView}
      {actionButton()}
    </View>
  )
};

Checked.propTypes = {
  onGotoNextQuestion: PropTypes.func.isRequired,
};

export default Checked;