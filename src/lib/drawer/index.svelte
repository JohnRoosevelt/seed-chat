<script>
  import Dialog from "$lib/dialog/dialog.svelte";
  

  const {children, dialog} = $props()

</script>

<Dialog {...dialog} autoClose>
  {#if children}
  <div fixed bottom-0 left-0 z-9 w-screen class="max-h-[calc(100%-48px)]" bg-white scroll-y>
		{@render children()}
  </div>
	{/if}
</Dialog>
