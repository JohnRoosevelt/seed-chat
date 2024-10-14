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

<Header>
  {book.title}
  {book.name?.zh}
  第 {chapter.id} 章
</Header>

<article scroll-y w-full px-5 text-7 class="h-[calc(100vh-144px)]">
  <p>
    {#each chapter.verses as verse}
      <sup ml-1 class="text-{book.title == '旧约' ? 'blue' : 'green'}"
        >{verse.id}
      </sup>
      {verse.text.zh}
    {/each}
  </p>
</article>

<footer w-full h-72px px-5 flex-bc font-700>
  <a href="/bibles/{$page.params.bookId}/{$page.params.chapterId - 1}">
    上一章
  </a>

  <button>章节目录</button>

  <button>圣经目录 </button>

  <a href="/bibles/{$page.params.bookId}/{$page.params.chapterId - 1 + 2}">
    下一章
  </a>
</footer>
