import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { Ionicons } from '@expo/vector-icons'

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz'

const store = createStore(reducer, middleware);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Home extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Deck List'
          component={DeckList}
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-card" size={30} />
            )
          }}
        />
        <Tab.Screen
          name='Add Deck'
          component={AddDeck}
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-add" size={30} />
            )
          }}
        />
      </Tab.Navigator>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DeckList" component={DeckList} />
            <Stack.Screen name="AddDeck" component={AddDeck} />
            <Stack.Screen name="Deck" component={Deck} />
            <Stack.Screen name="Add Card" component={AddCard} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
