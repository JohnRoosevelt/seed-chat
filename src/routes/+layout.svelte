<script>
	import "uno.css";
	import "ato-ui/themes/ato.css";
	import "@unocss/reset/tailwind.css";
	const { children } = $props();

</script>

<main
	class="flex justify-center items-center w-full"
	sm="w-[390px]"
>
	{@render children()}
</main>
