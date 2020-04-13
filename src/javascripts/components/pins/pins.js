import './pins.scss';

const pinMaker = (pins, boards, boardId) => {
  let domString = '';

  domString += '<div id="pin-container" class="d-flex flex-wrap pl-3 pr-3">';

  pins.forEach((pin) => {
    domString += `<div class="single-pin col-md-3 pl-2 pr-2 pb-4" id="${boardId}">`;
    domString += `<div class="card" id="${pin.id}">`;
    domString += `<img class="card-img" id="image-id" src="${pin.imageUrl}" alt=""/>`;
    domString += '<div class="inline-buttons">';
    domString += '<button class="btn btn-danger delete-pin">Delete</button>';

    domString += '<div class="move-pin-dropdown">';
    domString += '<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Move to</button>';
    domString += '<div class="dropdown-menu">';

    boards.forEach((board) => {
      if (board.id !== boardId) {
        domString += `<option class="dropdown-item" id="${board.id}" value="${board.name}">${board.name}</option>`;
      }
    });

    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });

  domString += '</div>';

  return domString;
};

export default { pinMaker };
