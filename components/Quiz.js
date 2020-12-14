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
          <Text style={styles.questionTitle}>Question:</Text>
          <Text style={styles.question}>{deck.cards[this.state.currentCardCount].question}</Text>
          {!this.state.showAnswer
            ? <TouchableOpacity onPress={() => this.setState({ showAnswer: true })} style={[styles.btn, styles.optionColor]}>
                <Text>Show Answer</Text>
              </TouchableOpacity>
            : <Text style={styles.answer}>{deck.cards[this.state.currentCardCount].answer}</Text>
          }
          <TouchableOpacity onPress={this.correct} style={[styles.btn, styles.correct]}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.incorrect} style={[styles.btn, styles.incorrect]}>
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.answer}>Final Score: {this.state.correctCount} / {this.state.totalCount}</Text>
        <TouchableOpacity onPress={this.reset} style={[styles.btn, styles.optionColor]}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deckNav} style={[styles.btn, styles.optionColor]}>
          <Text>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  questionTitle: {
    marginLeft: 30,
    marginTop: 20,
  },
  question: {
    marginLeft: 30,
    fontSize: 30
  },
  answer: {
    height: 45,
    borderRadius: 5,
    fontSize: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  btn: {
    height: 45,
    borderRadius: 5,
    fontSize: 40,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionColor: {
    backgroundColor: 333333
  },
  correct: {
    backgroundColor: 'green'
  },
  incorrect: {
    backgroundColor: 'red'
  }
})

function mapStateToProps (state) {
  return { decks: state };
}

export default connect(mapStateToProps)(Quiz)