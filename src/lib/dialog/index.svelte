<script>
  import Dialog from "./dialog.svelte";
  import Toggle from "./toggle.svelte";

  let { dialoger, outer, close, children, autoClose = true } = $props();
  console.log({autoClose})
</script>

<Dialog {...dialoger} {autoClose}>
  {#if close} 
    <Toggle {dialoger} ctrl={close} />
  {/if}

  {#if children}
    {@render children()}
	{/if}
</Dialog>

<Toggle {dialoger} ctrl={outer} />