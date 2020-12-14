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
      <View style={styles.container}>
        <TextInput
          placeholder='Question'
          onChangeText={this.changeText1}
          value={question}
          style={styles.addCardForm}
        />
        <TextInput
          placeholder='Answer'
          onChangeText={this.changeText2}
          value={answer}
          style={styles.addCardForm}
        />
        <TouchableOpacity disabled={question === '' || answer === ''} onPress={this.submit} style={styles.addBtn}>
          <Text>Add Card</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  addBtn: {
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
  addCardForm: {
    height: 45,
    borderRadius: 5,
    fontSize: 30,
    marginLeft: 30,
    marginRight: 30,
  }
})

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(AddCard);