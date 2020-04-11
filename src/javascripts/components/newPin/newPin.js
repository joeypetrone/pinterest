const newPinForm = (boardId) => {
  let domString = '';
  domString += `<form class="card col-8 offset-2 mb-4 pt-4 pl-4 pr-4 new-pin-form-tag" id="${boardId}">`;
  domString += '  <div class="form-group">';
  domString += '    <label class="font-weight-bold" for="pin-image">Pin Image</label>';
  domString += '    <input type="text" class="form-control mb-3" id="pin-image-url" placeholder="Enter your pin image url">';
  domString += '    <button type="submit" class="btn btn-danger float-right" id="pin-creator">Submit</button>';
  domString += '  </div>';
  domString += '</form>';

  return domString;
};

export default { newPinForm };
