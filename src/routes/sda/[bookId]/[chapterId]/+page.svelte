<script>
  import Back from "$com/back.svelte";
  import { page } from "$app/stores";
  import { getDB } from "$lib/datas/bible";
  import Books from "./books.svelte";
  import Chpater from "./chpater.svelte";

  const { data } = $props();

  let selectedP = $state({})
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
  let contextMenuVisible = $state(false);
  let selectedText;
  let menuPosition = $state({ x: 0, y: 0 });

  const copyToClipboard = async () => {
    console.log("copy to clipboard", selectedText);
    try {
      await navigator.clipboard.writeText(selectedText);
      alert("已复制到剪贴板: " + selectedText);
    } catch (err) {
      console.error("复制失败:", err);
    }
    contextMenuVisible = false;
  };

  function extractNumbers(text) {
    const regex = /(?<=\n\n).*?(?=˼)/g;
    // const regex = /(^\n.*?˼)/gm;
    const extractedNumbers = text.match(regex) || [];
    const splitText = text.split(regex);
    console.log("提取出的数字:", extractedNumbers, { splitText });
    for (let index = 0; index < splitText.length; index++) {
      const text = splitText[index].replace("\n\n", "").replace("˼　　", "");
      let p = index == 0 ? extractedNumbers[index] - 1 : extractedNumbers[index - 1] - 1 + 1;
      console.log({ text, p });
      if (!p) {
        console.log("xxx");
        const pi = data.chapter?.content.find((verse) => {
          console.log(verse);
          return verse.c.zh.includes(text);
        });
        console.log(pi);
      }
    }
  }

  function handleSelectionChange() {
    const selection = window.getSelection();
    const selectedData = [];
    if (selection.toString()) {
      selectedText = selection.toString();
      // extractNumbers(selectedText);

      const range = selection.getRangeAt(0);
      const commonAncestor = range.commonAncestorContainer;

      let parentElement = commonAncestor;
      if (commonAncestor.nodeType === Node.TEXT_NODE) {
        parentElement = commonAncestor.parentNode;
        const dataPValue = parentElement.getAttribute("data-p");
        if (dataPValue) {
          selectedData.push({ dataP: dataPValue, text: selectedText });
        }
      } 

      console.log("选中的数据:", selectedData);

      const rect = selection.getRangeAt(0).getBoundingClientRect();
      menuPosition = { x: rect.x + window.scrollX, y: rect.y + window.scrollY + rect.height };
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
    <div underline underline-offset-8>
      {data.book?.name}
    </div>
  {/snippet}

  {#snippet title()}
    <div>
      {data.chapter.name}
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
  {/snippet}

  <article w-full px-5 pb-12 space-y-2 class="text-{fontSize}">
    {#each data.chapter?.content as verse, i}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <p onclick={() => onSelectChange(i)}
        data-p={verse.p}
        class:line={selectedP[i]}
        class="tp{verse.t}"
      >
        {#if verse.t == 7}
          <span absolute z-0 text-green>
            {verse.p}˼
          </span>
        {/if}
        {verse.c.zh}
      </p>
    {/each}
  </article>
</Back>

{#if contextMenuVisible}
  <div class="context-menu" style="left: {menuPosition.x}px; top: {menuPosition.y}px;">
    <button onclick={copyToClipboard}>高亮</button>
  </div>
{/if}

<footer fixed bottom-0 w-full h-12 px-5 backdrop-blur-40 bg-white flex-bc text-green>
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
