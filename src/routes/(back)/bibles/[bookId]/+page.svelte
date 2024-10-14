<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";
  import { initData } from "$lib/data.svelte";

  let book = $state.raw({});
  $effect.pre(() => {
    book = initData.datas.bible.find((i) => i.id == $page.params.bookId);
  });
</script>

<Header>
  {book.title}
  {book.name?.zh} 目录
</Header>

<article scroll-y w-full flex-cc text-7 class="h-[calc(100vh-72px)]">
  <div w-full grid grid-cols-6 gap-px>
    {#each book.chapters as chapter}
      <a
        href="/bibles/{book.id}/{chapter.id}"
        flex-cc
        h-12
        relative
        class="bg-{book.title == '旧约' ? 'blue' : 'green'}"
      >
        {chapter.id}章
      </a>
    {/each}
  </div>
</article>
