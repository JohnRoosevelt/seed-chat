<script>
	import Footer from '$com/footer.svelte'
	let { children } = $props()
</script>

<article scroll-y w-full flex-cc class="min-h-[calc(100vh-72px)]">
	{@render children()}
</article>

<Footer />
