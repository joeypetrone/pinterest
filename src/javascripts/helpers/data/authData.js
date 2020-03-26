import firebase from 'firebase/app';
import 'firebase/auth';

const homeDiv = $('#home');
const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeDiv.addClass('hide');
      authDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
    } else {
      homeDiv.removeClass('hide');
      authDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
