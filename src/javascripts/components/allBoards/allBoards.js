import firebase from 'firebase/app';
import 'firebase/auth';

import boardComponent from '../boards/boards';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import singleBoard from '../singleBoard/singleBoard';

import utils from '../../helpers/utils';

const removeBoard = (e) => {
  const selectedBoardId = e.target.closest('.card').id;

  boardsData.deleteBoard(selectedBoardId)
    .then(() => {
      pinsData.getPinsByBoardId(selectedBoardId)
        .then((pins) => {
          pins.forEach((pin) => {
            pinsData.deletePin(pin.id);
          });
          // eslint-disable-next-line no-use-before-define
          buildBoards();
        })
        .catch((err) => console.error('problem with get pins in remove board', err));
    })
    .catch((err) => console.error('problem with delete board in remove board', err));
};

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;

  boardsData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="text-center mb-4">Boards</h1>';
      domString += '<div id="boards-container" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.view-board', singleBoard.buildSingleBoard);
      $('body').on('click', '.delete-board', removeBoard);
      $('.card').mouseenter(boardComponent.showButtons);
      $('.card').mouseleave(boardComponent.hideButtons);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { buildBoards };
