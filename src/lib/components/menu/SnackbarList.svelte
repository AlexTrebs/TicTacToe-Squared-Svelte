<script>
  import { snackbarStore } from '$lib/stores/snackbarStore.js';
</script>

<div class="snackbar-list">
  {#each $snackbarStore as { id, message, severity } (id)}
    <div class="snackbar snackbar-{severity}">
      <span>{message}</span>
      <button class="snackbar-close" on:click={() => snackbarStore.closeSnackbar(id)}>
        ✕
      </button>
    </div>
  {/each}
</div>
