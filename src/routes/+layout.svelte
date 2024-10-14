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
	class="w-screen h-screen"
	sm="w-[390px]"
>
	{@render children()}
</main>
