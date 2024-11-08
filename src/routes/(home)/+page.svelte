<script>
  import Main from "$com/main.svelte";

  const { data } = $props();
</script>

<Main>
  <ul w-full px-5 space-y-4>
    {#each data.c as item}
      <li>
        <a href="/home/{item.id}/" data-sveltekit-replacestate> {item.name} </a>
      </li>
    {/each}
  </ul>
</Main>
