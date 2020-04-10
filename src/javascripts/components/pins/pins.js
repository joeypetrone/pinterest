import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './pins.scss';

const removePin = (e) => {
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
            // eslint-disable-next-line no-use-before-define
            domString += pinMaker(pins);
          }

          utils.printToDom('single-board-pins', domString);
        })
        .catch((err) => console.error('problem with get pins in remove pin', err));
    })
    .catch((err) => console.error('problem with delete pin in remove pin', err));
};

const pinMaker = (pins) => {
  let domString = '';

  domString += '<div id="pin-container" class="d-flex flex-wrap pl-3 pr-3">';

  pins.forEach((pin) => {
    domString += '<div class="col-md-3 pl-2 pr-2 pb-4">';
    domString += `<div class="card" id="${pin.id}">`;
    domString += `<img class="card-img" src="${pin.imageUrl}" alt=""/>`;
    domString += '<button class="btn btn-danger delete-pin">Delete</button>';
    domString += '</div>';
    domString += '</div>';
  });

  domString += '</div>';

  return domString;
};

export default { pinMaker, removePin };
