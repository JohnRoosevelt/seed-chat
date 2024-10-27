<script>
	import { page } from "$app/stores";
  // $effect(() => {
  //   console.log($page)
  // })
</script>

<footer fixed flex-bc px-8 bg-gray-50 z-9 bottom-0 w-full h-72px sm="left-0 w-72px h-full flex-col flex-ac">
  <a href="/" data-sveltekit-replacestate flex-cc flex-col class:text-blue={$page.url.pathname === "/"}>
    <span i-carbon-home text-4xl> </span>
    <span text-xs uppercase> 首页 </span>
  </a>

  <a href="/sda" data-sveltekit-replacestate flex-cc flex-col class:text-blue={$page.url.pathname === "/sda"}>
    <span i-icons-sda text-4xl> </span>
    <span text-xs uppercase> 怀著 </span>
  </a>
  
  <a href="/bible" data-sveltekit-replacestate flex-cc flex-col class:text-blue={$page.url.pathname === "/bible"}>
    <span i-icons-bible text-4xl> </span>
    <span text-xs uppercase> 圣经 </span>
  </a>

  <a href="/music" data-sveltekit-replacestate flex-cc flex-col class:text-blue={$page.url.pathname === "/music"}>
    <span i-carbon-music text-4xl> </span>
    <span text-xs uppercase> 音乐 </span>
  </a>

  <a href="/user" data-sveltekit-replacestate flex-cc flex-col class:text-blue={$page.url.pathname === "/user"}>
    <span alt="icon" i-carbon-user-settings text-4xl></span>
    <span text-xs uppercase> 我的 </span>
  </a>
</footer>
