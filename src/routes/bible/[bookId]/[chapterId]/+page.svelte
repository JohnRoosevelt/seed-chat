<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";
  import { initData } from "$lib/data.svelte";

  let book = $state.raw({});
  let chapter = $state.raw({});
  $effect.pre(() => {
    book = initData.datas.bible.find((i) => i.id == $page.params.bookId);
    chapter = book.chapters.find((i) => i.id == $page.params.chapterId);
  });
</script>

<Header
  back={() => history.back()}
  color={book.title == "旧约" ? "blue" : "green"}
>
  <a href="/bible" flex-cc>
    <span i-carbon-chevron-left text-2xl></span>
    <span> 返回 </span>
  </a>

  <div flex-1 flex-cc>
    {book.title}
    {book.name?.zh}
    第 {chapter.id} 章
  </div>
</Header>

<article  w-full px-5 text-7 py-72px>
  <p>
    {#each chapter.verses as verse}
      <sup ml-1 class="text-{book.title == '旧约' ? 'blue' : 'green'}"
        >{verse.id}
      </sup>
      {verse.text.zh}
    {/each}
  </p>
</article>

<footer fixed bottom-0
  w-full
  h-72px
  px-5
  backdrop-blur-40
  bg-white
  flex-bc
  class="text-{book.title == '旧约' ? 'blue' : 'green'}"
>
  <a href="/bible/{$page.params.bookId}/{$page.params.chapterId - 1}">
    上一章
  </a>

  <button>章节目录</button>

  <button>圣经目录 </button>

  <a href="/bible/{$page.params.bookId}/{$page.params.chapterId - 1 + 2}">
    下一章
  </a>
</footer>
