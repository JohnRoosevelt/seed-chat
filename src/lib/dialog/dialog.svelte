<script>
	let { open = false, toggle = () => {}, children, autoClose = false } = $props();

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

	function onclick (e) {
		if (autoClose && e.target === document.querySelector("dialog")) {
			toggle()
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bg-transparent use:show={open} {onclick}>
	{#if children}
		{@render children()}
	{/if}
</dialog>

<style>
::backdrop {
  background-image: linear-gradient(
    45deg,
    magenta,
    rebeccapurple,
    dodgerblue,
    green
  );
	backdrop-filter:blur(5px);
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
}
</style>