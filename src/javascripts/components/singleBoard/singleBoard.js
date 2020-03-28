import pinComponent from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';

const buildSingleBoard = (e) => {
  const boardId = e.target.closest('.card').id;

  $('#boards').addClass('hide');
  $('#single-board').removeClass('hide');

  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      let domString = '';

      domString += '<div class="d-flex flex-wrap">';
      pins.forEach((pin) => {
        domString += pinComponent.pinMaker(pin);
      });

      domString += '</div>';
      utils.printToDom('single-board', domString);
    })
    .catch((err) => console.error('problem with single board', err));
};

export default { buildSingleBoard };
