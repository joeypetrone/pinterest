const buildSingleBoardHeader = (board) => {
  let domString = '';

  console.log('found board', board);
  domString += `<h1 class="text-center">${board.name}</h1>`;
  domString += `<p class="text-center">${board.description}</p>`;
  domString += '<button class="btn btn-danger back-to-boards-button rounded-circle mb-3 mt-2 ml-3"><i class="fas fa-arrow-left"></i></button>';
  return domString;
};

export default { buildSingleBoardHeader };
