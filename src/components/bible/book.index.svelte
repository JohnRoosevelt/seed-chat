<script>
  const { bible } = $props();
</script>

<div w-full grid grid-cols-6 gap-px>
  {#each bible as book}
    <a
      href="/bible/{book.id}/1"
      flex-cc
      h-12
      relative
      class="bg-{book.title == '旧约' ? 'blue' : 'green'}"
    >
      <div absolute w-full top-0 px-1 py-px flex-bc text-7px text-red font-700>
        <span>{book.id}</span>
        <span>{book.name.en}</span>
      </div>

      <p text-7>{book.name.ZH}</p>

      <div
        absolute
        w-full
        bottom-0
        px-1
        py-px
        flex-cc
        text-7px
        text-red
        font-700
      >
        <span>{book.name.zh}</span>
      </div>
    </a>
  {/each}
</div>
