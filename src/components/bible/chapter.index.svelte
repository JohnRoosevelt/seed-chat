<script>
  const { book, onclick } = $props();
</script>

<section w-full h-full flex-bc flex-col>
  <div flex-cc font-500 h-12 sticky bg-white w-full top-0 z-3>
    {book.title} - {book.name.zh}
  </div>
  <div w-full grid grid-cols-6 gap-px>
    {#each book.chapters as chapter}
      <a data-sveltekit-replacestate {onclick}
        href="/bible/{book.id}/{chapter.id}"
        flex-cc
        h-12
        relative
        class="bg-{book.title == '旧约' ? 'blue' : 'green'}"
      >
        {chapter.id}章
      </a>
    {/each}
  </div>
</section>
