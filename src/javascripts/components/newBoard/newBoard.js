const newBoardForm = () => {
  let domString = '';
  domString += '<form class="card col-8 offset-2 mb-4 pt-4 pl-4 pr-4" id="new-board-form">';
  domString += '  <div class="form-group">';
  domString += '    <label class="font-weight-bold" for="board-name">Board Name</label>';
  domString += '    <input type="text" class="form-control" id="board-name" placeholder="Enter the name of your board">';
  domString += '  </div>';
  domString += '  <div class="form-group">';
  domString += '    <label class="font-weight-bold" for="board-description">Description</label>';
  domString += '    <input type="text" class="form-control mb-3" id="board-description" placeholder="Tell about your board">';
  domString += '    <button type="submit" class="btn btn-danger float-right" id="board-creator">Submit</button>';
  domString += '  </div>';
  domString += '</form>';

  return domString;
};

export default { newBoardForm };
