import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

export class Quiz extends Component {
  state = {
    currentCardCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    totalCount: 0,
    showAnswer: false
  }
  correct = () => {
    this.setState((prevState) => ({
      currentCardCount: prevState.currentCardCount + 1,
      showAnswer: false,
      correctCount: prevState.correctCount + 1,
      totalCount: prevState.totalCount + 1
    }));
  }
  incorrect = () => {
    this.setState((prevState) => ({
      currentCardCount: prevState.currentCardCount + 1,
      showAnswer: false,
      incorrectCount: prevState.correctCount + 1,
      totalCount: prevState.totalCount + 1
    }));
  }
  reset = () => {
    this.setState({
      currentCardCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      totalCount: 0,
      showAnswer: false
    });
  }
  deckNav = () => {
    const { decks, navigation } = this.props;
    const { title } = this.props.route.params;
    const deck = decks[title];

    this.reset;

    navigation.navigate('Deck', deck);
  }
  render() {
    const { decks } = this.props;
    const { title } = this.props.route.params;
    const deck = decks[title];

    if (deck.cards.length === 0) {
      return (
        <View>
          <Text>No cards, add a card to take the quiz</Text>
        </View>
      )
    }
    if (this.state.currentCardCount < deck.cards.length) {
      return (
        <View>
          <Text>quiz</Text>
          <Text>Question: {deck.cards[this.state.currentCardCount].question}</Text>
          {!this.state.showAnswer
            ? <TouchableOpacity onPress={() => this.setState({ showAnswer: true })}>
                <Text>Show Answer</Text>
              </TouchableOpacity>
            : <Text>Answer: {deck.cards[this.state.currentCardCount].answer}</Text>
          }
          <TouchableOpacity onPress={this.correct}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.incorrect}>
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View>
        <Text>Final Score: {this.state.correctCount} / {this.state.totalCount}</Text>
        <TouchableOpacity onPress={this.reset}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deckNav}>
          <Text>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return { decks: state };
}

export default connect(mapStateToProps)(Quiz)