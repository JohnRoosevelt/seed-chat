<script>
  import Home from "$com/home.svelte";

  const { data } = $props();
  console.log({data})
</script>

<svelte:head>
  <title> 我的 </title>
</svelte:head>

<Home>
  <article w-full flex-1 p-4 bg-gray100 space-y-4>
    <section bg-white rounded-2 p-8 space-y-4>
      <div>用户信息</div>
      <div space-x-1 flex-cc>
        <span>设备信息:</span>
        <span text-gray text-5 class:i-ic-baseline-apple={data.isMac} class:i-material-symbols-android={data.isAndroid} class:i-mdi-microsoft-windows-classic={data.isWindows} ></span>
        <span text-gray text-5 class:i-carbon-mobile={data.isMobile} class:i-ic-outline-desktop-mac={!data.isMobile} ></span>
        <span text-gray text-5 class:i-carbon-app={data.isStandalone} class:i-mdi-web={!data.isStandalone} ></span>
        <div flex-1></div>
      </div>
    </section>

    <section bg-white rounded-2 py-8 grid grid-cols-3 gap-8 md="grid-cols-4" lg="grid-cols-5">
      <a href="/my/about" flex-cc flex-col space-y-2>
        <span i-carbon-bee-bat text-green600 text-2xl></span>
        <div>免责声明</div>
      </a>
  
      <a href="/about" flex-cc flex-col space-y-2>
        <span i-carbon-phone text-blue600 text-2xl></span>
        <div>反馈建议</div>
      </a>
  
      <a href="/about" flex-cc flex-col space-y-2>
        <span i-carbon-car text-orange300 text-2xl ></span>
        <div>反馈建议</div>
      </a>
  
      <a href="my/setting" flex-cc flex-col space-y-2>
        <span i-carbon-edit-filter text-red600 text-2xl></span>
        <div>阅读偏好</div>
      </a>

      <a href="/about" flex-cc flex-col space-y-2>
        <span i-carbon-message-queue  text-sky text-2xl></span>
        <div>我的笔记</div>
      </a>

      <a href="/about" flex-cc flex-col space-y-2>
        <span i-carbon-connect-target rotate-90 text-pink text-2xl></span>
        <div>我的下载</div>
      </a>

      <a href="/about" flex-cc flex-col space-y-2>
        <span i-carbon-fog text-lime text-2xl></span>
        <div>浏览历史</div>
      </a>

      <a href="/about" flex-cc flex-col space-y-2>
        <span i-carbon-book text-teal text-2xl></span>
        <div>我的消息</div>
      </a>
    </section>
  </article>
</Home>
