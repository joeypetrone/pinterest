import './boards.scss';

const boardMaker = (board) => {
  let domString = '';
  domString += '<div class="col-md-4 mb-4">';
  domString += `<div class="card board-card"  id="${board.id}">`;
  domString += `<div class="card-header">${board.name}<button id="delete-${board.id}" class="btn btn-danger delete-board rounded-circle float-right" ><i class="fas fa-trash"></i></button></div>`;
  domString += '<div class="card-body">';
  domString += '<h6 class="card-title">Description</h6>';
  domString += `<p class="card-text">${board.description} <button id="view-${board.id}" class="btn btn-danger view-board float-right">View</button></p>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { boardMaker };
