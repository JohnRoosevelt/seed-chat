<script>
  import Book from "$com/bible/book.index.svelte";

  const { data } = $props();

  const {bible} = data

  // console.log({bible})
</script>

<Book {bible} />
