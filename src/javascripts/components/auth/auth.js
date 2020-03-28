import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  let domString = '';
  domString += '<div class="d-flex justify-content-center">';
  domString += '  <button id="google-auth" class="btn btn-danger">Google Login</button>';
  domString += '</div>';

  utils.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
