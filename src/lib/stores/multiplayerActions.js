export function createMultiplayerActions(update, undo) {
  // Apply authoritative server state — call on MoveMade or UndoAccepted.
  function applyServerMove({ updated_board, next_board, history, current_turn }) {
    update(state => ({
      ...state,
      allSquares: updated_board,
      // next_board from server: null = any board, number = specific board
      isPlayable: next_board === null || next_board === undefined
        ? Array(9).fill(true)
        : Array(9).fill(false).map((_, i) => i === next_board),
      // TODO: derive squaresWinner from updated_board when server sends it
      past: history ? history.map(h => ({ allSquares: h })) : state.past,
      future: [],
    }));
  }

  // Local: set winner to opponent immediately.
  // Multiplayer: send Resign to server; server broadcasts GameOver.
  function resign() {
    update(state => {
      const opponent = state.lastPlayedNoughts ? 'o' : 'x';
      return { ...state, winner: opponent };
    });
  }

  // Local: draw immediately.
  // Multiplayer: send OfferDraw; wait for DrawOffered acknowledgment.
  function offerDraw() {
    update(state => ({ ...state, draw: true, winner: null }));
  }

  // Called when opponent accepts the draw offer.
  // Multiplayer: triggered by AcceptDraw message from server.
  function acceptDraw() {
    update(state => ({ ...state, draw: true, winner: null, drawOffered: null }));
  }

  // Local: undo immediately.
  // Multiplayer: send RequestUndo; wait for UndoRequested to be shown to opponent.
  function requestUndo() {
    undo();
  }

  // Called when opponent accepts the undo request.
  // Multiplayer: triggered by AcceptUndo message from server, which also sends new board.
  function acceptUndo() {
    undo();
  }

  return { applyServerMove, resign, offerDraw, acceptDraw, requestUndo, acceptUndo };
}
