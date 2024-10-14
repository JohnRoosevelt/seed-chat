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

<article w-full px-5 class="min-h-[calc(100vh-72px)]">
  <p>
    {#each chapter.verses as verse}
      <sub ml-1 class="text-{book.title == '旧约' ? 'blue': 'green'}">{verse.id} </sub>
      {verse.text.zh}
    {/each}
  </p>
</article>
