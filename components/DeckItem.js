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
        </View>
        <View style={deckItemStyles.subTitle}>
          <Text style={deckItemStyles.subTitleText}>
            {deck.contents.trained} times trained
          </Text>
          <Text style={deckItemStyles.subTitleText}>
            avg. {deck.contents.average}% correct
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default DeckItem;


