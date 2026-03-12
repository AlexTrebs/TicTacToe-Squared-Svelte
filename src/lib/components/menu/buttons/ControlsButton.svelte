<script>
  export let disabled = false;
  export let onClick = null;
  export let primary = false;
</script>

<button class="controls-btn" class:primary {disabled} on:click={onClick}>
  <slot />
</button>
