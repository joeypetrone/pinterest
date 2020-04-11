import firebase from 'firebase/app';
import 'firebase/auth';

import boardComponent from '../boards/boards';
import newBoardComponent from '../newBoard/newBoard';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import singleBoard from '../singleBoard/singleBoard';

import utils from '../../helpers/utils';
import './allBoards.scss';

// REMOVE BOARD EVENT //
const removeBoardEvent = (e) => {
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

// MAKE BOARD EVENT //
const makeBoardEvent = (e) => {
  e.preventDefault();
  const newBoardName = $('#board-name').val();
  const newBoardDescription = $('#board-description').val();

  if (newBoardName === '' || newBoardDescription === '') {
    // invalid input
    $('#board-name').addClass('is-invalid');
    $('#board-description').addClass('is-invalid');
    $('#board-name').on('click', () => $('#board-name').removeClass('is-invalid'));
    $('#board-description').on('click', () => $('#board-description').removeClass('is-invalid'));
  } else {
    const newBoard = {
      name: newBoardName,
      description: newBoardDescription,
      uid: firebase.auth().currentUser.uid,
    };

    $('#new-board-form').trigger('reset');

    boardsData.addBoard(newBoard)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildBoards();
      })
      .catch((err) => console.error('problem with add board in make board', err));
  }
};

// CLEAR BOARD INPUT VALIDATION EVENT //
const clearBoardInputValidationEvent = () => {
  $('#board-name').removeClass('is-invalid');
  $('#board-description').removeClass('is-invalid');
};

// BUILD BOARDS //
const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;

  boardsData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';

      domString += '<h1 class="text-center">Boards</h1>';
      domString += '<div class="d-flex justify-content-center mb-4">';
      domString += '<button class="btn btn-danger" id="add-board-button" type="button" data-toggle="collapse" data-target="#add-board-form" aria-expanded="false" aria-controls="addBoardsForm">Add Board</button>';
      domString += '</div>';
      domString += '<div class="collapse" id="add-board-form">';
      domString += newBoardComponent.newBoardForm();
      domString += '</div>';
      domString += '<div id="boards-container" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('get boards broke', err));
};

// BOARDS EVENTS //
const boardsEvents = () => {
  $('body').on('click', '.view-board', singleBoard.buildSingleBoardEvent);
  $('body').on('click', '.delete-board', removeBoardEvent);
  $('body').on('click', '#add-board-button', clearBoardInputValidationEvent);
  $('body').on('click', '#board-creator', makeBoardEvent);
};

export default { buildBoards, boardsEvents };
