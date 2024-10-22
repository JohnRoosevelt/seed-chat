<script>
  import Book from "$com/sda/book.index.svelte";

  const { data } = $props();
  const { books } = data;
  console.log({books})
  // let books = $state(data.books)
</script>

<Book {books} />
