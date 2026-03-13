<script>
  import { gameStore } from '$lib/stores/gameStore.js';
  import { wsSend, wsStore } from '$lib/stores/wsStore.js';
  import Board from './Board.svelte';
  import Square from './Square.svelte';
  import TicTacToe from './TicTacToe.svelte';
  import IconX from './IconX.svelte';
  import IconO from './IconO.svelte';

  function handlePlay(coord) {
    if ($gameStore.isMultiplayer) {
      const [boardIndex, squareIndex] = coord.split('.').map(Number);
      const newBoard = $gameStore.allSquares.map((sub, i) => {
        if (i !== boardIndex) return [...sub];
        const updated = [...sub];
        updated[squareIndex] = $wsStore.localMark;
        return updated;
      });
      wsSend({ type: 'Move', board: newBoard, square: squareIndex });
    } else {
      gameStore.playSquare(coord);
    }
  }

  function handleOuterSquareClick(index) {
    gameStore.togglePlayable(index);
  }

  $: currentTurn = $gameStore.lastPlayedNoughts ? 'o' : 'x';
  $: myTurn = !$gameStore.isMultiplayer || $wsStore.localMark === currentTurn;
</script>

<div id="tictactoe-wrapper">
  {#if $gameStore.winner}
    <div class="winner-icon winner-{$gameStore.winner}">
      {#if $gameStore.winner === 'x'}<IconX />{:else}<IconO />{/if}
    </div>
  {:else}
    <Board outer={true}>
      {#each Array(9) as _, sqNum}
        <Square
          squareCoord="{sqNum}"
          onPlay={handleOuterSquareClick}
          isPlayable={$gameStore.isPlayable[sqNum] && !$gameStore.squaresWinner[sqNum] && $gameStore.gameStarted && myTurn}
        >
          <TicTacToe
            winner={$gameStore.squaresWinner[sqNum]}
            isPlayable={!$gameStore.isPlayable[sqNum] && $gameStore.gameStarted}
            index={sqNum}
            squares={$gameStore.allSquares[sqNum]}
            onPlay={handlePlay}
          />
        </Square>
      {/each}
    </Board>
  {/if}
</div>
