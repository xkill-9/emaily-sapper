<script>
  // Modal component taken from Svelte examples: https://svelte.dev/examples#modal
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  onMount(() => {
    dispatch("mount");
  });
</script>

<style>
  .emaily-modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .emaily-modal {
    position: fixed;
    color: #444;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: white;
  }

  button {
    all: unset;
    position: absolute;
    top: 0;
    right: 18px;
    cursor: pointer;
  }
</style>

<div class="emaily-modal-background" on:click={() => dispatch('close')} />

<div class="emaily-modal">
  <div class="emaily-modal-header">
    <slot name="header" />
    <button on:click={() => dispatch('close')}>
      <i class="material-icons">close</i>
    </button>
  </div>
  <slot />
</div>
