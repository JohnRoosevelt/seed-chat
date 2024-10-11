<script>
	import { page } from "$app/stores";
  // $effect(() => {
  //   console.log($page)
  // })
</script>

<footer class="h-72px flex items-center justify-between" px-10 bg-gray-50>
  <a href="/public/articles" flex flex-col class:text-blue={$page.url.pathname === "/public/articles"}>
    <span i-carbon-home text-4xl> </span>
    <span text-xs uppercase> 文章 </span>
  </a>

  <a href="/msgs" flex flex-col class:text-blue={$page.url.pathname === "/msgs"}>
    <span i-carbon-chat text-4xl> </span>
    <span text-xs uppercase> 消息 </span>
  </a>

  <a href="/user" flex flex-col class:text-blue={$page.url.pathname === "/user"}>
    <span alt="icon" i-carbon-user-settings text-4xl></span>
    <span text-xs uppercase> 我的 </span>
  </a>
</footer>
