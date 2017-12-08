import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from './reducers';
import { setItems } from './actions/items'

import Realm from 'realm';

const middlewares = [];
const reduxInvariant = require('redux-immutable-state-invariant');
middlewares.push(reduxInvariant.default());
store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
const dispatch = store.dispatch;

const styles = StyleSheet.create({
  button1: {
    marginLeft: 100,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    backgroundColor: '#F00',
  },
  button2: {
    marginLeft: 100,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    backgroundColor: '#0F0',
  },
});

class Item {
  static schema: UserSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', default: ''},
    }
  }
}

const addItemToRealm = () => {
  const id = new Date().toISOString();
  const realm = new Realm({schema: [Item]});
  realm.write(() => {
    realm.create('Item', { id });
  })
};

const loadItemsToStateFromRealm = () => {
  const realm = new Realm({schema: [Item]});
  const items = realm.objects('Item');
  console.log(items);
  const action = setItems(items);
  dispatch(action);
}

export default class App extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={addItemToRealm}>
          <View style={styles.button1}>
            <Text>Tap here to add item</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={loadItemsToStateFromRealm}>
          <View style={styles.button2}>
            <Text>Tap here to load item</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
