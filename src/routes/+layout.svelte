<script>
	import "uno.css";
	import "ato-ui/themes/ato.css";
	import "@unocss/reset/tailwind.css";
	import "dayjs/locale/zh-cn"; // German locale
  import { dayjs } from "svelte-time";

  // Set the default locale to German.
  dayjs.locale('zh-cn');
	const { children } = $props();

</script>

<main
	class="flex-cc w-full min-h-screen bg-gray-100"
	sm="w-[390px]"
>
	{@render children()}
</main>
