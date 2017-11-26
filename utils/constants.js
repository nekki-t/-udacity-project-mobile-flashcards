export const UDACITY_FLASHCARD_STORAGE_KEY = 'Udacity:Flashcard';
export const TEMP_DATA = [
  {
    key: 'React',
    contents: {
      title: 'React',
      questions:
        [
          {
            key: 'a',
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ],
      trained: 2,
      average: 70.3,
      cards: [],
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
            key: 'b',
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ],
      trained: 5,
      average: 65.4,
    }
  }
];
