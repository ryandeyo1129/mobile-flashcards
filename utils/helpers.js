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
        console.log('ask permission')
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              console.log('permission granted')
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
          })
      } else {
        console.log('DATA: ', data)
      }
    })
}