<script>
  import { gameStore } from '$lib/stores/gameStore.js';

  // In multiplayer these props will be driven by the server:
  //   drawOffered = the player who offered (show Accept to the other player)
  //   undoRequested = the player who asked (show Accept to the other player)
  // In local mode they're always null (actions apply immediately).
  $: drawOffered = $gameStore.drawOffered;
  $: undoRequested = $gameStore.undoRequested;
</script>

<div class="action-buttons">
  <button class="action-btn btn-undo" on:click={() => gameStore.requestUndo()}>
    Request undo
  </button>

  {#if undoRequested}
    <button class="action-btn btn-accept" on:click={() => gameStore.acceptUndo()}>
      Accept undo
    </button>
  {/if}

  <button class="action-btn btn-draw" on:click={() => gameStore.offerDraw()}>
    Offer draw
  </button>

  {#if drawOffered}
    <button class="action-btn btn-accept" on:click={() => gameStore.acceptDraw()}>
      Accept draw
    </button>
  {/if}

  <button class="action-btn btn-resign" on:click={() => gameStore.resign()}>
    Resign
  </button>
</div>
