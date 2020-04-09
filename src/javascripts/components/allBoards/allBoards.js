import firebase from 'firebase/app';
import 'firebase/auth';

import boardComponent from '../boards/boards';
import newBoardComponent from '../newBoard/newBoard';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import singleBoard from '../singleBoard/singleBoard';

import utils from '../../helpers/utils';
import './allBoards.scss';

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

const makeBoard = (e) => {
  e.preventDefault();
  const newBoardName = $('#board-name').val();
  const newBoardDescription = $('#board-description').val();

  console.log('newBoardName', newBoardName);
  console.log('newBoardDescription', newBoardDescription);


  if (newBoardName === '' || newBoardDescription === '') {
    $('#board-name').addClass('is-invalid');
    $('#board-description').addClass('is-invalid');
    $('#board-name').on('click', () => $('#board-name').removeClass('is-invalid'));
    $('#board-description').on('click', () => $('#board-description').removeClass('is-invalid'));
  } else {
    const newBoard = {
      name: $('#board-name').val(),
      description: $('#board-description').val(),
      uid: firebase.auth().currentUser.uid,
    };

    $('#new-board-form').trigger('reset');

    boardsData.addBoard(newBoard)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildBoards();
      })
      .catch();
  }
};

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;

  boardsData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';

      domString += '<h1 class="text-center">Boards</h1>';
      domString += '<div class="d-flex justify-content-center mb-4">';
      domString += '<button class="btn btn-danger" type="button" data-toggle="collapse" data-target="#add-board-form" aria-expanded="false" aria-controls="addBoardsForm">Add Board</button>';
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
      $('.card').mouseenter(boardComponent.showButtons);
      $('.card').mouseleave(boardComponent.hideButtons);
    })
    .catch((err) => console.error('get boards broke', err));
};

const boardsEvents = () => {
  $('body').on('click', '.view-board', singleBoard.buildSingleBoard);
  $('body').on('click', '.delete-board', removeBoard);
  $('body').on('click', '#board-creator', makeBoard);
};

export default { buildBoards, boardsEvents };
