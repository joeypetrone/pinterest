import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
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

const getBoardByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`)
    .then((response) => {
      const board = response.data;

      resolve(board);
    })
    .catch((err) => reject(err));
});

export default { getBoardsByUid, getBoardByBoardId };
