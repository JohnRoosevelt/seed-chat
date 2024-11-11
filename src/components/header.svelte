<script>
	let { back, backText = '', children, color='green' } = $props()
</script>

<!-- backdrop-blur-4 -->
<div fixed top-0 z-9 bg-gray-50 w-full h-12 px-5 font-500 flex-bc class="text-{color}">
  <button flex-cc aria-label="back" onclick={back}>
    <span i-carbon-chevron-left text-2xl></span>
    {#if backText}
      {@render backText()}
    {/if}
  </button>

  {#if children}
    {@render children()}
  {/if}
</div>