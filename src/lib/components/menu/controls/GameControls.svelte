<script>
  import ControlsButton from '../buttons/ControlsButton.svelte';
  import { gameStore } from '$lib/stores/gameStore.js';
</script>

<div class="game-controls" role="toolbar" aria-label="Game controls">
  <ControlsButton>
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  </ControlsButton>
  <ControlsButton onClick={() => gameStore.restartGame()}>
    Restart
  </ControlsButton>
  <ControlsButton>
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
    </svg>
  </ControlsButton>
</div>
