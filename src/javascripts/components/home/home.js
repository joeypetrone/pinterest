import utils from '../../helpers/utils';

const buildHome = () => {
  let domString = '';

  domString += '<div class="d-flex justify-content-center">';
  domString += '  <h1>Pinterest</h1>';
  domString += '</div>';

  utils.printToDom('home', domString);
};

export default { buildHome };
