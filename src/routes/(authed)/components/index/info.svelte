<script>
  let { data, item } = $props();
</script>

<div w-full flex-bc flex-col>
  <!-- {item} {JSON.stringify(data)} -->
  <div w-full flex-bc>
    <div text-base>name</div>
    <div text-gray text-xs>time</div>
  </div>
  <div w-full flex-bc>
    <div text-gray text-sm>last msg</div>
    <div text-xs>icon</div>
  </div>
</div>