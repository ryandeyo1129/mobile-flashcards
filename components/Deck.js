import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteDeck } from '../utils/api';
import { removeDeck } from '../actions';

export function Deck ({ route, navigation, decks, dispatch }) {
  const { title } = route.params;
  let deck = decks[title];

  const removeAndNavigate = () => {
    deleteDeck(title)
      .then(() => {
        dispatch(removeDeck(title));
        navigation.navigate('DeckList');
      })
  }

  if (deck === undefined) {
    return (
      <View>
        <Text>DECK DELETED</Text>
      </View>
    )
  }
  return (
    <View>
      <Text>{deck.title}</Text>
      <Text>{deck.cards.length} cards</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddCard', deck)}>
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz', deck)}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeAndNavigate}>
        <Text>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state) => {
  return { decks: state };
}

export default connect(mapStateToProps)(Deck);