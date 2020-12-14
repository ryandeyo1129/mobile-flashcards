import AsyncStorage from '@react-native-community/async-storage';

const DECK_STORAGE_KEY = 'Flashcards:decks'

export function saveCard (question, answer, title) {
  const data = {
    question: question,
    answer: answer,
    title: title
  }

  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(storage => {
      const prevStorage = JSON.parse(storage);
      const newStorage = {
        ...prevStorage,
        [data.title]: {
          ...prevStorage[data.title],
          cards: prevStorage[data.title].cards.concat(data)
        }
      }
      return newStorage
    })
    .then(newStorage => {
      return AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify(newStorage)
      )
    })
    .then(() => AsyncStorage.getItem(DECK_STORAGE_KEY))
    .then(result => {
      return JSON.parse(result);
    })
}

export function saveDeck (title, cards = []) {
  const data = {
    [title]: {
      title: title,
      cards: cards
    }
  }

  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify(data)
  )
    .then(() => AsyncStorage.getItem(DECK_STORAGE_KEY))
    .then(result => {
      return JSON.parse(result);
    })
}

export const getDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(data => {
      return JSON.parse(data)
    })
}

export const initializeData = data => {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
}

export const deleteDeck = (title) => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}