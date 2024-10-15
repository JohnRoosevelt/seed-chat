<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";
  import { initData } from "$lib/data.svelte";
  import { goto } from "$app/navigation";

  let book = $state({});
  let chapter = $state({});
  $effect.pre(() => {
    book = initData.datas.bible.find((i) => i.id == $page.params.bookId);
    chapter = book.chapters.find((i) => i.id == $page.params.chapterId);
    
    if ($page.params.chapterId == 0) {
      let preBook, chapterId;

      if ($page.params.bookId == 1) {
        preBook = book;
        chapterId = 1
      } else {
        preBook = initData.datas.bible.find(
          (i) => i.id == Number($page.params.bookId) - 1,
        );
        chapterId = preBook.chapters.length
      }
      goto(`/bible/${preBook.id}/${chapterId}`, {
        replaceState: true,
      });
    }

    if ($page.params.chapterId > book.chapters.length) {
      let nextBook, chapterId;

      if ($page.params.bookId == initData.datas.bible.length) {
        nextBook = book;
        chapterId = book.chapters.length
      } else {
        nextBook = initData.datas.bible.find(
          (i) => i.id == Number($page.params.bookId) + 1,
        );
        chapterId = 1
      }
      goto(`/bible/${nextBook.id}/${chapterId}`, {
        replaceState: true,
      });
    }
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
    第 {chapter?.id} 章
  </div>
</Header>

<article w-full px-5 text-7 py-72px>
  <p>
    {#each chapter?.verses as verse}
      <sup ml-1 class="text-{book.title == '旧约' ? 'blue' : 'green'}"
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
  class="text-{book.title == '旧约' ? 'blue' : 'green'}"
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
