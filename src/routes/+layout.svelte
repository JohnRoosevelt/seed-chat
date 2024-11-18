<script>
	import "uno.css";
	import "ato-ui/themes/ato.css";
	import "@unocss/reset/tailwind.css";
	import "dayjs/locale/zh-cn"; // German locale
  import { dayjs } from "svelte-time";
	import { navigating, updated } from '$app/stores';
	import PreloadingIndicator from '$com/PreloadingIndicator.svelte';


  // Set the default locale to German.
  dayjs.locale('zh-cn');
	const { children } = $props();

</script>


{#if $navigating}
	<PreloadingIndicator />
{/if}

<main
	class="w-screen h-screen text-gray-900"
>
	{@render children()}
</main>

{#if $updated}
	<div class="toast">
		<p>
			A new version of the app is available

			<button onclick={() => location.reload()}>
				reload the page
			</button>
		</p>
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 1rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.toast p {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: var(--bg-2);
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		border-radius: 4px;
	}
</style>
