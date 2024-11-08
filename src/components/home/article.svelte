<script>
  const { html } = $props();
</script>

<article flex-cc flex-col space-y-3 p-3>
  {@html html}
</article>

<style>
  article :global {
    p:first-child {
      font-size: 20px;
      font-weight: 500;
      position: sticky;
      top: 48px;
      background: white;
      width: 100%;
      text-align: center;
    }
    p:not(:first-child)::first-letter {
      margin-left: 2em;
      font-size: var(--font-size, 28px);
    }

    p:not(:first-child) {
      font-size: var(--font-size, 28px);
    }
  }
</style>
