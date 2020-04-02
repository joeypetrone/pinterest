import pinComponent from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';
import singleBoardHeader from '../singleBoardHeader/singleBoardHeader';
import utils from '../../helpers/utils';
import boardsData from '../../helpers/data/boardsData';


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
      domString += '<div id="single-board-pins"></div>';

      utils.printToDom('single-board', domString);
      $('body').on('click', '.back-to-boards-button', backToBoards);
      pinsData.getPinsByBoardId(boardId)
        .then((pins) => {
          domString = pinComponent.pinMaker(pins);
          utils.printToDom('single-board-pins', domString);
          $('#single-board-pins').on('click', '.delete-pin', boardId, pinComponent.removePin);
        })
        .catch((err) => console.error('problem with get pins in single board', err));
    })
    .catch((err) => console.error('problem with get board in single board', err));
};

export default { buildSingleBoard };
