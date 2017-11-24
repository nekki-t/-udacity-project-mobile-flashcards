import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadDeckList } from '../actions/deckActions';

import { Animated, FlatList, Text, View, } from 'react-native';
import { AppLoading } from 'expo';
/*--- utils ---*/
import { darkest_gray, dark_gray, pink } from '../utils/colors';
import { deckListStyles } from '../utils/styles';
import DeckItem from "./DeckItem";

/*--- Components ---*/

class DeckList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Mobile Flashcard',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 30,
      color: pink,
    },
    headerStyle: {
      backgroundColor: darkest_gray,
      paddingBottom: 10,
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      init: true,
      animatedValue: new Animated.Value(0),
      decs: {},
    };

    this.renderItem = this.renderItem.bind(this);
    this.onPressDeck = this.onPressDeck.bind(this)
  }


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
    if (this.props.decks !== nextProps.decks) {
      this.setState({
        decks: Object.assign([], nextProps.decs),
      })
    }
  }

  onPressDeck = (deck) => {
    console.log(deck);
    this.props.navigation.navigate('Deck');
  };

  renderItem = (data) => {
    return (
      <DeckItem deck={data.item} onPress={this.onPressDeck}/>
    );
  };


  render() {
    const {init} = this.state;
    if (init) {
      return <AppLoading/>
    }

    return (
      <View style={deckListStyles.container}>
        {this.props.decks
          ? <FlatList
            data={this.props.decks}
            renderItem={this.renderItem}
          />
          : <Text>
            loading...
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