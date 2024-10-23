<script>
	let { open = false, toggle = () => {}, children, autoClose } = $props();

	let dialog
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

	function onclick (event) {
		var rect = dialog.getBoundingClientRect();
		var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
		rect.left <= event.clientX && event.clientX <= rect.left + rect.width);

		console.log({autoClose, isInDialog}, {top: rect.top, height: rect.top + rect.height}, {y: event.clientY})
		if (!isInDialog && autoClose) {
			toggle();
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} relative bg-transparent use:show={open} {onclick}>
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
	backdrop-filter:blur(50px);
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  opacity: 0.4;
}
</style>