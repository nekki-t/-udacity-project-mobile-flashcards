import shortId from 'shortid';

class SharedFunctions {
  static generateNewDeck(title) {
    return {
      key: shortId.generate(),
      contents: {
        title,
        questions: [],
        trained: 0,
        average: 0.0,
      }
    }
  }

  static generateNewQuestion(question, answer) {
    return {
      question,
      answer,
      correct: 0,
      incorrect: 0,
    }
  }
}

export default SharedFunctions;