<script>
  import Time from "svelte-time";

  let { data, user } = $props();
</script>

<div w-full flex-bc flex-col>
  <div w-full flex-bc>
    <div text-base>{user.name}</div>
    <div text-gray text-xs><Time relative timestamp={user.createdAt} /></div>
  </div>
  <div w-full flex-bc>
    <div text-gray text-sm>{user.msg}</div>
    <div text-xs>{user.isGroup}</div>
  </div>
</div>
