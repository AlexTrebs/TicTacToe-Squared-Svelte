import { writable } from 'svelte/store';
import { PUBLIC_GAME_SERVER_WS_URL } from '$env/static/public';
import { gameStore } from './gameStore.js';
import { snackbarStore } from './snackbarStore.js';

export const wsStore = writable({ status: 'idle' });

let socket = null;
let _userId = null;
let _naughts = null;
let _crosses = null;

export function connect(userId, token) {
  _userId = userId;
  wsStore.set({ status: 'connecting' });
  socket = new WebSocket(`${PUBLIC_GAME_SERVER_WS_URL}/ws?token=${token}`);

  socket.onmessage = ({ data }) => {
    const msg = JSON.parse(data).data;

    switch (msg.type) {
      case 'WaitingForOpponent':
        wsStore.set({ status: 'waiting' });
        break;

      case 'GameStart':
        _naughts = msg.naughts;
        _crosses = msg.crosses;
        wsStore.set({ status: 'playing', localMark: msg.crosses === userId ? 'x' : 'o' });
        gameStore.startMultiplayerGame();
        break;

      case 'MoveMade':
      case 'UndoAccepted':
        gameStore.applyServerMove(msg);
        break;

      case 'DrawOffered':
        gameStore.setDrawOffered(userIdToMark(msg.by));
        break;

      case 'UndoRequested':
        gameStore.setUndoRequested(userIdToMark(msg.by));
        break;

      case 'GameOver': {
        const mark = msg.winner ? userIdToMark(msg.winner) : null;
        gameStore.applyGameOver(mark);
        break;
      }

      case 'InvalidMove':
        snackbarStore.enqueueSnackbar(msg.reason, 'error');
        break;

      case 'PlayerLeft':
        snackbarStore.enqueueSnackbar('Opponent disconnected', 'warning');
        break;
    }
  };

  socket.onclose = () => {
    wsStore.set({ status: 'idle' });
    socket = null;
  };

  socket.onerror = () => {
    snackbarStore.enqueueSnackbar('Connection error', 'error');
  };
}

export function wsSend(msg) {
  socket?.send(JSON.stringify({ from: _userId, data: msg }));
}

export function disconnect() {
  socket?.close();
  socket = null;
  _userId = null;
  _naughts = null;
  _crosses = null;
  wsStore.set({ status: 'idle' });
}

function userIdToMark(userId) {
  if (userId === _crosses) return 'x';
  if (userId === _naughts) return 'o';
  return null;
}
