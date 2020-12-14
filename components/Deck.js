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
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.cards}>{deck.cards.length} CARDS</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Add Card', deck)} style={styles.optionBtn}>
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz', deck)} style={styles.optionBtn}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeAndNavigate} style={styles.optionBtn}>
        <Text>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginLeft: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    marginLeft: 30
  },
  optionBtn: {
    backgroundColor: 333333,
    height: 45,
    borderRadius: 5,
    fontSize: 40,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  return { decks: state };
}

export default connect(mapStateToProps)(Deck);