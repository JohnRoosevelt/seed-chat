<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";
  import { getDB } from "$lib/datas/bible";
  import Books from "./books.svelte";
  import Chpater from "./chpater.svelte";

  const { data } = $props();

  let fontSize = $state(7);
  let settingDB;
  $effect(async () => {
    if (!settingDB) {
      settingDB = getDB("setting");
    }

    const dbFontSize = await settingDB.getItem("fontSize");
    if (!dbFontSize) {
      await settingDB.setItem("fontSize", fontSize);
      return;
    }
    fontSize = dbFontSize;
  });

  async function onFontSizeChange(isBigger) {
    isBigger ? (fontSize < 7 ? fontSize++ : fontSize) : fontSize > 4 ? fontSize-- : fontSize;
    await settingDB.setItem("fontSize", fontSize);
  }

  // console.log(data.chapter)
  let longPressTimer;
  let contextMenuVisible = $state(false);
  let selectedText;
  let menuPosition = $state({ x: 0, y: 0 });

  const handleTouchStart = (event) => {
    event.preventDefault();
    longPressTimer = setTimeout(() => {
      const selection = window.getSelection();
      if (selection.toString()) {
        selectedText = selection.toString();
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        menuPosition = { x: rect.x + window.scrollX, y: rect.y + window.scrollY + rect.height };
        contextMenuVisible = true;
      }
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectedText);
      alert("已复制到剪贴板: " + selectedText);
    } catch (err) {
      console.error("复制失败:", err);
    }
    contextMenuVisible = false;
  };

  const hideContextMenu = () => {
    contextMenuVisible = false;
  };

  $effect(() => {
    document.addEventListener("touchend", hideContextMenu);
    return () => {
      document.removeEventListener("touchend", hideContextMenu);
    };
  });
</script>

<Header back={() => history.back()} color="green">
  <a href="/sda" flex-cc>
    <span i-carbon-chevron-left text-2xl></span>
    <span> 返回 </span>
  </a>

  <div underline underline-offset-8>
    {data.book.name}
  </div>

  <div space-x-2px>
    <button aria-label="-" onclick={() => onFontSizeChange(false)}>
      <span i-ic-outline-text-decrease></span>
    </button>
    <span>{fontSize}</span>
    <button aria-label="+" onclick={() => onFontSizeChange(true)}>
      <span i-ic-outline-text-increase></span>
    </button>
  </div>
</Header>

<article w-full px-5 py-12 space-y-2 class="text-{fontSize}">
  {#each data.chapter?.content as verse}
    <p
      relative
      select-text
      bg-white
      ontouchstart={handleTouchStart}
      ontouchend={handleTouchEnd}
      class={verse.t == 2
        ? "flex-cc h-10 sticky top-12 z-3 text-5 font-500"
        : verse.t == 4
          ? "h-8 sticky top-21 z-3 text-5 font-500"
          : ""}
    >
      {#if verse.t == 7}
        <span absolute text-green select-none>
          {verse.p}˼
        </span>
      {/if}
      {verse.c.zh}
    </p>
  {/each}
</article>

{#if contextMenuVisible}
  <div class="context-menu" style="left: {menuPosition.x}px; top: {menuPosition.y}px;">
    <button onclick={copyToClipboard}>复制</button>
  </div>
{/if}

<footer fixed bottom-0 w-full h-12 px-5 backdrop-blur-40 bg-white flex-bc text-green>
  <a data-sveltekit-replacestate href="/sda/{$page.params.bookId}/{$page.params.chapterId - 1}"> 上一章 </a>

  <Books books={data.books} />

  <Chpater book={data.book} curIndex={$page.params.chapterId} />

  <a data-sveltekit-replacestate href="/sda/{$page.params.bookId}/{Number($page.params.chapterId) + 1}"> 下一章 </a>
</footer>

<style>
  .context-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }

  .context-menu button {
    padding: 10px;
    border: none;
    background: none;
    cursor: pointer;
  }

  .context-menu button:hover {
    background-color: #f0f0f0;
  }
</style>
