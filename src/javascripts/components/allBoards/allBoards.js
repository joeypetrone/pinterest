import firebase from 'firebase/app';
import 'firebase/auth';

import boardComponent from '../boards/boards';
import boardsData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;

  boardsData.getBoards(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="text-center">Boards</h1>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { buildBoards };
