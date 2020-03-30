const pinMaker = (pin) => {
  let domString = '';
  domString += '<div class="col-3">';
  domString += `<div class="card" id="${pin.id}">`;
  domString += `<img class="card-img" src="${pin.imageUrl}" alt=""/>`;
  domString += '<button class="btn btn-danger delete-pin">Delete</button>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { pinMaker };
