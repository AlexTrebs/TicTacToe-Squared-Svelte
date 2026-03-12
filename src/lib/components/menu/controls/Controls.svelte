<script>
  import { gameStore } from '$lib/stores/gameStore.js';
  import TurnIndicator from '../TurnIndicator.svelte';
  import LocalGameControls from './LocalGameControls.svelte';
  import MultiplayerControls from './MultiplayerControls.svelte';
  import StartMenu from '../StartMenu.svelte';
  import GameOver from '../GameOver.svelte';

  $: gameOver = !!$gameStore.winner || $gameStore.draw;
</script>

<aside class="side-panel">
  <div class="panel-logo">T²</div>

  {#if !$gameStore.gameStarted}
    <StartMenu />

  {:else if gameOver}
    <GameOver winner={$gameStore.winner} />

  {:else}
    <TurnIndicator />
    <hr class="panel-hr" />
    {#if $gameStore.isMultiplayer}
      <MultiplayerControls />
    {:else}
      <LocalGameControls />
    {/if}
  {/if}
</aside>
