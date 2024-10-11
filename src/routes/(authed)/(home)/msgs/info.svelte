<script>
  import Time from "svelte-time";

  let { data, channel } = $props();
</script>

<div w-full flex-bc flex-col>
  <div w-full flex-bc>
    <div text-base>{channel.name}</div>
    <div text-gray text-xs><Time relative timestamp={channel.updatedAt} /></div>
  </div>
  <div w-full flex-bc>
    <div text-gray text-sm>{channel.msg}</div>
    <div text-xs>{channel.hidden}</div>
  </div>
</div>
