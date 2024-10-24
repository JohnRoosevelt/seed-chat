<script>
  const { data } = $props();
</script>

<article flex-cc flex-col space-y-3 p-3>
  {@html data.html}
</article>

<style>
  article :global {
    p:first-child {
      font-size: 20px;
      font-weight: 500;
    }
    p:not(:first-child)::first-letter {
      margin-left: 2em;
    }
  }
</style>
