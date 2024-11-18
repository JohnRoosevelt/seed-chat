<script>
  import Back from "$com/back.svelte";
  import AudioPlayer from "$com/AudioPlayer.svelte";

  const { data } = $props();
  let curPlayIndex = $state(0)
  let src = $derived(`https://pub-42fa17a0d06841f295980294e061513c.r2.dev/home/${data.cItem.name}/${data.cItem.articles[curPlayIndex].name}.mp3`)
  let artist = $derived(data.cItem.articles[curPlayIndex].name)
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

  <ul w-full px-5 pb-15 space-y-2>
    {#each data.cItem.articles as item, i}
    <li>
      <!-- <a href="/home/{data.cItem.id}/{item.id}/">{item.id} {item.name} </a> -->
      <button class:text-green={i == curPlayIndex} onclick={() => curPlayIndex = i}>{item.id} {item.name} </button>
    </li>
    {/each}
  </ul>

  <footer fixed z-9 bottom-0 w-full>
    <AudioPlayer {src} title={data.cItem?.name} {artist} onended={() => curPlayIndex == data.cItem.articles.length - 1 ? curPlayIndex = 0 : curPlayIndex ++} />
  </footer>
</Back>