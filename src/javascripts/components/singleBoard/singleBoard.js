import firebase from 'firebase/app';
import 'firebase/auth';

import pinComponent from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';
import singleBoardHeader from '../singleBoardHeader/singleBoardHeader';
import utils from '../../helpers/utils';
import boardsData from '../../helpers/data/boardsData';

import './singleBoard.scss';

// BACK TO BOARDS EVENT //
const backToBoardsEvent = () => {
  $('#boards').removeClass('hide');
  $('#single-board').addClass('hide');
  utils.printToDom('single-board', '');
};

// REMOVE PIN EVENT //
const removePinEvent = (e) => {
  const removePinId = e.target.closest('.card').id;
  const removePinBoardId = e.data;

  pinsData.deletePin(removePinId)
    .then(() => {
      pinsData.getPinsByBoardId(removePinBoardId)
        .then((pins) => {
          let domString = '';

          if (pins.length === 0) {
            domString += '';
          } else {
            domString += pinComponent.pinMaker(pins);
          }

          utils.printToDom('single-board-pins', domString);
        })
        .catch((err) => console.error('problem with get pins in remove pin', err));
    })
    .catch((err) => console.error('problem with delete pin in remove pin', err));
};

// MAKE PIN EVENT //
const makePinEvent = (e) => {
  e.preventDefault();
  const newPinImageUrl = $('#pin-image-url').val();
  const currentBoardId = e.target.closest('.card').id;

  if (newPinImageUrl === '') {
    // invalid input
    $('#pin-image-url').addClass('is-invalid');
    $('#pin-image-url').on('click', () => { $('#pin-image-url').removeClass('is-invalid'); });
  } else {
    const newPin = {
      imageUrl: newPinImageUrl,
      boardId: currentBoardId,
    };

    $('.new-pin-form-tag').trigger('reset');

    pinsData.addPin(newPin)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildSingleBoard(currentBoardId);
      })
      .catch((err) => console.error('problem with add pin in make pin event', err));
  }
};

// CLEAR PIN INPUT VALIDATION EVENT //
const clearPinInputValidationEvent = () => {
  $('#pin-image-url').removeClass('is-invalid');
};

// BUILD SINGLE BOARD EVENT //
const buildSingleBoardEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  // eslint-disable-next-line no-use-before-define
  buildSingleBoard(boardId);
};

// BUILD SINGLE BOARD //
const buildSingleBoard = (boardId) => {
  const myUid = firebase.auth().currentUser.uid;

  $('#boards').addClass('hide');
  $('#single-board').removeClass('hide');

  boardsData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';

      boards.forEach((board) => {
        if (board.id === boardId) {
          domString += singleBoardHeader.buildSingleBoardHeader(board);
          domString += '<div id="single-board-pins"></div>';

          utils.printToDom('single-board', domString);
          pinsData.getPinsByBoardId(boardId)
            .then((pins) => {
              domString = pinComponent.pinMaker(pins);
              utils.printToDom('single-board-pins', domString);
              $('#single-board-pins').on('click', '.delete-pin', boardId, removePinEvent);
            })
            .catch((err) => console.error('problem with get pins in single board', err));
        }
      });
    })
    .catch((err) => console.error('problem with get board in single board', err));
};

// SINGLE BOARD EVENTS //
const singleBoardEvents = () => {
  $('body').on('click', '#back-to-boards-button', backToBoardsEvent);
  $('body').on('click', '#add-pin-button', clearPinInputValidationEvent);
  $('body').on('click', '#pin-creator', makePinEvent);
};

export default { buildSingleBoardEvent, singleBoardEvents };
