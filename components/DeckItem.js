import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
/*--- utils ---*/
import { deckItemStyles } from '../utils/styles';

const DeckItem = ({deck, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(deck)} >
      <View style={deckItemStyles.container}>
        <View style={deckItemStyles.title}>
          <Text style={deckItemStyles.titleText}>
            {deck.contents.title}
          </Text>
          <Text style={deckItemStyles.cardCount}>
            {deck.contents.questions.length} cards
          </Text>
        </View>
        <View style={deckItemStyles.details}>
          <Text style={deckItemStyles.subTitleText}>
            {deck.contents.trained} times trained
          </Text>
          <Text style={deckItemStyles.subTitleText}>
            avg. {deck.contents.average.toFixed(2)}% correct
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default DeckItem;


