<script>
  import { gameStore } from '$lib/stores/gameStore.js';
  // multiplayer: when ready, add startMultiplayerGame() and joinGame(sessionId) here
</script>

<div class="start-menu">
  <p class="start-description">
    Two players take turns on the same device.<br>
    Win three sub-boards in a row to win.
  </p>

  <button class="start-btn" on:click={() => gameStore.startLocalGame()}>
    Play local game
  </button>

  <!-- Multiplayer hooks — wire up when server is ready -->
  <!-- <button class="start-btn secondary" disabled>Play online</button> -->
  <!-- <input placeholder="Game ID" /> <button>Join</button> -->
</div>
