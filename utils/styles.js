import { StyleSheet } from 'react-native';
import {
  black,
  blue,
  dark_gray,
  darker_gray,
  darkest_gray,
  green,
  pink,
  yellow,
  white,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonDisabledColor,
  buttonTextColor,
} from "./colors";

export const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
  }
});

export const spinnerStyles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.9)'
  }
});

export const buttonStyles = StyleSheet.create({
  button: StyleSheet.flatten([commonStyles.shadow,
    {
      borderStyle: 'solid',
      backgroundColor: buttonBackgroundColor,
      paddingVertical: 8,
      paddingHorizontal: 15,
    }
  ]),
  disabledButton: {
    borderColor: buttonDisabledColor,
  },
  text: {
    color: buttonTextColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: buttonDisabledColor,
  }
});

export const navigationCommonStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: darkest_gray,
    paddingBottom: 10,
  },
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: pink,
  },
});

export const containerCommonStyles = StyleSheet.create({
  container: {
    backgroundColor: darker_gray,
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  }
});

export const deckCommonStyles = StyleSheet.create({
  deck: StyleSheet.flatten([ commonStyles.shadow,
    {
      backgroundColor: dark_gray,
      marginBottom: 10,
      borderColor: green,
      borderWidth: 1,
    }
  ]),
  details: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: darkest_gray,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    padding: 10,
  },
  titleText: {
    color: yellow,
    fontSize: 20,
  },
  subTitleText: {
    color: green,
  }
});

/* === < DeckList > =================================================================== */
export const deckListStyles = StyleSheet.create({
  headerStyle: StyleSheet.flatten([navigationCommonStyles.headerStyle])
  ,
  headerTitleStyle: StyleSheet.flatten([navigationCommonStyles.headerTitleStyle])
  ,
  container: StyleSheet.flatten([containerCommonStyles.container]),
  addButton: StyleSheet.flatten([commonStyles.shadow,{
    width: 60,
    height: 60,
    backgroundColor: buttonBackgroundColor,
    borderRadius: 50,
    position: 'absolute',
    right: 10,
    bottom: 20,
    zIndex: 1000,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },])
});


/* === < DeckItem > =================================================================== */
export const deckItemStyles = StyleSheet.create({
  container: StyleSheet.flatten([deckCommonStyles.deck], {
    alignSelf: 'stretch',
  }),
  title: StyleSheet.flatten([deckCommonStyles.title]),
  titleText: StyleSheet.flatten([deckCommonStyles.titleText]),
  details:  StyleSheet.flatten([deckCommonStyles.details]),
  subTitleText: StyleSheet.flatten([deckCommonStyles.subTitleText]),
  cardCount: {
    fontSize: 12,
    color: white,
    textAlign: 'right',
  }
});

/* === < Deck > =================================================================== */
export const deckStyles = StyleSheet.create({
  headerStyle: StyleSheet.flatten([navigationCommonStyles.headerStyle,])
  ,
  headerTitleStyle: StyleSheet.flatten([navigationCommonStyles.headerTitleStyle,
    {
      color: green,
    }
  ])
  ,
  container: StyleSheet.flatten([containerCommonStyles.container,
    {
      padding: 20,
      justifyContent: 'flex-start',
    }
  ]),
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});

/* === < New Deck > =================================================================== */
export const newDeckStyles = StyleSheet.create({
  headerStyle: StyleSheet.flatten([navigationCommonStyles.headerStyle,]),
  headerTitleStyle: StyleSheet.flatten([navigationCommonStyles.headerTitleStyle,
    {
      color: green,
    }
  ]),
  container: StyleSheet.flatten([containerCommonStyles.container,
    {
      padding: 20,
      justifyContent: 'flex-start',
    }
  ]),
  label: {
    fontSize: 30,
    color: white,
    padding: 20,
  },
  input: {
    fontSize: 20,
    backgroundColor: '#ccc',
    padding: 20,
  },
  addButton: {
    marginTop: 10,
  }
});

/* === < New Card > =================================================================== */
export const newQuestionStyles = StyleSheet.create({
  headerStyle: StyleSheet.flatten([navigationCommonStyles.headerStyle,]),
  headerTitleStyle: StyleSheet.flatten([navigationCommonStyles.headerTitleStyle,
    {
      color: green,
    }
  ]),
  container: StyleSheet.flatten([containerCommonStyles.container,
    {
      padding: 10,
      justifyContent: 'flex-start',
    }
  ]),
  label: {
    fontSize: 15,
    color: white,
    padding: 10,
  },
  input: {
    fontSize: 15,
    backgroundColor: '#ccc',
    padding: 5,
    height: 100,
  },
  addButton: {
    marginTop: 10,
  },
});

/* === < QuestionItem > =================================================================== */
export const questionItemStyles = StyleSheet.create({
  container: {
    backgroundColor: dark_gray,
    marginBottom: 10,
    borderColor: white,
    height: 170,
    borderWidth: 1,
    padding: 20,
    backfaceVisibility: 'hidden',
  },
  backSide: {
    backgroundColor: white,
  },
  titleText: {
    color: white,
    fontSize: 20,
  },
  backSideText: {
    color: black,
    fontSize: 20,
  },
});

/* === < Quiz > =================================================================== */
export const quizStyles = StyleSheet.create({
  headerStyle: StyleSheet.flatten([navigationCommonStyles.headerStyle,]),
  headerTitleStyle: StyleSheet.flatten([navigationCommonStyles.headerTitleStyle,
    {
      color: white,
    }
  ]),
  container: StyleSheet.flatten([containerCommonStyles.container,
    {
      padding: 10,
      justifyContent: 'flex-start',
    }
  ]),
  progressInfoArea: {
    alignItems: 'center',
  },
  progressBarArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: darkest_gray,
    position: 'absolute',
    top: 15,
    left: 10,
    right: 10,
    padding: 0,
    borderRadius: 30,
  },
  progressBarValue: {
    backgroundColor: pink,
    height: 10,
    width: 200,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 30,
  },
  progressTextArea: {
    marginTop: 30,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 20,
    color: pink,
  },
  deckNameArea: {
    backgroundColor: darkest_gray,
    borderColor: white,
    borderWidth: 1,
    padding: 10,
  },
  deckNameText: {
    color: yellow,
    textAlign: 'center',
    fontSize: 30,
  },
  scoreArea: {
    backgroundColor: darkest_gray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
  }

});

/* === < Progressbar > =================================================================== */