<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";
  import { initData } from "$lib/data.svelte";
  import Chapter from "$com/bible/chapter.index.svelte";

  let book = $state({});
  $effect.pre(() => {
    book = initData.datas.bible.find((i) => i.id == $page.params.bookId);
    console.log(book);
  });
</script>

<Header back={() => history.back()}>
  {book.title}
  {book.name?.zh} 目录
</Header>

<article scroll-y w-full flex-cc text-7 class="h-[calc(100vh-72px)]">
  <Chapter {book} />
</article>
