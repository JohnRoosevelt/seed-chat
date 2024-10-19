<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";
  import { initData } from "$lib/data.svelte";
  import { goto } from "$app/navigation";

  let book = $state({});
  let chapter = $state({});
  let textSize = $state(7);
  $effect.pre(() => {
    book = initData.datas.sda.find((i) => i.id == $page.params.bookId);
    chapter = book.chapters[Number($page.params.chapterId - 1)];
    console.log(book, chapter);

    if ($page.params.chapterId == 0) {
      let preBook, chapterId;

      if ($page.params.bookId == 1) {
        preBook = book;
        chapterId = 1;
      } else {
        preBook = initData.datas.bible.find(
          (i) => i.id == Number($page.params.bookId) - 1,
        );
        chapterId = preBook.chapters.length;
      }
      goto(`/sda/${preBook.id}/${chapterId}`, {
        replaceState: true,
      });
    }

    if ($page.params.chapterId > book.chapters.length) {
      let nextBook, chapterId;

      if ($page.params.bookId == initData.datas.bible.length) {
        nextBook = book;
        chapterId = book.chapters.length;
      } else {
        nextBook = initData.datas.bible.find(
          (i) => i.id == Number($page.params.bookId) + 1,
        );
        chapterId = 1;
      }
      goto(`/sda/${nextBook.id}/${chapterId}`, {
        replaceState: true,
      });
    }
  });
</script>

<Header
  back={() => history.back()}
  color="green"
>
  <a href="/sda" flex-cc>
    <span i-carbon-chevron-left text-2xl></span>
    <span> 返回 </span>
  </a>

  <div>
    {book.name}
  </div>

  <div space-x-2px>
    <button onclick={() => (textSize > 4 ? textSize-- : "")}>
      <span i-ic-outline-text-decrease></span>
    </button>
    <span>{textSize}</span>
    <button onclick={() => (textSize < 7 ? textSize++ : "")}>
      <span i-ic-outline-text-increase></span>
    </button>
  </div>
</Header>

<article w-full px-5 py-72px space-y-2 class="text-{textSize}">
  {#each chapter?.content as verse, i}
    <p relative>
      {#if verse.type == 7}
        <span absolute text-green>
          {i + 1}
        </span>
      {/if}
      {verse.text.zh}
    </p>
  {/each}
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
  text-green
>
  <a
    data-sveltekit-replacestate
    href="/sda/{$page.params.bookId}/{$page.params.chapterId - 1}"
  >
    上一章
  </a>

  <button>章节目录</button>

  <button>圣经目录 </button>

  <a
    data-sveltekit-replacestate
    href="/sda/{$page.params.bookId}/{Number($page.params.chapterId) + 1}"
  >
    下一章
  </a>
</footer>
