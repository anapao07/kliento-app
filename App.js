// Imports: Dependencies
import React from 'react';
import { View, Text, Image } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';

import { StyleProvider, Root } from 'native-base';
import getTheme from './app/theme/components';
import material from './app/theme/variables/material';

// Imports: Navigation
import ReduxNavigation from './app/navigation/ReduxNavigation';

// Imports: Redux Persist Persister
import { store, persistor } from './app/store/store';
import { ApolloClient } from 'apollo-client'
import {ApolloProvider} from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://api.kliento.mx/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      'x-hasura-admin-secret': 'admin' 
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



// const client = new ApolloClient({
//   uri: 'http://api.kliento.mx/v1/graphql',
//   headers: { 'x-hasura-admin-secret': 'admin' }
// })


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

// React Native: App
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      // 'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      ...Ionicons.font,
      ...FontAwesome.font,
      ...AntDesign.font,
      'Font-Light': require('./app/assets/fonts/Montserrat-Light.ttf'),
      'Font-Regular': require('./app/assets/fonts/Montserrat-Regular.ttf'),
      'Font-Semibold': require('./app/assets/fonts/Montserrat-SemiBold.ttf'),
      'Font-Bold': require('./app/assets/fonts/Montserrat-Bold.ttf'),
      'Roboto': require('./app/assets/fonts/Roboto-Regular.ttf'),
      'Roboto_medium': require('./app/assets/fonts/Roboto-Medium.ttf'),
    });
    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading />
      );
    }
    return (

      <ApolloProvider client ={client}>

         {/* // Redux: Global Store */}
      <Provider store={store}>
        <PersistGate 
          loading={<AppLoading />}
          persistor={persistor}
        >
          <StyleProvider style={getTheme(material)}>
            <Root>
              <ReduxNavigation />
            </Root>
          </StyleProvider>
        </PersistGate>
      </Provider>
      </ApolloProvider>   
    );
  }
};