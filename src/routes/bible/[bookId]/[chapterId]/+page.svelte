<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";

  const { data } = $props();
  
  let textSize = $state(7);
</script>

<Header
  back={() => history.back()}
  color={data.book.title == "旧约" ? "blue" : "green"}
>
  <a href="/bible" flex-cc>
    <span i-carbon-chevron-left text-2xl></span>
    <span> 返回 </span>
  </a>

  <div>
    {data.book.title}
    {data.book.name?.zh}
    第 {data.chapter?.id} 章
  </div>

  <div space-x-2px>
    <button aria-label="-" onclick={() => (textSize > 4 ? textSize-- : "")}>
      <span i-ic-outline-text-decrease></span>
    </button>
    <span>{textSize}</span>
    <button aria-label="+" onclick={() => (textSize < 7 ? textSize++ : "")}>
      <span i-ic-outline-text-increase></span>
    </button>
  </div>
</Header>

<article w-full px-5 py-72px class="text-{textSize}">
  <p>
    {#each data.chapter?.verses as verse}
      <sup ml-1 class="text-{data.book.title == '旧约' ? 'blue' : 'green'}"
        >{verse.id}
      </sup>
      {verse.text.zh}
    {/each}
  </p>
</article>

<footer
  fixed
  bottom-0
  w-full
  h-72px
  px-5
  backdrop-blur-40
  bg-white
  flex-bc
  class="text-{data.book.title == '旧约' ? 'blue' : 'green'}"
>
  <a
    data-sveltekit-replacestate
    href="/bible/{$page.params.bookId}/{$page.params.chapterId - 1}"
  >
    上一章
  </a>

  <button>章节目录</button>

  <button>圣经目录 </button>

  <a
    data-sveltekit-replacestate
    href="/bible/{$page.params.bookId}/{Number($page.params.chapterId) + 1}"
  >
    下一章
  </a>
</footer>
