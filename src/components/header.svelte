<script>
	let { children, color } = $props()
</script>

<!-- backdrop-blur-4 -->
<div fixed top-0 z-9 bg-gray-50 w-full h-12 px-5 font-500 flex-bc class="text-{color}">
  {@render children()}
</div>