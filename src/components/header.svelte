<script>
	let { children } = $props()
</script>

<div w-full h-72px px-5 flex-bc>
  <button flex-cc onclick="{() => history.back()}">
    <span i-carbon-chevron-left text-2xl></span>
    返回
  </button>
  {#if children}  
  <div flex-1 flex-cc>
    {@render children()}
  </div>
  {/if}
</div>