import { AsyncStorage } from 'react-native';
import { TEMP_DATA, UDACITY_FLASHCARD_STORAGE_KEY } from './constants';

class FlashcardApi {
  static getDecks() {
    // return AsyncStorage.clear();

    return AsyncStorage.getItem(UDACITY_FLASHCARD_STORAGE_KEY)
      .then((result) => {
        let data = JSON.parse(result);
        if (data) {
          return data;
        } else {
          return AsyncStorage.setItem(UDACITY_FLASHCARD_STORAGE_KEY, JSON.stringify(TEMP_DATA))
            .then(() => {
                return TEMP_DATA
              }
            )
        }
      })
  }


  static getDeck(id) {

  }

  static saveDeckTitle(title) {

  }

  static addCardToDeck(title, card) {

  }
}

export default FlashcardApi;