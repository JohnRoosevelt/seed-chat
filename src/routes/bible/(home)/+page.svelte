<script>
  import Main from "$com/main.svelte";
  import Book from "$com/bible/book.index.svelte";

  const { data } = $props();

  const {bible} = data

  // console.log({bible})
</script>

<Main>
  <Book {bible} />
</Main>
