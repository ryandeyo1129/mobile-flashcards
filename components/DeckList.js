import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, initializeData } from '../utils/api';
import { handleInitialData, receiveDecks } from '../actions';


export class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleInitialData())
    
    getDecks().then(decks => {
      if (decks === null || undefined) {
        initializeData({});
        dispatch(receiveDecks({}));
      } else {
        dispatch(receiveDecks(decks))
      }
    });
  }
  deckNav = (decks, deckTitle) => {
    const { navigation } = this.props

    navigation.navigate('Deck', decks[deckTitle]);
  }
  render() {
    const { decks } = this.props;
    return (
      <View>
        <Text>deck list</Text>
        {Object.keys(decks).map((deckTitle, id) => {
          return (
            <TouchableOpacity key={id} onPress={() => this.deckNav(decks, deckTitle)}>
              <Text>{deckTitle} {decks[deckTitle].cards.length}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { decks: state };
}

export default connect(mapStateToProps)(DeckList);