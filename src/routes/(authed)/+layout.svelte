<script>
	import { page } from "$app/stores";
	let { data, children } = $props()

</script>

<article data-theme="ato" class="w-screen h-screen flex flex-col bg-gray-50">
	<header class="bg-red hidden">header</header>

	<main scroll-y class="h-[calc(100vh-72px)]">
		{@render children()}
	</main>

	<footer class="h-72px flex items-center justify-between" px-10>
		<a href="/" flex flex-col class:text-blue={$page.url.pathname === "/"}>
			<span i-carbon-chat text-4xl> </span>
			<span text-xs uppercase> 消息 </span>
		</a>

		<a href="/my" flex flex-col class:text-blue={$page.url.pathname === "/my"}>
			<span alt="icon" i-carbon-user-settings text-4xl></span>
			<span text-xs uppercase> 我的 </span>
		</a>
	</footer>
</article>
