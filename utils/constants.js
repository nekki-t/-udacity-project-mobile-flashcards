export const UDACITY_FLASHCARD_STORAGE_KEY = 'Udacity:Flashcard';
export const TEXT_LIMIT = {
  DeckTitle: 30,
  Question: 100,
  Answer: 100,
};

/*--- Default Sample Decks ---*/
export const TEMP_DATA = [
  {
    key: 'React',
    contents: {
      title: 'React',
      questions:
        [
          {
            key: '1',
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            key: '2',
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ],
      trained: 0,
      average: 0,
    }
  }
  ,
  {
    key: 'JavaScript',
    contents: {
      title: 'JavaScript',
      questions:
        [
          {
            key: '1',
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ],
      trained: 0,
      average: 0,
    }
  }
];
