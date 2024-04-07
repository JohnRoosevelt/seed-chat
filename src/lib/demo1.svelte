<script>
</script>

{#snippet demo(title)}
<article mb-10>
  <span
    sticky
    top-0
    text-4xl
    text-gradient-br-primary-secondary-tertiary
    text-gradient-tertiary-warning
  >
    {title}
  </span>

  <div
    class="bg-surface-50-600 p-4 rounded-container grid grid-cols-2 md:grid-cols-5 gap-8"
  >
    <span class="s-circle-primary" />
    <span class="s-circle-split-primary" />
    <span class="s-circle-secondary border-dotted border-10" />
    <span class="s-circle-tertiary-800 border-dashed border-6" />
    <span
      class="s-squares-hover-tertiary-secondary-primary dark:s-squares-hover-tertiary-secondary-primary-200"
    />
    <span class="s-squares-flip-primary" />
    <span class="s-corners-outline-tertiary" />
    <span
      class="s-corners-outline-secondary border-primary/0-bl-error-tertiary-primary"
    />
    <span class="s-squares-rotate-primary" />
    <span class="s-squares-rotate-primary-secondary" />
  </div>
</article>
{/snippet}


{@render demo('title a')}
{@render demo('title b')}
{@render demo('title c')}
{@render demo('title d')}







<div class="bg-surface-50-600 p-4 rounded-container grid grid-cols-2 gap-8">
  <span class="mr-2 s-wh8-circle-secondary border-dotted border-4" />
  <span class="mr-2 s-wh8-circle-secondary border-dashed border-4" />
</div>
