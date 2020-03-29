const pinMaker = (pin) => {
  let domString = '';
  domString += '<div class="col-3">';
  domString += '<div class="card">';
  domString += `<img class="card-img" src="${pin.imageUrl}" alt=""/>`;
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { pinMaker };
