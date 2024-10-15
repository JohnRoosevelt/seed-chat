<script>
  const { book } = $props();
</script>

<div w-full grid grid-cols-6 gap-px>
  {#each book.chapters as chapter}
    <a
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
