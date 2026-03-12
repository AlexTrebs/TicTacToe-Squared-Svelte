<script>
  import { gameStore } from '$lib/stores/gameStore.js';

  $: drawOffered = $gameStore.drawOffered;
  $: undoRequested = $gameStore.undoRequested;
</script>

<div class="multiplayer-controls">
  <button class="mp-btn" on:click={() => gameStore.requestUndo()}>Request undo</button>

  {#if undoRequested}
    <button class="mp-btn accept" on:click={() => gameStore.acceptUndo()}>Accept undo</button>
  {/if}

  <button class="mp-btn" on:click={() => gameStore.offerDraw()}>Offer draw</button>

  {#if drawOffered}
    <button class="mp-btn accept" on:click={() => gameStore.acceptDraw()}>Accept draw</button>
  {/if}

  <button class="mp-btn resign" on:click={() => gameStore.resign()}>Resign</button>
</div>
