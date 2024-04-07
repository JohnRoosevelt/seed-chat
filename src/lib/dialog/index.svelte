<script>
  import Dialog from "./dialog.svelte";
  import Toggle from "./toggle.svelte";

  let { dialoger, outer, close, children } = $props();
</script>

<Dialog {...dialoger}>
  {#if close} 
    <Toggle {dialoger} ctrl={close} />
  {/if}

  {#if children}
    {@render children()}
	{/if}
</Dialog>

<Toggle {dialoger} ctrl={outer} />