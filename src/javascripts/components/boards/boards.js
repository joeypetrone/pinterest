import utils from '../../helpers/utils';

const buildBoards = () => {
  let domString = '';

  domString += '<div class="d-flex justify-content-center">';
  domString += '  <h1>Boards</h1>';
  domString += '</div>';

  utils.printToDom('boards', domString);
};

export default { buildBoards };
