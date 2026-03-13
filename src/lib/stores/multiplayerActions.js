import { wsSend } from './wsStore.js';

export function createMultiplayerActions(update, undo, isMultiplayer) {
  function applyServerMove({ updated_board, squares_winner, next_board, history }) {
    update(state => ({
      ...state,
      allSquares: updated_board,
      squaresWinner: squares_winner ?? state.squaresWinner,
      isPlayable: next_board == null
        ? Array(9).fill(true)
        : Array(9).fill(false).map((_, i) => i !== next_board),
      lastPlayedNoughts: history ? history.length % 2 === 1 : state.lastPlayedNoughts,
      past: history ? history.map(h => ({ allSquares: h })) : state.past,
      future: [],
    }));
  }

  function resign() {
    if (isMultiplayer()) { wsSend({ type: 'Resign' }); return; }
    update(state => {
      const opponent = state.lastPlayedNoughts ? 'o' : 'x';
      return { ...state, winner: opponent };
    });
  }

  function offerDraw() {
    if (isMultiplayer()) { wsSend({ type: 'OfferDraw' }); return; }
    update(state => ({ ...state, draw: true, winner: null }));
  }

  function acceptDraw() {
    if (isMultiplayer()) { wsSend({ type: 'AcceptDraw' }); return; }
    update(state => ({ ...state, draw: true, winner: null, drawOffered: null }));
  }

  function requestUndo() {
    if (isMultiplayer()) { wsSend({ type: 'RequestUndo' }); return; }
    undo();
  }

  function acceptUndo() {
    if (isMultiplayer()) { wsSend({ type: 'AcceptUndo' }); return; }
    undo();
  }

  return { applyServerMove, resign, offerDraw, acceptDraw, requestUndo, acceptUndo };
}
