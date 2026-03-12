<script>
  export let outer = false;
</script>

<div class="board" class:board-outer={outer} class:board-inner={!outer}>
  <slot />
</div>
