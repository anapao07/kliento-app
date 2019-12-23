import React, { Component } from 'react'
import { Layout, Colors, Screens } from '../../constants';
import { connect } from "react-redux";


import {
  Text,
} from "native-base";

import { WebView } from 'react-native';
import * as userActions from "../../actions/user";
// let htmlview = require('./index.html');
import HTMLView from 'react-native-htmlview';
import WebViewBridge from 'react-native-webview-bridge';

import { store, persistor } from '../../store/store';
import { ApolloClient } from 'apollo-client'
import {ApolloProvider} from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import storage from "../../utils/storage";

const httpLink = createHttpLink({
  uri: 'http://api.kliento.mx/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = storage.get('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      'x-hasura-admin-secret': 'admin',
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
       
      }

    }

  }


  render() {
// console.log("AQUIESTA EL ID)",this.props.navigation.state.params.id);
let ids = this.props.navigation.state.params.id;

    // const  HtmlCode = '<script type = "text/javascript" src = "./temp.js" ></script>';
    const  HtmlCode = `<html>
    <head>
      <script type = "text/javascript" src = "./temp.js" ></script>
    </head>
    <body>
      <div id="root"><h1>HOLA M</h1>
  
          
      </div>
   
    </body>
  </html>`;
    const  runFirst =`document.body.style.backgroundcolor = 'red'`;
    console.log("entro1");
let VIEW = require('../../assets/index.html');

let link= 'http://encuestas.kliento.mx.s3-website-us-east-1.amazonaws.com/#/myview/'+ids;

console.log("URL-->",link);

return (

      <WebView
         
    

      source={{uri:link }}
         // source={VIEW}
      // value={htmlContent}
        // source={{html: require('./content.js')()}}
       // source={require('./index.html')}
       
        // injecrtedJavaScript={HTMLView}
        // source={{ html: HtmlCode,baseUrl:'./' }}
        // javaScriptEnabled={true} 
        // source={htmlview}
        // originWhitelist={[' * ']}
        // source={'./index.html'}
        // //  source={{html,'<h1>Hola Mundo</h1>'}}
        // style={{ marginTop: 50 }}
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);