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

const removePin = (event) => {
  const removePinId = event.target.closest('.card').id;
  const removePinBoardId = event.data;

  console.log('board id', removePinBoardId);

  let domString = '';

  boardsData.getBoardByBoardId(removePinBoardId)
    .then((board) => {
      console.log('singleBoardHeader #2', board);
      domString += singleBoardHeader.buildSingleBoardHeader(board);
      pinsData.deletePin(removePinId)
        .then(() => {
          pinsData.getPinsByBoardId(removePinBoardId)
            .then((pins) => {
              console.log('pins in removePin', pins);
              if (pins.length === 0) {
                domString += '';
              } else {
                domString += pinComponent.pinMaker(pins);
              }

              utils.printToDom('single-board', domString);
            })
            .catch((err) => console.error('problem with get pins in remove pin', err));
        })
        .catch((err) => console.error('problem with delete pin in remove pin', err));
    })
    .catch((err) => console.error('problem with get board in remove pin', err));
};

const buildSingleBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  console.log('in single board', boardId);


  $('#boards').addClass('hide');
  $('#single-board').removeClass('hide');

  let domString = '';

  boardsData.getBoardByBoardId(boardId)
    .then((board) => {
      console.log('singleBoardHeader #1', board);
      domString += singleBoardHeader.buildSingleBoardHeader(board);
      pinsData.getPinsByBoardId(boardId)
        .then((pins) => {
          domString += pinComponent.pinMaker(pins);

          utils.printToDom('single-board', domString);
          $('body').on('click', '.back-to-boards-button', backToBoards);

          $('#single-board').on('click', '.delete-pin', boardId, removePin);
        })
        .catch((err) => console.error('problem with get pins in single board', err));
    })
    .catch((err) => console.error('problem with get board in single board', err));
};

export default { buildSingleBoard };
