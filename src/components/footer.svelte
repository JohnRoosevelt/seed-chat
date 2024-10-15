<script>
	import { page } from "$app/stores";
  // $effect(() => {
  //   console.log($page)
  // })
</script>

<footer fixed bottom-0 z-9 w-full h-72px flex-bc px-8 bg-gray-50>
  <a href="/" flex-cc flex-col class:text-blue={$page.url.pathname === "/"}>
    <span i-carbon-home text-4xl> </span>
    <span text-xs uppercase> 首页 </span>
  </a>

  <a href="/bible" flex-cc flex-col class:text-blue={$page.url.pathname === "/bible"}>
    <span i-icons-bible text-4xl> </span>
    <span text-xs uppercase> 圣经 </span>
  </a>

  <a href="/sda" flex-cc flex-col class:text-blue={$page.url.pathname === "/sda"}>
    <span i-icons-sda text-4xl> </span>
    <span text-xs uppercase> 怀著 </span>
  </a>

  <a href="/music" flex-cc flex-col class:text-blue={$page.url.pathname === "/music"}>
    <span i-carbon-music text-4xl> </span>
    <span text-xs uppercase> 音乐 </span>
  </a>

  <a href="/user" flex-cc flex-col class:text-blue={$page.url.pathname === "/user"}>
    <span alt="icon" i-carbon-user-settings text-4xl></span>
    <span text-xs uppercase> 我的 </span>
  </a>
</footer>
