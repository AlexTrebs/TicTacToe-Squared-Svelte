<script>
  import { onMount } from 'svelte';
  import { gameStore } from '$lib/stores/gameStore.js';
  import { wsStore, connect } from '$lib/stores/wsStore.js';
  import { createGame, joinGame } from '$lib/api/multiplayerApi.js';

  let onlineView = null; // null | 'create' | 'join'
  let joinCode = '';
  let createdCode = '';
  let error = '';
  let copied = false;
  let savedCode = '';

  onMount(() => {
    savedCode = localStorage.getItem('gameCode') || '';
  });

  function copyCode() {
    navigator.clipboard.writeText(createdCode);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }

  function getUserId() {
    let id = localStorage.getItem('userId');
    if (!id) { id = crypto.randomUUID(); localStorage.setItem('userId', id); }
    return id;
  }

  async function handleCreate() {
    error = '';
    try {
      const { code, token } = await createGame(getUserId());
      localStorage.setItem('gameCode', code);
      createdCode = code;
      onlineView = 'create';
      connect(getUserId(), token);
    } catch (e) {
      error = e.message;
    }
  }

  async function handleJoin() {
    error = '';
    try {
      const code = joinCode.toUpperCase();
      const { token } = await joinGame(getUserId(), code);
      localStorage.setItem('gameCode', code);
      connect(getUserId(), token);
    } catch (e) {
      error = e.message;
    }
  }

  async function handleRejoin() {
    error = '';
    try {
      const { token } = await joinGame(getUserId(), savedCode);
      connect(getUserId(), token);
    } catch (e) {
      error = e.message;
      savedCode = '';
      localStorage.removeItem('gameCode');
    }
  }
</script>

<div class="start-menu">
  {#if onlineView === 'create'}
    <p class="start-description">Share this code with your opponent:</p>
    <div class="invite-code-row">
      <p class="invite-code">{createdCode}</p>
      <button class="copy-btn" on:click={copyCode}>{copied ? '✓' : 'Copy'}</button>
    </div>
    {#if $wsStore.status === 'waiting'}
      <p class="start-description">Waiting for opponent…</p>
    {/if}

  {:else if onlineView === 'join'}
    <input
      class="code-input"
      bind:value={joinCode}
      placeholder="Enter code"
      maxlength="5"
    />
    <button class="start-btn" on:click={handleJoin}>Join game</button>
    <button class="start-btn secondary" on:click={() => { onlineView = null; error = ''; }}>Back</button>

  {:else}
    <p class="start-description">
      Two players take turns on the same device.<br>
      Win three sub-boards in a row to win.
    </p>
    <button class="start-btn" on:click={() => gameStore.startLocalGame()}>Play local</button>
    <button class="start-btn" on:click={handleCreate}>Play online</button>
    <button class="start-btn secondary" on:click={() => { onlineView = 'join'; error = ''; }}>Join game</button>
    {#if savedCode}
      <button class="start-btn secondary" on:click={handleRejoin}>Rejoin game ({savedCode})</button>
    {/if}
  {/if}

  {#if error}
    <p class="start-error">{error}</p>
  {/if}
</div>
