import React, { Component } from 'react'
import { Layout, Colors, Screens } from '../../constants';
import { connect } from "react-redux";



class Survey extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       item:{}
       
     }
     
   }


   render(){
      return (
      <Text>HOLA</Text>
       
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