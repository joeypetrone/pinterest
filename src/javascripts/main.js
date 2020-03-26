import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import home from './components/home/home';
import boards from './components/boards/boards';
import myNavbar from './components/myNavBar/myNavbar';

import '../styles/main.scss';
import 'bootstrap';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  home.buildHome();
  boards.buildBoards();
  auth.loginButton();
  myNavbar.logoutEvent();
};

init();
