import React from 'react';
import PropTypes from 'prop-types';

import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

/*--- Utils ---*/
import { buttonStyles } from '../utils/styles';

const Button = ({style, active, onPress, children, ...rest}) => (
  <TouchableOpacity
    activeOpacity={active ? 0.7 : 1}
    onPress={active? onPress: null}
    { ...rest }
    style={[buttonStyles.button, style, !active ? buttonStyles.buttonDisabled: {}]}
  >
    <Text
      style={[buttonStyles.text, !active ? buttonStyles.disabledText : {}]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  active: PropTypes.bool,
  style: View.propTypes.style,
  onPress: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  active: true
};

export default Button;