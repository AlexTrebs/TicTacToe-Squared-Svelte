import { writable, get } from 'svelte/store';
import calculateWinner from '../utils/calculateWinner.js';
import { createMultiplayerActions } from './multiplayerActions.js';

// Snapshot of board state only — no meta, no history (avoids circular refs)
function snapshot(state) {
  return {
    lastPlayedNoughts: state.lastPlayedNoughts,
    winner: state.winner,
    draw: state.draw,
    squaresWinner: [...state.squaresWinner],
    isPlayable: [...state.isPlayable],
    allSquares: state.allSquares.map(b => [...b]),
  };
}

const blankBoard = () => ({
  lastPlayedNoughts: false,
  winner: null,
  draw: false,
  squaresWinner: Array(9).fill(null),
  isPlayable: Array(9).fill(true),
  allSquares: Array.from({ length: 9 }, () => Array(9).fill(null)),
});

const initialState = () => ({
  ...blankBoard(),
  gameStarted: false,
  isMultiplayer: false,
  // Pending negotiation state — set by server events in multiplayer
  drawOffered: null,   // null | 'x' | 'o'
  undoRequested: null, // null | 'x' | 'o'
  // Local history for undo/redo
  past: [],
  future: [],
});

function createGameStore() {
  const _store = writable(initialState());
  const { subscribe, update, set } = _store;

  // ── Local move ────────────────────────────────────────────────────────────
  // In multiplayer this is intercepted — send Move to server instead,
  // then applyServerMove() is called when MoveMade arrives.
  function playSquare(coord) {
    update(state => {
      const [boardIndex, squareIndex] = coord.split('.').map(Number);
      const board = [...state.allSquares[boardIndex]];

      if (board[squareIndex] || calculateWinner(board)) return state;

      board[squareIndex] = state.lastPlayedNoughts ? 'x' : 'o';

      const newAllSquares = state.allSquares.map((s, i) => i === boardIndex ? board : s);
      const currentWinner = calculateWinner(board);

      let newSquaresWinner = [...state.squaresWinner];
      let newWinner = state.winner;
      if (currentWinner) {
        newSquaresWinner = newSquaresWinner.map((w, i) => i === boardIndex ? currentWinner : w);
        newWinner = calculateWinner(newSquaresWinner);
      }

      const pickedSquare = squareIndex;
      const playedSquare = boardIndex;
      const newIsPlayable = [...state.isPlayable];
      const condition =
        (state.squaresWinner[pickedSquare] === null && currentWinner === null) ||
        (pickedSquare !== playedSquare && currentWinner !== null);

      if (condition) {
        newIsPlayable[pickedSquare] = !newIsPlayable[pickedSquare];
        newIsPlayable[playedSquare] = !newIsPlayable[playedSquare];
      } else {
        newIsPlayable[playedSquare] = !newIsPlayable[playedSquare];
      }

      return {
        ...state,
        allSquares: newAllSquares,
        squaresWinner: newSquaresWinner,
        winner: newWinner,
        lastPlayedNoughts: !state.lastPlayedNoughts,
        isPlayable: newIsPlayable,
        // push current state to history, clear redo stack
        past: [...state.past, snapshot(state)],
        future: [],
      };
    });
  }

  // ── Undo/redo ──────────────────────────────────────────────────────────────
  function undo() {
    update(state => {
      if (state.past.length === 0) return state;
      const prev = state.past[state.past.length - 1];
      return {
        ...state,
        ...prev,
        past: state.past.slice(0, -1),
        future: [snapshot(state), ...state.future],
        drawOffered: null,
        undoRequested: null,
      };
    });
  }

  function redo() {
    update(state => {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...state,
        ...next,
        past: [...state.past, snapshot(state)],
        future: state.future.slice(1),
      };
    });
  }

  // ── Multiplayer actions ────────────────────────────────────────────────────
  const { applyServerMove, resign, offerDraw, acceptDraw, requestUndo, acceptUndo } =
    createMultiplayerActions(update, undo, () => get(_store).isMultiplayer);

  function setDrawOffered(by) {
    update(state => ({ ...state, drawOffered: by }));
  }

  function setUndoRequested(by) {
    update(state => ({ ...state, undoRequested: by }));
  }

  function applyGameOver(winnerMark) {
    update(state => ({
      ...state,
      winner: winnerMark ?? null,
      draw: winnerMark === null,
    }));
  }

  // ── Meta ───────────────────────────────────────────────────────────────────
  function togglePlayable(index) {
    update(state => {
      const newIsPlayable = [...state.isPlayable];
      newIsPlayable[index] = !newIsPlayable[index];
      return { ...state, isPlayable: newIsPlayable };
    });
  }

  function startLocalGame() {
    set({ ...initialState(), gameStarted: true, isMultiplayer: false });
  }

  function startMultiplayerGame() {
    set({ ...initialState(), gameStarted: true, isMultiplayer: true });
  }

  function newGame() {
    set(initialState());
  }

  return {
    subscribe,
    // Board
    playSquare,
    togglePlayable,
    applyServerMove,
    // History
    undo,
    redo,
    // Game actions
    resign,
    offerDraw,
    acceptDraw,
    requestUndo,
    acceptUndo,
    // Multiplayer server events
    setDrawOffered,
    setUndoRequested,
    applyGameOver,
    // Meta
    startLocalGame,
    startMultiplayerGame,
    newGame,
  };
}

export const gameStore = createGameStore();
