import { StyleSheet } from 'react-native';
import {
  darkest_gray,
  darker_gray,
  dark_gray,
  yellow,
  green,
} from "./colors";


export const deckListStyles = StyleSheet.create({
  container: {
    backgroundColor: darker_gray,
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  }
});

export const deckItemStyles = StyleSheet.create({
  container: {
    backgroundColor: dark_gray,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    borderColor: green,
    borderWidth: 1,
  },
  title: {
    padding: 20,
  },
  titleText: {
    color: yellow,
    fontSize: 20,
  },
  subTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: darkest_gray,
    padding: 10,
    justifyContent: 'space-between',
  },
  subTitleText: {
    color: green,
  }
});
