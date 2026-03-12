<script>
  import Squared from '$lib/components/board/Squared.svelte';
  import Controls from '$lib/components/menu/controls/Controls.svelte';
  import SnackbarList from '$lib/components/menu/SnackbarList.svelte';
</script>

<div class="app">
  <div class="game-wrap">
    <header class="game-header">
      <span class="header-badge">T²</span>
      <span class="header-title">TicTacToe-Squared</span>
    </header>
    <div class="game-body">
      <div class="board-area">
        <Squared />
      </div>
      <div class="panel-area">
        <Controls />
      </div>
    </div>
  </div>
</div>

<SnackbarList />
