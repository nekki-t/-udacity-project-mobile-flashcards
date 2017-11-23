import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StatusBar } from 'react-native';
import { Constants } from 'expo';

const FlashcardStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

FlashcardStatusBar.propTypes = {
  backgroundColor: PropTypes.object.isRequired
};

export default FlashcardStatusBar;

