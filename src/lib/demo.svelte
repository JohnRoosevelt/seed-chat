<script>
	/** @type {number} */
	let number;

	async function roll() {
		const response = await fetch('/roll');
		number = await response.json();
	}

	import Dialog from "$lib/dialog/index.svelte";
  import DialogClose from "$lib/dialog/toggle.svelte";
  import { createDialog } from "$lib/dialog/dialog.svelte.js";
  const dialoger = createDialog()
</script>

<article class="flex flex-col p-5">
	<h1>Welcome to SvelteKit</h1>
	<ul>
		<li>this is a test, get data from cloudflare durable object</li>
		<li>use unocss</li>
		<li>use svelte5</li>
	</ul>

	<button on:click={roll}>Roll the dice</button>
	
	{#if number !== undefined}
		<p>You rolled a {number}</p>
	{/if}
</article>

<Dialog {dialoger}>
  {#snippet outer()}
		<button class="bg-red">open a dialog</button>
	{/snippet}

  <main class="flex flex-col bg-red-50">
    dialog content
    <DialogClose {dialoger} />
  </main>
</Dialog>