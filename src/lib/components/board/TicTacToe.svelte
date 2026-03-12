<script>
  import Board from './Board.svelte';
  import Square from './Square.svelte';
  import IconX from './IconX.svelte';
  import IconO from './IconO.svelte';

  export let winner = null;
  export let isPlayable = false;
  export let index = 0;
  export let squares = Array(9).fill(null);
  export let onPlay;
</script>

{#if winner}
  <div class="winner-icon winner-{winner}">
    {#if winner === 'x'}<IconX />{:else}<IconO />{/if}
  </div>
{:else}
  <Board>
    {#each squares as value, sqNum}
      <Square
        squareCoord="{index}.{sqNum}"
        {value}
        {onPlay}
        {isPlayable}
      />
    {/each}
  </Board>
{/if}
