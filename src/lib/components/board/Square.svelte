<script>
  import IconX from './IconX.svelte';
  import IconO from './IconO.svelte';

  export let value = null;
  export let squareCoord = '';
  export let onPlay = null;
  export let isPlayable = false;
  export let throb = false;
</script>

{#if isPlayable}
  <button
    class="square-active"
    class:square-throb={throb}
    on:click={() => onPlay && onPlay(squareCoord)}
  >
    <slot>
      {#if value === 'x'}
        <span class="icon icon-x"><IconX /></span>
      {:else if value === 'o'}
        <span class="icon icon-o"><IconO /></span>
      {/if}
    </slot>
  </button>
{:else}
  <div class="square-inactive" class:square-throb={throb}>
    <slot>
      {#if value === 'x'}
        <span class="icon icon-x"><IconX /></span>
      {:else if value === 'o'}
        <span class="icon icon-o"><IconO /></span>
      {/if}
    </slot>
  </div>
{/if}
