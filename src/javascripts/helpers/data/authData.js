import firebase from 'firebase/app';
import 'firebase/auth';

import allBoards from '../../components/allBoards/allBoards';
import utils from '../utils';

const homeDiv = $('#home');
const authDiv = $('#auth');
const boardsDiv = $('#boards');
const singleBoardDiv = $('#single-board');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeDiv.addClass('hide');
      authDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      allBoards.buildBoards();
    } else {
      homeDiv.removeClass('hide');
      authDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
      singleBoardDiv.addClass('hide');
      utils.printToDom('single-board', '');
    }
  });
};

export default { checkLoginStatus };
