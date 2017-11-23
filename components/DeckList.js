import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadDeckList } from '../actions/deckActions';

import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';

/*--- utils ---*/
import { dark_gray } from '../utils/colors';
import { deckListStyles } from '../utils/styles';

class DeckList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Mobile Flashcard',
    headerTitleStyle : {
      textAlign: 'center',
      alignSelf:'center',
      fontSize: 30,
      color: 'white'
    },
    headerStyle:{
      backgroundColor: dark_gray,
    },
  });

  state = {
    init: true,
  };

  componentDidMount() {
    this.props.actions.loadDeckList();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.init &&
      this.props.loading &&
      !nextProps.loading) {
      this.setState({
        init: false,
      });
    }
  }

  render() {
    const {init} = this.state;
    return (
      <View style={deckListStyles.container}>
        {init
          ?<AppLoading />
          :<Text>
             List comes here...
            </Text>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.deck.loading,
    decks: state.deck.decks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({loadDeckList}, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DeckList);