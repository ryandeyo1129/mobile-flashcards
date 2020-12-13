import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { addCard } from '../actions';
import { saveCard } from '../utils/api';

export class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  submit = () => {
    const { dispatch, navigation, route } = this.props;
    const { question, answer } = this.state;
    const { title } = route.params
      
    dispatch(addCard(question, answer, title));
    saveCard(question, answer, title)
    navigation.navigate('Deck', title);
  }
  changeText1 = (question) => (
    this.setState({ question })
  )
  changeText2 = (answer) => (
    this.setState({ answer })
  )
  render() {
    const { question, answer } = this.state
    return (
      <View>
        <Text>Add Card</Text>
        <TextInput
          placeholder='Question'
          onChangeText={this.changeText1}
          value={question}
        />
        <TextInput
          placeholder='Answer'
          onChangeText={this.changeText2}
          value={answer}
        />
        <TouchableOpacity disabled={question === '' || answer === ''} onPress={this.submit}>
          <Text>Add Card</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(AddCard);