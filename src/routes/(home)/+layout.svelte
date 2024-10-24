<script>
	import Footer from '$com/footer.svelte'
	let { children } = $props()
</script>

<article w-full flex-cc flex-col pb-72px>
	{@render children()}
</article>

<Footer />
