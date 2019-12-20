import React, { Component } from 'react'
import { Layout, Colors, Screens } from '../../constants';
import { connect } from "react-redux";


import {
  Text,
} from "native-base";

import { WebView } from 'react-native';
import * as userActions from "../../actions/user";
let htmlview = require('./index.html');
import HTMLView from 'react-native-htmlview';
import WebViewBridge from 'react-native-webview-bridge';



class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}

    }

  }


  render() {


    var HtmlCode = '';

    console.log("entro1");
let VIEW = require('./index.html');
    return (

      <WebView
         
      // source={VIEW}
       
      // value={htmlContent}
        // source={{html: require('./content.js')()}}
        source={require('./index.html')}
        javaScriptEnabled={true} 
        //  source={{ html: HtmlCode }}
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