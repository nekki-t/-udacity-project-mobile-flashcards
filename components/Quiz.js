import React, { Component } from 'react';

/*--- redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*--- react-native ---*/
import { View, Text } from 'react-native';

class Quiz extends Component {

  render() {
    return (
      <View>
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