<script>
	import Footer from '$com/footer.svelte'
	let { children } = $props()
</script>

<article w-full min-h-screen flex-cc flex-col pb-72px sm="pb-0 pl-72px">
	{@render children()}
</article>

<Footer />
