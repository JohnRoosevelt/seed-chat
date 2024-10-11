<script>
	import Footer from '$com/footer.svelte'
	let { children } = $props()
</script>

<article data-theme="ato" class="w-screen h-screen flex flex-col">
	<main scroll-y class="h-[calc(100vh-72px)]" bg-gray-100>
		{@render children()}
	</main>

	<Footer />
</article>
