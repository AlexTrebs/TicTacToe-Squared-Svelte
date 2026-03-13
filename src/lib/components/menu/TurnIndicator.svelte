<script>
  import { gameStore } from '$lib/stores/gameStore.js';
  import { wsStore } from '$lib/stores/wsStore.js';
  import IconX from '../board/IconX.svelte';
  import IconO from '../board/IconO.svelte';

  // lastPlayedNoughts=true → O just played → X is next
  $: turn = $gameStore.lastPlayedNoughts ? "x" : "o";
  $: isMultiplayer = $gameStore.isMultiplayer;
  $: isMyTurn = isMultiplayer && $wsStore.localMark === turn;
</script>

<div class="turn-indicator" class:your-turn={isMyTurn}>
  <span class="turn-label">{isMultiplayer ? (isMyTurn ? "Your turn" : "Opponent's turn") : "Current turn"}</span>
  <span class="turn-piece piece-{turn}">
    <span>{turn.toUpperCase()}</span>
  </span>
</div>

<style>
  .your-turn .turn-label {
    font-weight: bold;
  }
  .your-turn {
    border-radius: 8px;
    padding: 4px 8px;
    outline: 2px solid rgba(255, 255, 255, 0.4);
    outline-offset: 2px;
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { outline-color: rgba(255, 255, 255, 0.2); }
    50% { outline-color: rgba(255, 255, 255, 0.7); }
  }
</style>
