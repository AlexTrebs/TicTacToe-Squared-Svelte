<script>
  import ControlsButton from '../buttons/ControlsButton.svelte';
  export let onLocalClick;
</script>

<ControlsButton onClick={onLocalClick} primary={true}>New Local Game</ControlsButton>
