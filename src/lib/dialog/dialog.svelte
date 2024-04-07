<script>
	let { open = false, toggle = () => {}, children } = $props();

	function show(dialog, show) {
		return {
			update(open) {
				if (open) {
					dialog.showModal();
				} else {
					dialog.close();
				}
			},
		};
	}
</script>

<dialog use:show={open}>
	{#if children}
		{@render children()}
	{/if}
</dialog>
