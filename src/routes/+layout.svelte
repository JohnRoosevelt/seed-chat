<script>
	import "uno.css";
	import "ato-ui/themes/ato.css";
	import "@unocss/reset/tailwind.css";
	import "dayjs/locale/zh-cn"; // German locale
	import { dayjs } from "svelte-time";
	import { navigating, updated } from "$app/stores";
	import PreloadingIndicator from "$com/PreloadingIndicator.svelte";

	// Set the default locale to German.
	dayjs.locale("zh-cn");
	const { children, data } = $props();

	// $effect(() => {
	// 	console.log({data})
	// 	window
	// 		.matchMedia("(display-mode: standalone)")
	// 		.addEventListener("change", (e) => {
	// 			if (e.matches) {
	// 				console.log("切换到独立模式");
	// 			} else {
	// 				console.log("切换到浏览器模式");
	// 			}
	// 		});
	// });
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<main class="w-screen h-screen text-gray-900">
	{@render children()}
</main>

{#if $updated}
	<div fixed bottom-0 left-0 flex-bc p-1 z-9999 bg-black text-white w-full h-18 p-4>
		<p>
			发现新版本可用
		</p>
		<button bg-sky rounded-1 px-2 py-1 onclick={() => location.reload()}> 刷新 </button>
	</div>
{/if}
