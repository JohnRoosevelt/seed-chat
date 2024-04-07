<script>
  import Avatar from "$lib/avatar.svelte";

  const { msg = {} } = $props();

  let isMe = $derived(msg.id % 2)
</script>

<article
  flex
  items-stretch
  gap-x-2
  class:flex-row-reverse={isMe}
  class:flex-row={!isMe}
>
  <div flex-cx>
    <Avatar />
  </div>
  <div
    flex-ce
    text-base
    px-2
    py-1
    rounded
    class={`max-w-80% ${isMe ? "bg-green text-white" : "bg-gray200 text-black"}`}
  >
    msg content {JSON.stringify(msg)}
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
        {msg.createdAt || Date.now()}
      </div>
    </div>
  {/if}
</article>
