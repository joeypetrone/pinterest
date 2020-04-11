import './pins.scss';

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

export default { pinMaker };
