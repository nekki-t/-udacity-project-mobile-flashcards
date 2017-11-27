import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadDeckList } from '../actions/deckActions';

import { Animated, FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
/*--- utils ---*/
import { white } from '../utils/colors';
import { deckListStyles } from '../utils/styles';
import DeckItem from "./DeckItem";

/*--- Components ---*/
import Spinner from './Spinner';

class DeckList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Mobile Flashcard',
    headerTitleStyle: deckListStyles.headerTitleStyle,
    headerStyle: deckListStyles.headerStyle,
  });

  constructor(props) {
    super(props);

    this.state = {
      init: true,
      animatedValue: new Animated.Value(0),
      decs: {},
    };

    this.renderItem = this.renderItem.bind(this);
    this.onPressDeck = this.onPressDeck.bind(this);
    this.onPressAdd = this.onPressAdd.bind(this);
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
    this.props.navigation.navigate('Deck', {deck});
  };

  onPressAdd = () => {
    this.props.navigation.navigate('NewDeck');
  };

  renderItem = (data) => {
    return (
      <DeckItem deck={data.item} onPress={this.onPressDeck}/>
    );
  };

  render() {
    const {init} = this.state;
    const {loading} = this.state;
    if (init || loading) {
      return <Spinner size='large'/>
    }

    return (
      <View style={deckListStyles.container}>
        {this.props.decks
          ? <FlatList
            data={this.props.decks}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
          : <Text>
            loading...
          </Text>
        }
        <TouchableOpacity
          onPress={this.onPressAdd}
        >
          <View style={deckListStyles.addButton}>
            {Platform.OS === 'ios'
              ? <Ionicons name='ios-add-outline' size={40} color={white}/>
              : <MaterialIcons name='md-add' size={40} color={white}/>
            }
          </View>
        </TouchableOpacity>
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