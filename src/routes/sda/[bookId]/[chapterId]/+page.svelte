<script>
  import Back from "$com/back.svelte";
  import { page } from "$app/stores";
  import Books from "./books.svelte";
  import Chpater from "./chpater.svelte";
  import { clickOutside } from '$com/clickOutside';

  const { data } = $props();

  let selectedInfo = {pIndex: '', selectedText: '', index: '', jIndex: ''}
  let notes = $state(data.notes)
  let contextMenuVisible = $state(false);
  let menuPosition = $state({ x: 0, y: 0 });

  $effect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
 
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
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
    const delimiters = notes[i]

    const regex = new RegExp(`(${delimiters.map(d => d.text).join('|')})`, 'g');

    const parts = text.split(regex);

    const filteredParts = parts.filter(part => part !== '');

    let result = [];
    for (let i = 0; i < filteredParts.length; i++) {
      const delimiterObj = delimiters.find(d => d.text === filteredParts[i]);
      result.push({
        content: filteredParts[i],
        isDelimiter: Boolean(delimiterObj), 
        ...delimiterObj
      })
    }

    return result;
  }

  async function lightContent(event) {
    const obj = {text: selectedInfo.selectedText}
    const spanElement = event.currentTarget.querySelector('span');
    if (spanElement) {
      obj.color = event.currentTarget.getAttribute("data-color");
    } else {
      obj.line = event.currentTarget.getAttribute("data-line");
    }
    notes[selectedInfo.index] = notes[selectedInfo.index] || []
    const index = notes[selectedInfo.index].findIndex(i => i.text == obj.text)
    if (index == -1) {
      notes[selectedInfo.index].push(obj)
    } else {
      notes[selectedInfo.index].splice(index, 1)
      if(Object.keys(notes[selectedInfo.index]).length === 0) {
        delete notes[selectedInfo.index]
      }
    }
    contextMenuVisible = false;
    await data.setNotes($state.snapshot(notes))
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
      let menuY = rect.y + window.scrollY + rect.height + 5; // 初始 y 位置

      menuPosition = { x: 20, y: menuY };
      contextMenuVisible = true;
      return;
    }

    contextMenuVisible = false;
  }

  function onSelectChange(event) {
    const target = event.currentTarget;
    const range = document.createRange();
    range.selectNodeContents(target); // 选择目标元素的内容
    
    const selection = window.getSelection();
    selection.removeAllRanges(); // 清除之前的选择
    selection.addRange(range); // 添加新的选择范围
    
    const pIndex = target.getAttribute("data-p");
    const index = target.getAttribute("data-i");
    if (pIndex) {
      selectedInfo = { pIndex, selectedText: selection.toString(), index }
      console.log({selectedInfo})
    }

    const rect = target.getBoundingClientRect();
    const {y, height} = rect;
    console.log({y, height}, window.scrollY)
    menuPosition = { x: 20, y: y + height + window.scrollY + 5 };
    contextMenuVisible = true;
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

  <article w-full px-5 pb-12 space-y-2 class="text-{data.fontSize}">
    {#each data.chapter?.content as verse, i}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- ondblclick={() => onSelectChange(i)} -->
      <!-- class:select-all={selectedP[i]} -->
      <!-- class:line={selectedP[i]} -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div>
        {#if verse.t == 7}
          <span absolute z-0 text-green>
            {verse.p}˼
          </span>
        {/if}
        <p
        ondblclick={onSelectChange}
        data-p={verse.p}
        data-i={i}
        class="tp{verse.t}"
        >
          {#if notes[i]}
            {@const rz = splitTextWithAttributes(i)}
            {#each rz as ri}
              {#if ri.isDelimiter}
                <span data-p={verse.p} data-i={i} onclick={onSelectChange} class={`${ri.line ? 'line decoration-orange decoration-' + ri.line : ''} ${ri.color ? 'bg-' + ri.color : ''}`}>
                  {ri.content}
                </span>
              {:else}
                {ri.content}
              {/if}
            {/each}
          {:else}
            {verse.c.zh}
          {/if}
        </p>
      </div>
    {/each}
  </article>
</Back>

{#if contextMenuVisible}
  <div use:clickOutside absolute z-999999 bg-white border-px border-gray flex-cc rounded-1 style="left: {menuPosition.x}px; top: {menuPosition.y}px;">
    <button p-2 hover="bg-[#f0f0f0]" onclick={copyToClipboard}>复制</button>
    <button class:opacity-40={false} aria-label="color" p-2 hover="bg-[#f0f0f0]" data-line="solid" line decoration-solid decoration-orange onclick={lightContent}>
      A
    </button>
    <button class:opacity-40={false} aria-label="color" p-2 hover="bg-[#f0f0f0]" data-line="wavy" line decoration-wavy decoration-orange onclick={lightContent}>
      A
    </button>
    <button class:opacity-40={false} aria-label="color" p-2 hover="bg-[#f0f0f0]" data-color="red" onclick={lightContent}>
      <span flex-cc bg-red w-5 h-5>A</span>
    </button>
    <button class:opacity-40={false} aria-label="color" p-2 hover="bg-[#f0f0f0]" data-color="blue" onclick={lightContent}>
      <span flex-cc bg-blue w-5 h-5>A</span>
    </button>
    <button class:opacity-40={false} aria-label="color" p-2 hover="bg-[#f0f0f0]" data-color="green" onclick={lightContent}>
      <span flex-cc bg-green w-5 h-5>A</span>
    </button>
    <button class:opacity-40={false} aria-label="color" p-2 hover="bg-[#f0f0f0]" data-color="sky" onclick={lightContent}>
      <span flex-cc bg-sky w-5 h-5>A</span>
    </button>
    <button class:opacity-40={false} aria-label="color" p-2 hover="bg-[#f0f0f0]" data-color="teal" onclick={lightContent}>
      <span flex-cc bg-teal w-5 h-5>A</span>
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
