<script>
	import "uno.css";
	import "ato-ui/themes/ato.css";
	import "@unocss/reset/tailwind.css";
	import "dayjs/locale/zh-cn"; // German locale
  import { dayjs } from "svelte-time";
	import { navigating } from '$app/stores';
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
