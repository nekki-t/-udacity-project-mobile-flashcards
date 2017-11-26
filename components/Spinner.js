import React from 'react';
import { View, ActivityIndicator } from 'react-native';

/*--- utils ---*/
import { spinnerStyles } from '../utils/styles';

const Spinner = ({size}) => {
  return (
    <View style={spinnerStyles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'}/>
    </View>
  )
};

export default Spinner;