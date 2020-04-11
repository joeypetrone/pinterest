import newPinComponent from '../newPin/newPin';
import './singleBoardHeader.scss';

const buildSingleBoardHeader = (board) => {
  let domString = '';

  domString += `<h1 class="text-center">${board.name}</h1>`;
  domString += `<p class="text-center">${board.description}</p>`;
  domString += '<button class="btn btn-danger rounded-circle mb-3 mt-2 ml-3" id="back-to-boards-button"><i class="fas fa-arrow-left"></i></button>';
  domString += '<div class="d-flex justify-content-center mb-4" id="add-pin-container">';
  domString += '<button class="btn btn-danger" id="add-pin-button" type="button" data-toggle="collapse" data-target="#add-pin-form" aria-expanded="false" aria-controls="addPinsForm">Add Pin</button>';
  domString += '</div>';
  domString += '<div class="collapse" id="add-pin-form">';
  domString += newPinComponent.newPinForm(board.id);
  domString += '</div>';
  return domString;
};

export default { buildSingleBoardHeader };
