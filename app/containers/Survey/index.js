import React, { Component } from 'react'
import { Layout, Colors, Screens } from '../../constants';
import { connect } from "react-redux";

 
import {
    Text,
} from "native-base";

import {WebView} from 'react-native';
import * as userActions from "../../actions/user";
let htmlview = require('./index.html');



class Survey extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       item:{}
       
     }
     
   }


   render(){
    
    console.log("entro1");
      return (
        
         <WebView
         
        source={{html: require('./foobar.js')()}}
          // source={htmlview}
        //  source={require('./index.html')}
        //  source={{html,'<h1>Hola Mundo</h1>'}}
         style={{marginTop: 50}}
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