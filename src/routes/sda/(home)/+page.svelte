<script>
  import Book from "$com/sda/book.index.svelte";

  const { data } = $props();
  const { books = [] } = data;
</script>

<Book {books} />
