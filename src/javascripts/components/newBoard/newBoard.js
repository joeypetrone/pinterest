const newBoardForm = () => {
  let domString = '';
  domString += '<form class="card col-4 offset-4 mb-4 p-4" id="new-board-form">';
  domString += '  <div class="form-group">';
  domString += '    <label for="board-name">Board Name</label>';
  domString += '    <input type="text" class="form-control" id="board-name" placeholder="Enter your board title">';
  domString += '  </div>';
  domString += '  <div class="form-group">';
  domString += '    <label for="board-description">Description</label>';
  domString += '    <input type="text" class="form-control" id="board-description" placeholder="Tell about your board">';
  domString += '  </div>';
  domString += '  <button type="submit" class="btn btn-danger" id="board-creator">Submit</button>';
  domString += '</form>';

  return domString;
};

export default { newBoardForm };
