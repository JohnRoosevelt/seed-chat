<script>
  import Back from "$com/back.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <title>{data.cItem?.name} 目录</title>
</svelte:head>

<Back>
  {#snippet backText()}
    {data.cItem?.name}
  {/snippet}

  {#snippet title()}
    <div>目录</div>
    <div></div>
  {/snippet}

  <ul w-full px-5 space-y-2>
    {#each data.cItem.articles as item}
      <li>
        <a href="/home/{data.cItem.id}/{item.id}/">{item.id} {item.name} </a>
      </li>
    {/each}
  </ul>
</Back>