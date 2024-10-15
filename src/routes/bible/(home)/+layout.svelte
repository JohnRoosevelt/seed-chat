<script>
	import Footer from '$com/footer.svelte'
	let { children } = $props()
</script>

<article w-full h-full flex-cc pb-72px>
	{@render children()}
</article>

<Footer />
