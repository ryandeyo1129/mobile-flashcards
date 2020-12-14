import React, { Component, Button, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';

export class AddDeck extends Component {
  state = {
    title: ''
  }
  submit = () => {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    saveDeck(title)
      .then(data => {
        dispatch(addDeck(data));
        this.setState({ title: '' })
        navigation.navigate('Deck', {
          title: title,
          cards: 0
        });
      });
  }
  changeText = (title) => (
    this.setState({ title })
  )
  render() {
    const { title } = this.state
    return (
      <View>
        <TextInput
          placeholder='Enter Deck Title'
          onChangeText={this.changeText}
          value={title}
          style={styles.createDeckForm}
        />
        <TouchableOpacity disabled={title === ''} onPress={this.submit} style={styles.createDeckBtn}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  createDeckBtn: {
    backgroundColor: 333333,
    height: 45,
    borderRadius: 5,
    fontSize: 40,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createDeckForm: {
    height: 45,
    borderRadius: 5,
    fontSize: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
  }
})

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(AddDeck);