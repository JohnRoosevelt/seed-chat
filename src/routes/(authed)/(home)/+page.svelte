<script>
  import localforage from "localforage";
  import Channel from "./channel.svelte";
  const { data } = $props();

  let channels = $state([]);

  const name = `DB${data.user.id}`;

  $effect(async () => {
    const channelsDB = localforage.createInstance({
      name,
      storeName: "channels",
      description: "messages form channels",
    });

    await channelsDB.setItem("1000002", {
      id: "1000002",
      name: "test2",
      createdAt: Date.now(),
      msg: "latest message2",
      isGroup: false,
    });
    await channelsDB.setItem("1000003", {
      id: "1000003",
      name: "test3",
      createdAt: Date.now(),
      msg: "latest message3",
      isGroup: false,
    });
    await channelsDB.setItem("1000004", {
      id: "1000004",
      name: "test4",
      createdAt: Date.now(),
      msg: "latest message4",
      isGroup: false,
    });
    await channelsDB.setItem("1000005", {
      id: "1000005",
      name: "test5",
      createdAt: Date.now(),
      msg: "latest message5",
      isGroup: false,
    });

    channelsDB.iterate(function (v, k, n) {
      channels.push(v)
    });
  });
</script>

<article h-full flex-cc flex-col>
  <header bg-gray-50 w-full h-72px flex-bc p-5>
    <span i-icons-logo h-10 w-10> </span>
    <span i-carbon-add-large rotate-90 text-3xl> </span>
  </header>
  <article class="h-[calc(100%-72px)]" w-full space-y-1px scroll-y>
    {#each channels as user}
      <Channel {data} {user} />
    {/each}
  </article>
</article>
