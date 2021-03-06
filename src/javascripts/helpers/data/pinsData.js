import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];

      Object.keys(demPins).forEach((pinId) => {
        demPins[pinId].id = pinId;
        pins.push(demPins[pinId]);
      });

      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const movePin = (newBoard, pinId) => axios.patch(`${baseUrl}/pins/${pinId}.json`, { boardId: newBoard });

export default {
  getPinsByBoardId,
  deletePin,
  addPin,
  movePin,
};
