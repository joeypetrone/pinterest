import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      if (demBoards) {
        Object.keys(demBoards).forEach((boardId) => {
          demBoards[boardId].id = boardId;
          boards.push(demBoards[boardId]);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

export default { getBoards };
