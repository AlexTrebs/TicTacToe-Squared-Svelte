<script>
  import { gameStore } from '$lib/stores/gameStore.js';
  import IconX from '../board/IconX.svelte';
  import IconO from '../board/IconO.svelte';

  // lastPlayedNoughts=true → O just played → X is next
  $: turn = $gameStore.lastPlayedNoughts ? "x" : "o";
</script>

<div class="turn-indicator">
  <span class="turn-label">Current turn</span>
  <span class="turn-piece piece-{turn}">
    <span>{turn.toUpperCase()}</span>
  </span>
</div>
