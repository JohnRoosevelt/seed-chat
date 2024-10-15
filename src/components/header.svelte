<script>
	let { children, color } = $props()
</script>

<!-- backdrop-blur-4 -->
<div fixed top-0 z-9 bg-white w-full h-72px px-5 flex-bc class="text-{color}">
  {@render children()}
</div>