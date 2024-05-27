<script>
  let {dialoger, ctrl} = $props()
</script>

{#snippet dialogbtn({toggle})}
  <button onclick={toggle} >
    {#if ctrl}
      {@render ctrl()}
    {:else}
      <span>
        X
      </span>
    {/if}
  </button>
{/snippet}

{@render dialogbtn({...dialoger})}
