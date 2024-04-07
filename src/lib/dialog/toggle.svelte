<script>
  let {dialoger, ctrl} = $props()
</script>

{#snippet dialogbtn({toggle})}
  <div onclick={toggle} >
    {#if ctrl}
      {@render ctrl()}
    {:else}
      <button>
        close
      </button>
    {/if}
  </div>
{/snippet}

{@render dialogbtn({...dialoger})}
