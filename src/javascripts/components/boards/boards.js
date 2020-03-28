const boardMaker = (board) => {
  let domString = '';
  domString += '<div class="col-4">';
  domString += `<div class="card" id="${board.id}">`;
  domString += `<div class="card-header">${board.name}</div>`;
  domString += '<div class="card-body">';
  domString += '<h6 class="card-title">Description</h6>';
  domString += `<p class="card-text">${board.description}</p>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { boardMaker };
