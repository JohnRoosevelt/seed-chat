<script>
  const { book, curIndex } = $props();
</script>

<div w-full bg-white space-y-px text-5>
  {#each book.chapters as chapter, i}
    <a data-sveltekit-replacestate
      href="/sda/{book.id}/{i+1}"
      h-10
      flex
      pl-3
      items-center
      bg-gray-100
      relative
      class={curIndex-1 == i ? 'text-green' : ''}
    >
      {chapter.name}
    </a>
  {/each}
</div>
