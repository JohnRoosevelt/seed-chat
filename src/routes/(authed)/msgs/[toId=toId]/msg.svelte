<script>
  import Time from "svelte-time";
  import Avatar from "$lib/avatar.svelte";

  const { msg = {}, data } = $props();

  let isMe = $derived(msg.id % 2);

  const user = $derived(isMe ? data.user : data.toUser);
</script>

<article
  flex
  items-stretch
  gap-x-2
  class:flex-row-reverse={isMe}
  class:flex-row={!isMe}
>
  <div flex-cx self-start>
    <Avatar user={isMe ? data.user : data.toUser} />
  </div>
  <div
    flex-ce
    flex-col
    text-base
    px-3
    py-2
    rounded
    class={`max-w-80% ${isMe ? "bg-green text-white" : "bg-white text-black"}`}
  >
    {#each msg.content.split("\n") as line}
      {#if line.length > 0}
        <p>{line}</p>
      {:else}
        <br />
      {/if}
    {/each}
  </div>
  {#if msg.sendAt == -1}
    <div fle-ce>
      <span i-line-md-loading-twotone-loop></span>
    </div>
  {:else}
    <div flex-col self-end space-y-1 text-gray text-xs>
      {#if isMe}
        <div flex justify-end>
          {msg.readAt == -1 ? "未读" : "已读"}
        </div>
      {/if}
      <div flex>
        <Time relative timestamp={msg.createdAt} />
      </div>
    </div>
  {/if}
</article>
