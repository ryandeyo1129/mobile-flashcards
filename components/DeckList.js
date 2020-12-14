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
        {Object.keys(decks).map((deckTitle, id) => {
          return (
            <TouchableOpacity
              key={id}
              style={styles.deckBtn}
              onPress={() => this.deckNav(decks, deckTitle)}
            >
              <Text >{deckTitle}</Text>
              <Text>{decks[deckTitle].cards.length} CARDS</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckBtn: {
    backgroundColor: 333333,
    height: 80,
    borderRadius: 5,
    fontSize: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  return { decks: state };
}

export default connect(mapStateToProps)(DeckList);