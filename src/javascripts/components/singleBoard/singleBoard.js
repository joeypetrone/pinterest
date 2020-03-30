import pinComponent from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';
import boardsData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';

const backToBoards = () => {
  $('#boards').removeClass('hide');
  $('#single-board').addClass('hide');
  utils.printToDom('single-board', '');
};

const removePin = (e, boardId) => {
  console.log('in removePin');

  const pinId = e.target.closest('.card').id;
  pinsData.deletePin(pinId)
    .then(() => {
      boardsData.getBoardByBoardId(boardId)
        .then((board) => {
          // eslint-disable-next-line no-use-before-define
          buildSingleBoard(board);
        })
        .catch((err) => console.error('In removePin, problem finding board', err));
    })
    .catch((err) => console.error('could not delete pin', err));
};

const buildSingleBoard = (e) => {
  const boardId = e.target.closest('.card').id;

  $('#boards').addClass('hide');
  $('#single-board').removeClass('hide');

  let domString = '';

  boardsData.getBoardByBoardId(boardId)
    .then((board) => {
      domString += `<h1 class="text-center">${board.name}</h1>`;
      domString += `<p class="text-center">${board.description}</p>`;
      domString += '<button class="btn btn-danger back-to-boards-button rounded-circle mb-3 mt-2 ml-3"><i class="fas fa-arrow-left"></i></button>';
      pinsData.getPinsByBoardId(boardId)
        .then((pins) => {
          domString += '<div class="d-flex flex-wrap">';
          pins.forEach((pin) => {
            domString += pinComponent.pinMaker(pin);
          });
          domString += '</div>';
          utils.printToDom('single-board', domString);
          $('.back-to-boards-button').click(backToBoards);
          $('body').on('click', '.delete-pin', removePin(boardId));
        })
        .catch((err) => console.error('problem with single board', err));
    })
    .catch((err) => console.error('problem finding board', err));
};

export default { buildSingleBoard };
