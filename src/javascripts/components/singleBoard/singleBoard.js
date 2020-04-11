import pinComponent from '../pins/pins';
import newPinComponent from '../newPin/newPin';
import pinsData from '../../helpers/data/pinsData';
import singleBoardHeader from '../singleBoardHeader/singleBoardHeader';
import utils from '../../helpers/utils';
import boardsData from '../../helpers/data/boardsData';

import './singleBoard.scss';

const backToBoards = () => {
  $('#boards').removeClass('hide');
  $('#single-board').addClass('hide');
  utils.printToDom('single-board', '');
};

const buildSingleBoard = (e) => {
  const boardId = e.target.closest('.card').id;

  $('#boards').addClass('hide');
  $('#single-board').removeClass('hide');

  boardsData.getBoardByBoardId(boardId)
    .then((board) => {
      let domString = '';

      domString += singleBoardHeader.buildSingleBoardHeader(board);
      domString += '<div class="d-flex justify-content-center mb-4" id="add-pin-container">';
      domString += '<button class="btn btn-danger" type="button" data-toggle="collapse" data-target="#add-pin-form" aria-expanded="false" aria-controls="addPinsForm">Add Pin</button>';
      domString += '</div>';
      domString += '<div class="collapse" id="add-pin-form">';
      domString += newPinComponent.newPinForm(boardId);
      domString += '</div>';
      domString += '<div id="single-board-pins"></div>';

      utils.printToDom('single-board', domString);
      pinsData.getPinsByBoardId(boardId)
        .then((pins) => {
          domString = pinComponent.buildPins(pins);
          utils.printToDom('single-board-pins', domString);
          $('#single-board-pins').on('click', '.delete-pin', boardId, pinComponent.removePin);
        })
        .catch((err) => console.error('problem with get pins in single board', err));
    })
    .catch((err) => console.error('problem with get board in single board', err));
};

const pinsEvents = () => {
  $('body').on('click', '#back-to-boards-button', backToBoards);
  $('body').on('click', '#pin-creator', pinComponent.makePin);
};

export default { buildSingleBoard, pinsEvents };
