import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';
import { NavigationActions } from 'react-navigation';
import { getLanguage } from '../utils/common';
import Screens from "../constants/Screens";

export const signin = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  console.log('PAYLOADS', payloads)
  return axios.post(url.signin,  {payloads: payloads})
  .then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        console.log('OK', res)
        if(res.request.status==200){
          console.log('DOJAOSDJAOSDJAOSD')
          // this.props.navigation.navigate(Screens.SignInStack.route)
          // storage.set('access_token', res.data.access);
          // storage.set('refresh_token', res.data.refresh);
          // console.log('EL TOKEN', storage.get('access_token'));
          dispatch({ type: ActionTypes.SIGNIN, data: res.status });
          dispatch(NavigationActions.navigate({routeName: Screens.Home.route}))
        }
      console.log('HERE !');
        return res.data
      } else {
        return res
      }
    });
}

export const signup = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signup,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        return res;
      }
    })
}

export const logoutUser = () => dispatch => {
  return dispatch({ type: ActionTypes.LOGOUT });
  
}

export const forgotpassword = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signup,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        return res;
      }
    })  
}

export const setLanguage = payloads => dispatch => {
  dispatch({ type: ActionTypes.SHOWMODAL, showModal: false });
  return dispatch({ type: ActionTypes.LANGUAGECODE, language: getLanguage(payloads.id), languageId: payloads.id ,languageSet: payloads.set });
}
