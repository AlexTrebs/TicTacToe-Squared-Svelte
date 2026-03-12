# TicTacToe-Squared (Svelte)

A simple game from childhood I developed so that I didn't have to carry around paper anymore! This is a SvelteKit rewrite of the [original React version](../tictactoe-squared).

## Rules

A 9-board meta game of Tic-Tac-Toe. Each move sends your opponent to the board corresponding to the square you just played. Win three boards in a row to win the game.

## Features

- Local two-player game with full undo/redo history
- Multiplayer-ready architecture (resign, offer draw, request undo negotiation)

## Scripts

### `npm run dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run preview`

Previews the production build locally.
