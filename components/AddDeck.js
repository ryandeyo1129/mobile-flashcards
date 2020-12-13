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
        <Text>Add Title</Text>
        <TextInput
          placeholder='Add Title'
          onChangeText={this.changeText}
          value={title}
        />
        <TouchableOpacity disabled={title === ''} onPress={this.submit}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(AddDeck);