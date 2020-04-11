import './singleBoardHeader.scss';

const buildSingleBoardHeader = (board) => {
  let domString = '';

  domString += `<h1 class="text-center">${board.name}</h1>`;
  domString += `<p class="text-center">${board.description}</p>`;
  domString += '<button class="btn btn-danger rounded-circle mb-3 mt-2 ml-3" id="back-to-boards-button"><i class="fas fa-arrow-left"></i></button>';
  return domString;
};

export default { buildSingleBoardHeader };
