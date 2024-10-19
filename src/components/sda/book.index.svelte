<script>
  const { books } = $props();
</script>

<div w-full bg-white space-y-px>
  {#each books as book}
    <a href="/sda/{book.id}/1" flex-bc h-12 px-3 relative class="bg-gray-100">
      <p text-7>{book.name} 
        <!-- <span text-3>{book.chapters.length}</span> -->
      </p>
    </a>
  {/each}
</div>
