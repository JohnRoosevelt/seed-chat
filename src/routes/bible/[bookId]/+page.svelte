<script>
  import Header from "$com/header.svelte";
  import Chapter from "$com/bible/chapter.index.svelte";

  const { data } = $props();
  const { book = {} } = data;
</script>

<Header back={() => history.back()}>
  {book.title}
  {book.name?.zh} 目录
</Header>

<article scroll-y w-full flex-cc text-7 class="h-[calc(100vh-72px)]">
  <Chapter {book} />
</article>
