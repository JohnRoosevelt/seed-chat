<script>
  import Back from "$com/back.svelte";
  import { page } from "$app/stores";
  import { getDB } from "$lib/datas/bible";
  import Books from "./books.svelte";
  import Chpater from "./chpater.svelte";

  const { data } = $props();

  let selectedP = $state({})
  let selectedInfo = {pIndex: '', selectedText: '', index: ''}
  let colorContent = $state({})
  let fontSize = $state(7);
  let decorationColor = $state('red');
  let contextMenuVisible = $state(false);
  let menuPosition = $state({ x: 0, y: 0 });

  let settingDB;
  $effect(async () => {
    if (!settingDB) {
      settingDB = getDB("setting");
    }

    const dbFontSize = await settingDB.getItem("fontSize");
    if (!dbFontSize) {
      await settingDB.setItem("fontSize", fontSize);
    } else {
      fontSize = dbFontSize;
    }

    const dbDecorationColor = await settingDB.getItem("decorationColor");
    if (!dbDecorationColor) {
      await settingDB.setItem("decorationColor", decorationColor);
    } else {
      decorationColor = dbDecorationColor
    }
  });

  async function copyToClipboard () {
    try {
      //  + '/n' + data.book.name + ''
      const content = `${selectedInfo.selectedText}   ${selectedInfo.pIndex}˼ \n —— ${data.book.name} ${data.chapter.name} `
      console.log({content})
      await navigator.clipboard.writeText(content);
      alert("已复制到剪贴板: " + content);
    } catch (err) {
      console.error("复制失败:", err);
    }
    contextMenuVisible = false;
  };

  function splitTextWithAttributes(i) {
    const text = data.chapter.content[i].c.zh
    const delimiters = colorContent[i]

    const regex = new RegExp(`(${delimiters.map(d => d.text).join('|')})`, 'g');

    const parts = text.split(regex);

    const filteredParts = parts.filter(part => part !== '');

    let result = '';
    for (let i = 0; i < filteredParts.length; i++) {
      const delimiterObj = delimiters.find(d => d.text === filteredParts[i]);
      result +=  Boolean(delimiterObj) ? `<span style="background: ${delimiterObj.color}">${filteredParts[i]}</span>` : filteredParts[i];
    }

    return result;
  }

  async function lightContent(event) {
    const spanElement = event.currentTarget.querySelector('span');
    if (spanElement) {
      const color = getComputedStyle(spanElement).backgroundColor;
      console.log('Clicked span background color:', color, selectedInfo);
      colorContent[selectedInfo.index] = colorContent[selectedInfo.index] || []
      colorContent[selectedInfo.index].push({text: selectedInfo.selectedText, color})
    }
    contextMenuVisible = false;
  }

  function handleSelectionChange() {
    const selection = window.getSelection();
    if (selection.toString()) {
      const selectedText = selection.toString();
      // extractNumbers(selectedText);

      const range = selection.getRangeAt(0);
      const commonAncestor = range.commonAncestorContainer;

      let parentElement = commonAncestor;
      if (commonAncestor.nodeType === Node.TEXT_NODE) {
        parentElement = commonAncestor.parentNode;
        const pIndex = parentElement.getAttribute("data-p");
        const index = parentElement.getAttribute("data-i");
        if (pIndex) {
          selectedInfo = { pIndex, selectedText, index }
          
        }
      } 

      const rect = selection.getRangeAt(0).getBoundingClientRect();
      // menuPosition = { x: rect.x + window.scrollX, y: rect.y + window.scrollY + rect.height };
      let menuY = rect.y + window.scrollY + rect.height; // 初始 y 位置

      // 限制菜单不超出视口
      const menuHeight = 50; // 假设菜单高度为50px
      if (menuY + menuHeight > window.innerHeight) {
          menuY = window.innerHeight - menuHeight; // 调整 y 位置
      }
      menuPosition = { x: 20, y: menuY };
      contextMenuVisible = true;
      return;
    }

    contextMenuVisible = false;
  }

  $effect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  });

  function onSelectChange(i) {
    if (selectedP[i]) {
      delete selectedP[i]
      return
    }
    selectedP[i] = 1
  }
</script>

<svelte:head>
  <title>{data.book.name} {data.chapter?.content[0]?.c.zh}</title>
</svelte:head>

<Back>
  {#snippet backText()}
    <div underline underline-offset-8 truncate>
      {data.book?.name}
    </div>
  {/snippet}

  {#snippet title()}
    <div truncate>
      {data.chapter.name}
    </div>
  {/snippet}

  <article w-full px-5 pb-12 space-y-2 class="text-{fontSize}">
    {#each data.chapter?.content as verse, i}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <p onclick={() => onSelectChange(i)}
        data-p={verse.p}
        data-i={i}
        class:line={selectedP[i]}
        class="tp{verse.t} decoration-{decorationColor}"
      >
        {#if verse.t == 7}
          <span absolute z-0 text-green>
            {verse.p}˼
          </span>
        {/if}
        {#if colorContent[i]}
          {@html splitTextWithAttributes(i)}
        {:else}
          {verse.c.zh}
        {/if}
      </p>
    {/each}
  </article>
</Back>

{#if contextMenuVisible}
  <div absolute z-9 bg-white border-px border-gray flex-cc rounded-1 style="left: {menuPosition.x}px; top: {menuPosition.y}px;">
    <button p-2 hover="bg-[#f0f0f0]" onclick={copyToClipboard}>复制</button>
    <button aria-label="color" p-2 hover="bg-[#f0f0f0]" onclick={lightContent}>
      <span block bg-red w-5 h-5></span>
    </button>
    <button aria-label="color" p-2 hover="bg-[#f0f0f0]" onclick={lightContent}>
      <span block bg-blue w-5 h-5></span>
    </button>
    <button aria-label="color" p-2 hover="bg-[#f0f0f0]" onclick={lightContent}>
      <span block bg-green w-5 h-5></span>
    </button>
    <button aria-label="color" p-2 hover="bg-[#f0f0f0]" onclick={lightContent}>
      <span block bg-sky w-5 h-5></span>
    </button>
    <button aria-label="color" p-2 hover="bg-[#f0f0f0]" onclick={lightContent}>
      <span block bg-teal w-5 h-5></span>
    </button>
  </div>
{/if}

<footer fixed z-9 bottom-0 w-full h-12 px-5 backdrop-blur-40 bg-white flex-bc text-green>
  <a data-sveltekit-replacestate href="/sda/{$page.params.bookId}/{$page.params.chapterId - 1}"> 上一章 </a>

  <Books books={data.books} />

  <Chpater book={data.book} curIndex={$page.params.chapterId} />

  <a data-sveltekit-replacestate href="/sda/{$page.params.bookId}/{Number($page.params.chapterId) + 1}"> 下一章 </a>
</footer>

<style>
  .text-4 {
    .tp7 {
      text-indent: 2rem;
      span {
        text-indent: -2rem;
      }
    }
  }
  .text-5 {
    .tp7 {
      text-indent: 2.5rem;
      span {
        text-indent: -2.5rem;
      }
    }
  }

  .text-6 {
    .tp7 {
      text-indent: 3rem;
      span {
        text-indent: -3rem;
      }
    }
  }

  .text-7 {
    .tp7 {
      text-indent: 3.5rem;
      span {
        text-indent: -3.5rem;
      }
    }
  }
</style>
