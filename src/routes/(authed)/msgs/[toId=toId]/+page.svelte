<script>
  import { invalidateAll } from "$app/navigation";
  import Avatar from "$lib/avatar.svelte";
  import Msg from "./msg.svelte";

  let disabled = $state(true);
  let content = $state("");
  let rows = $state(1);

  const { data } = $props();

  $effect(() => {
    if (content) disabled = false;
    else disabled = true;

    const newlineCount = (content.match(/\n/g) || []).length + 1;
    // 将行数限制在1到5之间
    rows = Math.min(Math.max(newlineCount, 1), 5);
  });

  let msgs = $state([...data.messages]);

  let msgsDom;
  $effect(async () => {
    // reference `messages` so that this code re-runs whenever it changes
    msgs.length;

    // autoscroll when new messages are added
    if (msgsDom.offsetHeight + msgsDom.scrollTop < msgsDom.scrollHeight - 5) {
      msgsDom.scrollTo(0, msgsDom.scrollHeight);
    }
  });

  function onkeydown(event) {
    if (event.key === "Enter" && event.metaKey) {
      onclick();
    }
  }

  async function onclick() {
    if (disabled) return;
    let ary = content.split("\n") || [];
    let lastIndexOf = ary.length - 1;
    while (lastIndexOf > 0 && ary[lastIndexOf].trim() === "") {
      lastIndexOf--;
    }
    ary = ary.slice(0, lastIndexOf + 1);
    const msg = { id: msgs.length, content: ary.join("\n") };
    msgs.push(msg);
    await data.msgsDB.setItem(String(msgs.length), msg);
    await data.channelsDB.setItem(data.toUser.id, {
      ...data.toUser,
      msg: msg.content,
      updatedAt: Date.now(),
    });
    invalidateAll();
    content = "";
  }
</script>

<article w-screen h-screen bg-gray-100 flex flex-col>
  <div w-full h-72px px-5 flex-bc>
    <a href="/" flex-cc>
      <span i-carbon-chevron-left text-2xl></span>
      返回
    </a>
    <div flex-cc gap-3>
      <Avatar user={data.toUser} />
      {data.toUser.name}
    </div>
    <button
      onclick={async () => {
        await data.msgsDB.dropInstance();
        await data.channelsDB.removeItem(data.toUser.id)
        invalidateAll();
        history.back()
      }}>删除</button
    >
  </div>

  <article
    bind:this={msgsDom}
    flex-1
    bg-gray-200
    p-2
    flex
    flex-col
    gap-y-4
    scroll-smooth
    scroll-y
  >
    {#each msgs as msg}
      <Msg {msg} {data} />
    {/each}
  </article>

  <div w-full p-5 flex-bc items-end space-x-3 bg-gray100>
    <textarea {rows} rounded-md flex-1 p-2 bind:value={content} {onkeydown}
    ></textarea>
    {#if disabled}
      <span i-carbon-add-alt w-7 h-7></span>
    {:else}
      <button {onclick} flex-0 flex-shrink-0 btn-primary>发送</button>
    {/if}
  </div>
</article>
