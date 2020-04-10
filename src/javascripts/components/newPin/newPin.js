const newPinForm = () => {
  let domString = '';
  domString += '<form class="card col-8 offset-2 mb-4 pt-4 pl-4 pr-4" id="new-pin-form">';
  domString += '  <div class="form-group">';
  domString += '    <label class="font-weight-bold" for="board-name">Pin Image</label>';
  domString += '    <input type="text" class="form-control mb-3" id="board-name" placeholder="Enter your pin image link">';
  domString += '    <button type="submit" class="btn btn-danger float-right" id="pin-creator">Submit</button>';
  domString += '  </div>';
  domString += '</form>';

  return domString;
};

export default { newPinForm };
