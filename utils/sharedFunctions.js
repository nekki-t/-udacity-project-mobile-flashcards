import shortId from 'shortid';
import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'Udacity:notifications';

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
  static clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync);
  }

  static createNotification() {
    return {
      title: 'I miss you!',
      body: " 👋 It is important for you to study every day!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        vibrate: true,
      }
    }
  }

  static setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync();

                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  this.createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              }
            })
        }
      })
  }
}

export default SharedFunctions;