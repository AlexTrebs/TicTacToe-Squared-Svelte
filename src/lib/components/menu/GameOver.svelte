<script>
  import { gameStore } from '$lib/stores/gameStore.js';
  import IconX from '../board/IconX.svelte';
  import IconO from '../board/IconO.svelte';

  export let winner; // 'x' | 'o' | null (null = draw)
</script>

<div class="game-over">
  {#if winner}
    <div class="game-over-piece piece-{winner}">
      {#if winner === 'x'}<IconX />{:else}<IconO />{/if}
    </div>
    <p class="game-over-label">{winner.toUpperCase()} wins</p>
  {:else}
    <p class="game-over-label">Draw</p>
  {/if}

  <button class="start-btn" on:click={() => gameStore.newGame()}>
    New game
  </button>
</div>
