<script>
  import { gameStore } from '$lib/stores/gameStore.js';

  $: canUndo = $gameStore.past.length > 0;
  $: canRedo = $gameStore.future.length > 0;
  $: moveCount = $gameStore.past.length;
</script>

<div class="local-controls">
  <div class="nav-row">
    <button class="nav-btn" disabled={!canUndo} on:click={() => gameStore.undo()} title="Undo">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </button>
    <span class="move-count" title="Moves played">{moveCount}</span>
    <button class="nav-btn" disabled={!canRedo} on:click={() => gameStore.redo()} title="Redo">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </svg>
    </button>
  </div>

  <button class="reset-btn" on:click={() => gameStore.startLocalGame()}>
    New game
  </button>
</div>
