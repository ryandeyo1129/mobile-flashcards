import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// AsyncStorage.clear()

const NOTIFICATION_KEY = 'Flashcards:notifications';

export function clearLocalNotifications () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotifications () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        const { status } = Permissions.askAsync(Permissions.NOTIFICATIONS);
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow = tomorrow.getTime() + (10 * 1000);
            let notificationDate = new Date(tomorrow);

            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Dont forget to practice today!',
                body: 'Practice makes perfect',
              },
              trigger: notificationDate
            })
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
      } else {
        console.log('DATA: ', data)
      }
    })
}