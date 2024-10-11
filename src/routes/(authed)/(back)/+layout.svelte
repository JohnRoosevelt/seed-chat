<script>
	const { children } = $props();
</script>
<article w-screen h-screen bg-gray-100 flex flex-col>
	{@render children()}
</article>